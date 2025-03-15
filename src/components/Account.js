import React, { useState } from "react";

export default function Account({ onBack }) {
  const [showReviewInfo, setShowReviewInfo] = useState(false);

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
          <span className="page-title">Account</span>
        </div>
      </div>

      <div className="content-wrapper account-wrapper">
        {/* Profile Card */}
        <div className="account-header">
          <div className="account-avatar">J</div>
          <div className="account-info">
            <h2 className="account-name">John Doe</h2>
            <div className="account-metrics">
              <div className="account-rating">
                <i className="fas fa-star"></i>
                <span>4.85</span>
                <span className="rating-count">(2,145 trips)</span>
              </div>
              <div className="account-review">
                <i className="fas fa-thumbs-up"></i>
                <span>98%</span>
                <span className="review-count">(2,102 reviews)</span>
                <button
                  className="info-btn"
                  onClick={() => setShowReviewInfo(true)}>
                  <i className="fas fa-circle-info"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Review Info Popup */}
        {showReviewInfo && (
          <div
            className="popup-overlay"
            onClick={() => setShowReviewInfo(false)}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <div className="popup-header">
                <h3>Review Information</h3>
                <button
                  className="close-btn"
                  onClick={() => setShowReviewInfo(false)}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="popup-body">
                <i className="fas fa-clock info-icon"></i>
                <p>
                  Users are allowed to change the review within a span of 20
                  mins
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Card */}
        <div className="account-card">
          <div className="account-stats">
            <div className="stat-item">
              <i className="fas fa-route"></i>
              <div className="stat-details">
                <span className="stat-value">24,560 km</span>
                <span className="stat-label">Total Distance</span>
              </div>
            </div>
            <div className="stat-item">
              <i className="fas fa-clock"></i>
              <div className="stat-details">
                <span className="stat-value">1,250 hrs</span>
                <span className="stat-label">Time Online</span>
              </div>
            </div>
            <div className="stat-item">
              <i className="fas fa-car"></i>
              <div className="stat-details">
                <span className="stat-value">2,145</span>
                <span className="stat-label">Trips Completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Card */}
        <div className="account-card">
          <div className="account-actions">
            <button className="action-item">
              <i className="fas fa-id-card"></i>
              <span>Driver License</span>
              <i className="fas fa-chevron-right"></i>
            </button>
            <button className="action-item">
              <i className="fas fa-car-side"></i>
              <span>Vehicle Info</span>
              <i className="fas fa-chevron-right"></i>
            </button>
            <button className="action-item">
              <i className="fas fa-bell"></i>
              <span>Notifications</span>
              <i className="fas fa-chevron-right"></i>
            </button>
            <button className="action-item">
              <i className="fas fa-shield-halved"></i>
              <span>Privacy & Security</span>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <button className="nav-item" onClick={onBack}>
          <i className="fas fa-house nav-icon"></i>
          <span className="nav-label">Home</span>
        </button>
        <button className="nav-item">
          <i className="fas fa-list-check nav-icon"></i>
          <span className="nav-label">Orders</span>
        </button>
        <button className="nav-item">
          <i className="fas fa-wallet nav-icon"></i>
          <span className="nav-label">Incentives</span>
        </button>
        <button className="nav-item active">
          <i className="fas fa-user nav-icon"></i>
          <span className="nav-label">Account</span>
        </button>
      </div>
    </div>
  );
}
