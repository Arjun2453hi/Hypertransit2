import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";
import Incentives from "./components/Incentives";
import Account from "./components/Account";
import Orders from "./components/Orders";

// Add Font Awesome and Google Fonts
const fontAwesomeLink = document.createElement("link");
fontAwesomeLink.rel = "stylesheet";
fontAwesomeLink.href =
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";
document.head.appendChild(fontAwesomeLink);

const googleFontsLink = document.createElement("link");
googleFontsLink.rel = "stylesheet";
googleFontsLink.href =
  "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
document.head.appendChild(googleFontsLink);

export default function App() {
  const [status, setStatus] = useState("Online");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [earnings] = useState(2150);
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (currentPage === "orders") {
    return <Orders onBack={() => setCurrentPage("home")} />;
  }

  if (currentPage === "incentives") {
    return <Incentives onBack={() => setCurrentPage("home")} />;
  }

  if (currentPage === "account") {
    return <Account onBack={() => setCurrentPage("home")} />;
  }

  return (
    <div className="container">
      {/* Status Bar */}
      <div className="status-bar">
        <span className="time">
          {currentTime.toLocaleTimeString([], {
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
          <span className="profile-mini">J</span>
          <span className="driver-status">
            <i className="fas fa-circle status-dot"></i>
            Online
          </span>
          <span className="location-status">
            <i className="fas fa-location-dot"></i>
            Jayanagar
          </span>
        </div>
        <div className="nav-right">
          <button className="menu-btn">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="earnings-row">
          <div className="earnings-main">
            <div className="earnings-label">Today's Earnings</div>
            <div className="earnings-amount">₹{earnings.toLocaleString()}</div>
            <div className="earnings-stats">
              <div className="stat">
                <span className="stat-value">12</span>
                <span className="stat-label">Trips</span>
              </div>
              <div className="stat">
                <span className="stat-value">8h</span>
                <span className="stat-label">Online</span>
              </div>
            </div>
          </div>
          <div className="surge-content">
            <div className="surge-header">
              <div className="surge-alert">
                <i className="fas fa-bolt surge-icon"></i>
                Surge Alert
              </div>
              <div className="location-name">Basavangudi</div>
            </div>
            <div className="surge-multiplier">2.1x</div>
            <button className="cta-btn">
              <span>HEAD THERE NOW</span>
              <i className="fas fa-arrow-right arrow"></i>
            </button>
          </div>
        </div>

        <div className="search-container">
          <div className="search-bar">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              placeholder="Search locations..."
              className="search-input"
            />
            <button className="search-filter">
              <i className="fas fa-sliders"></i>
            </button>
          </div>
        </div>

        <div className="map-container">
          <MapContainer
            center={[12.945, 77.565]}
            zoom={13}
            className="map"
            zoomControl={false}
            attributionControl={false}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              className="dark-map"
            />
          </MapContainer>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <button
          className={`nav-item ${currentPage === "home" ? "active" : ""}`}
          onClick={() => setCurrentPage("home")}>
          <i className="fas fa-house nav-icon"></i>
          <span className="nav-label">Home</span>
        </button>
        <button
          className={`nav-item ${currentPage === "orders" ? "active" : ""}`}
          onClick={() => setCurrentPage("orders")}>
          <i className="fas fa-list-check nav-icon"></i>
          <span className="nav-label">Orders</span>
        </button>
        <button
          className={`nav-item ${currentPage === "incentives" ? "active" : ""}`}
          onClick={() => setCurrentPage("incentives")}>
          <i className="fas fa-wallet nav-icon"></i>
          <span className="nav-label">Incentives</span>
        </button>
        <button
          className={`nav-item ${currentPage === "account" ? "active" : ""}`}
          onClick={() => setCurrentPage("account")}>
          <i className="fas fa-user nav-icon"></i>
          <span className="nav-label">Account</span>
        </button>
      </div>
    </div>
  );
}
