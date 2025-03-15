import React, { useState } from "react";

export default function Incentives({ onBack }) {
  const [selectedOption, setSelectedOption] = useState("gpay");
  const [activeTab, setActiveTab] = useState("daily");

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
          <span className="page-title">Incentives</span>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="incentive-tabs">
          <button
            className={`tab-btn ${activeTab === "daily" ? "active" : ""}`}
            onClick={() => setActiveTab("daily")}>
            <i className="fas fa-calendar-day"></i>
            <span>Daily Challenge</span>
          </button>
          <button
            className={`tab-btn ${activeTab === "total" ? "active" : ""}`}
            onClick={() => setActiveTab("total")}>
            <i className="fas fa-star"></i>
            <span>Total Available</span>
          </button>
        </div>

        {activeTab === "daily" ? (
          <div className="incentive-card">
            <div className="incentive-header">
              <div className="incentive-title">Daily Challenge</div>
              <div className="incentive-subtitle">Complete 15 trips today</div>
            </div>
            <div className="incentive-progress">
              <div className="progress-text">
                <span>12/15 trips</span>
                <span>3 trips remaining</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "80%" }}></div>
              </div>
            </div>
            <div className="incentive-reward">
              <i className="fas fa-gift reward-icon"></i>
              <div className="reward-amount">₹500</div>
            </div>
          </div>
        ) : (
          <div className="incentive-card total-incentives">
            <div className="incentive-header">
              <div className="incentive-title">Available Incentives</div>
              <div className="incentive-subtitle">
                Total rewards you can earn
              </div>
            </div>

            <div className="incentive-list">
              <div className="incentive-item highlight">
                <div className="incentive-item-header">
                  <i className="fas fa-calendar-day"></i>
                  <span>Daily Challenge</span>
                  <div className="badge">Active</div>
                </div>
                <div className="incentive-item-amount">₹500</div>
                <div className="incentive-item-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: "80%" }}></div>
                  </div>
                  <span>12/15 trips</span>
                </div>
              </div>

              <div className="incentive-item">
                <div className="incentive-item-header">
                  <i className="fas fa-star"></i>
                  <span>Good Reviews</span>
                </div>
                <div className="incentive-item-amount">₹750</div>
                <div className="incentive-item-subtitle">
                  Maintain 4.8+ rating
                </div>
              </div>

              <div className="incentive-item">
                <div className="incentive-item-header">
                  <i className="fas fa-bolt"></i>
                  <span>Surge Demand Completion</span>
                </div>
                <div className="incentive-item-amount">₹1,200</div>
                <div className="incentive-item-subtitle">
                  Complete 5 surge trips
                </div>
              </div>
            </div>

            <div className="total-section">
              <div className="total-label">Total Available</div>
              <div className="total-amount">₹2,450</div>
            </div>
          </div>
        )}

        <div className="incentive-card">
          <div className="incentive-header">
            <div className="incentive-title">Payout Preference</div>
            <div className="incentive-subtitle">
              Choose how you want to receive incentives
            </div>
          </div>

          <div className="payout-options">
            <label
              className={`payout-option ${
                selectedOption === "insurance" ? "selected" : ""
              }`}>
              <input
                type="radio"
                name="payout"
                value="insurance"
                checked={selectedOption === "insurance"}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              <div className="option-content">
                <i className="fas fa-shield-heart option-icon"></i>
                <div className="option-details">
                  <div className="option-title">Insurance Coverage</div>
                  <div className="option-description">
                    Extended coverage up to ₹5L
                  </div>
                </div>
              </div>
            </label>

            <label
              className={`payout-option ${
                selectedOption === "coupons" ? "selected" : ""
              }`}>
              <input
                type="radio"
                name="payout"
                value="coupons"
                checked={selectedOption === "coupons"}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              <div className="option-content">
                <i className="fas fa-ticket option-icon"></i>
                <div className="option-details">
                  <div className="option-title">Shopping Coupons</div>
                  <div className="option-description">
                    Up to 40% off on major brands
                  </div>
                </div>
              </div>
            </label>

            <label
              className={`payout-option ${
                selectedOption === "gpay" ? "selected" : ""
              }`}>
              <input
                type="radio"
                name="payout"
                value="gpay"
                checked={selectedOption === "gpay"}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              <div className="option-content">
                <i className="fas fa-wallet option-icon"></i>
                <div className="option-details">
                  <div className="option-title">GPay Transfer</div>
                  <div className="option-description">
                    Instant transfer with 0% fee
                  </div>
                </div>
              </div>
            </label>
          </div>

          <button className="save-preference-btn">
            <span>Save Preference</span>
            <i className="fas fa-check"></i>
          </button>
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
        <button className="nav-item active">
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
