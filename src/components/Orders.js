import React, { useState } from "react";

export default function Orders({ onBack }) {
  // Mock data for incoming requests
  const [requests] = useState([
    {
      id: 1,
      passenger: "Jayabth D",
      pickup: "Jayanagar 4th Block",
      dropoff: "Electronic City",
      distance: "12.5 km",
      fare: "₹280",
      time: "3 mins ago",
      status: "pending",
    },
    {
      id: 2,
      passenger: "Rahul K.",
      pickup: "Indiranagar",
      dropoff: "Whitefield",
      distance: "15.8 km",
      fare: "₹350",
      time: "5 mins ago",
      status: "accepted",
    },
    {
      id: 3,
      passenger: "Priya S.",
      pickup: "MG Road",
      dropoff: "Koramangala",
      distance: "8.2 km",
      fare: "₹190",
      time: "8 mins ago",
      status: "completed",
    },
  ]);

  return (
    <div className="container">
      {/* Status Bar */}
      <div className="status-bar">
        <span className="time">
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        <div className="status-bar-right">
          <i className="fas fa-signal"></i>
          <span>5G</span>
          <i className="fas fa-battery-three-quarters"></i>
        </div>
      </div>

      {/* Top Bar */}
      <div className="top-bar">
        <div className="nav-left">
          <button className="back-btn" onClick={onBack}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <span className="page-title">Orders</span>
        </div>
      </div>

      <div className="content-wrapper">
        {/* Order Tabs */}
        <div className="order-tabs">
          <button className="tab-btn active">
            <i className="fas fa-clock"></i>
            <span>Incoming</span>
          </button>
          <button className="tab-btn">
            <i className="fas fa-route"></i>
            <span>Active</span>
          </button>
          <button className="tab-btn">
            <i className="fas fa-check-circle"></i>
            <span>Completed</span>
          </button>
        </div>

        {/* Requests List */}
        <div className="requests-list">
          {requests.map((request) => (
            <div key={request.id} className={`request-card ${request.status}`}>
              <div className="request-header">
                <div className="passenger-info">
                  <i className="fas fa-user-circle"></i>
                  <span className="passenger-name">{request.passenger}</span>
                </div>
                <span className="request-time">{request.time}</span>
              </div>

              <div className="request-route">
                <div className="route-point pickup">
                  <i className="fas fa-circle"></i>
                  <span>{request.pickup}</span>
                </div>
                <div className="route-line"></div>
                <div className="route-point dropoff">
                  <i className="fas fa-location-dot"></i>
                  <span>{request.dropoff}</span>
                </div>
              </div>

              <div className="request-details">
                <div className="detail-item">
                  <i className="fas fa-route"></i>
                  <span>{request.distance}</span>
                </div>
                <div className="detail-item">
                  <i className="fas fa-indian-rupee-sign"></i>
                  <span>{request.fare}</span>
                </div>
              </div>

              {request.status === "pending" && (
                <div className="request-actions">
                  <button className="action-btn accept">
                    <i className="fas fa-check"></i>
                    Accept
                  </button>
                  <button className="action-btn decline">
                    <i className="fas fa-times"></i>
                    Decline
                  </button>
                </div>
              )}

              {request.status === "accepted" && (
                <div className="status-badge accepted">
                  <i className="fas fa-car"></i>
                  On the way
                </div>
              )}

              {request.status === "completed" && (
                <div className="status-badge completed">
                  <i className="fas fa-check-circle"></i>
                  Completed
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <button className="nav-item" onClick={onBack}>
          <i className="fas fa-house nav-icon"></i>
          <span className="nav-label">Home</span>
        </button>
        <button className="nav-item active">
          <i className="fas fa-list-check nav-icon"></i>
          <span className="nav-label">Orders</span>
        </button>
        <button className="nav-item">
          <i className="fas fa-wallet nav-icon"></i>
          <span className="nav-label">Incentives</span>
        </button>
        <button className="nav-item">
          <i className="fas fa-user nav-icon"></i>
          <span className="nav-label">Account</span>
        </button>
      </div>
    </div>
  );
}
