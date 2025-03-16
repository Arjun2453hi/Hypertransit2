import numpy as np
import pandas as pd
import torch
from torch import nn, optim
from sklearn.preprocessing import MinMaxScaler
from torch_geometric.data import Data
from torch_geometric.loader import DataLoader
from torch_geometric.nn import GATConv
import geoopt  # Library for hyperbolic geometry
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

# Function to compute hyperbolic distance (Poincaré distance)
def hyperbolic_distance(u, v):
    u_norm = torch.norm(u, dim=1)
    v_norm = torch.norm(v, dim=1)
    numerator = torch.norm(u - v, dim=1) ** 2
    denominator = (1 - u_norm**2) * (1 - v_norm**2)
    return torch.arccosh(1 + 2 * numerator / denominator)

# Load dataset
df = pd.read_csv('highly_hierarchical_dataset.csv')
df['datetime'] = pd.to_datetime(df['date'] + ' ' + df['time'])
df.set_index('datetime', inplace=True)
df = df.sort_index()

# Split into training (2024) and testing (2023) data
train_data = df[df.index.year == 2024].copy()
test_data = df[df.index.year == 2023].copy()

# Features and scaling
features = ['searches', 'successful bookings', 'denied rides', 'available drivers', 'idle drivers', 'surge multiplier', 'traffic level', 'avg trip fare']
scaler = MinMaxScaler()
train_scaled = scaler.fit_transform(train_data[features])
test_scaled = scaler.transform(test_data[features])

# Scale targets separately
target_scaler = MinMaxScaler()
train_data['searches_scaled'] = target_scaler.fit_transform(train_data[['searches']])
test_data['searches_scaled'] = target_scaler.transform(test_data[['searches']])

# Convert to tensors
x_train = torch.tensor(train_scaled, dtype=torch.float)
y_train = torch.tensor(train_data['searches_scaled'].values, dtype=torch.float).view(-1, 1)
x_test = torch.tensor(test_scaled, dtype=torch.float)
y_test = torch.tensor(test_data['searches_scaled'].values, dtype=torch.float).view(-1, 1)

# Construct edge index (time-based connections)
def create_edge_index(size):
    edges = [[i, i + 1] for i in range(size - 1)] + [[i, i + 24] for i in range(size - 24)]
    return torch.tensor(edges, dtype=torch.long).t().contiguous()

edge_index_train = create_edge_index(x_train.size(0))
edge_index_test = create_edge_index(x_test.size(0))

# Create PyG Data objects
train_dataset = Data(x=x_train, y=y_train, edge_index=edge_index_train)
test_dataset = Data(x=x_test, y=y_test, edge_index=edge_index_test)
train_loader = DataLoader([train_dataset], batch_size=32, shuffle=True)
test_loader = DataLoader([test_dataset], batch_size=32, shuffle=False)

# Hyperbolic Graph Attention Network
class HyperbolicGAT(nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim):
        super(HyperbolicGAT, self).__init__()
        self.manifold = geoopt.PoincareBall()
        self.gat1 = GATConv(input_dim, hidden_dim)
        self.gat2 = GATConv(hidden_dim, hidden_dim)
        self.gat3 = GATConv(hidden_dim, output_dim)
        self.dropout = nn.Dropout(0.2)

    def forward(self, x, edge_index):
        x = self.manifold.expmap0(x)  # Map input to hyperbolic space
        x = torch.tanh(self.gat1(x, edge_index)) * 2  # Apply GAT and activation
        x = self.dropout(x)  # Apply dropout
        x = torch.tanh(self.gat2(x, edge_index)) * 2  # Second GAT layer
        x = self.gat3(x, edge_index)  # Final GAT layer
        return x

# Euclidean Graph Attention Network
class EuclideanGAT(nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim):
        super(EuclideanGAT, self).__init__()
        self.gat1 = GATConv(input_dim, hidden_dim)
        self.gat2 = GATConv(hidden_dim, output_dim)

    def forward(self, x, edge_index):
        x = torch.relu(self.gat1(x, edge_index))
        x = self.gat2(x, edge_index)
        return x

# Training function with early stopping
def train_model(model, data_loader, epochs=100, hyperbolic=False, patience=5):
    optimizer = geoopt.optim.RiemannianAdam(model.parameters(), lr=0.003) if hyperbolic else optim.Adam(model.parameters(), lr=0.003)
    loss_fn = nn.HuberLoss()
    best_loss = float('inf')
    epochs_no_improve = 0

    for epoch in range(epochs):
        total_loss = 0
        for batch in data_loader:
            optimizer.zero_grad()
            output = model(batch.x, batch.edge_index)
            loss = loss_fn(output, batch.y)
            loss.backward()
            optimizer.step()
            total_loss += loss.item()

        avg_loss = total_loss / len(data_loader)
        if avg_loss < best_loss:
            best_loss = avg_loss
            epochs_no_improve = 0
        else:
            epochs_no_improve += 1

        if epoch % 5 == 0:
            print(f"Epoch [{epoch+1}/{epochs}] - Loss: {avg_loss:.4f}")

        if epochs_no_improve == patience:
            print(f"Early stopping at epoch {epoch+1}")
            break

# Train models
hyperbolic_model = HyperbolicGAT(len(features), 128, 1)
euclidean_model = EuclideanGAT(len(features), 64, 1)

print("Training Hyperbolic Model...")
train_model(hyperbolic_model, train_loader, hyperbolic=True, patience=10)

print("Training Euclidean Model...")
train_model(euclidean_model, train_loader)

# Predict function
def predict(model, data_loader):
    model.eval()
    predictions = []
    with torch.no_grad():
        for batch in data_loader:
            predictions.append(model(batch.x, batch.edge_index))
    return torch.cat(predictions, dim=0)

# Make predictions
y_pred_hyperbolic = target_scaler.inverse_transform(predict(hyperbolic_model, test_loader).numpy())
y_pred_euclidean = target_scaler.inverse_transform(predict(euclidean_model, test_loader).numpy())
y_actual = target_scaler.inverse_transform(y_test.numpy())

# Compute evaluation metrics
hyperbolic_rmse = np.sqrt(mean_squared_error(y_actual, y_pred_hyperbolic))
euclidean_rmse = np.sqrt(mean_squared_error(y_actual, y_pred_euclidean))
hyperbolic_mae = mean_absolute_error(y_actual, y_pred_hyperbolic)
euclidean_mae = mean_absolute_error(y_actual, y_pred_euclidean)

# Compute R-squared scores
hyperbolic_r2 = r2_score(y_actual, y_pred_hyperbolic)
euclidean_r2 = r2_score(y_actual, y_pred_euclidean)

print(f"Hyperbolic Model RMSE: {hyperbolic_rmse:.4f}, MAE: {hyperbolic_mae:.4f}, R²: {hyperbolic_r2:.4f}")
print(f"Euclidean Model RMSE: {euclidean_rmse:.4f}, MAE: {euclidean_mae:.4f}, R²: {euclidean_r2:.4f}")

# Save results
test_data['hyperbolic_predictions'] = y_pred_hyperbolic
test_data['euclidean_predictions'] = y_pred_euclidean
test_data[['date', 'time', 'region', 'hyperbolic_predictions', 'euclidean_predictions', 'searches']].to_csv('predictions.csv', index=False)