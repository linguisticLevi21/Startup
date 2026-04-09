import React from "react";
import "./LandingPage.css";

function LandingPage({ onSelectCity }) {
  const cities = [
    { name: "Bangalore", jobs: 18 },
    { name: "Mumbai", jobs: 16 },
    { name: "Delhi", jobs: 14 },
    { name: "Remote", jobs: 22 },
  ];

  const stats = [
    { value: "70+", label: "Jobs" },
    { value: "15", label: "Companies" },
    { value: "4", label: "Cities" },
  ];

  return (
    <div className="landing-page">
      <div className="landing-grid-bg"></div>

      <div className="landing-wrapper">
        <div className="landing-left">
          <div className="landing-badge">🚀 Discover → Apply → Get Hired</div>
          <h1 className="landing-title">
            Find Your Next Role
            <br />
            at India's Best <span className="gradient-text">Startups</span>
          </h1>
          <p className="landing-subtitle">
            Interactive map-based job discovery. Explore startups across cities,
            browse roles, and apply directly — all in one place.
          </p>

          <div className="landing-stats">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-item">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="landing-right">
          <h2 className="cities-heading">🏙️ CHOOSE A CITY</h2>
          <div className="cities-grid">
            {cities.map((city) => (
              <button
                key={city.name}
                className="city-card"
                onClick={() => onSelectCity(city.name)}
                id={`city-${city.name.toLowerCase()}`}
              >
                <div className="city-card-content">
                  <span className="city-card-name">{city.name}</span>
                  <span className="city-card-jobs">{city.jobs} positions</span>
                </div>
                <span className="city-card-arrow">→</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
