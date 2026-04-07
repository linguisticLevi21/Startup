import React from "react";
import "./LandingPage.css";

function LandingPage({ onSelectCity }) {
  const features = [
    { title: "Always Fresh", desc: "New opportunities daily" },
    { title: "No Sign-in", desc: "Browse freely" },
    { title: "Free Forever", desc: "Zero hidden costs" },
  ];

  const cities = [
    { name: "Hyderabad", jobs: 85 },
    { name: "Mumbai", jobs: 95 },
    { name: "Delhi", jobs: 60 },
  ];

  return (
    <div className="landing-page">
      <div className="landing-grid-bg"></div>

      <div className="landing-wrapper">
        <div className="landing-left">
          <h1 className="landing-title">
            Bangalore
            <br />
            <span className="arena-text">Startup Arena</span>
          </h1>

          <div className="features-grid">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-box">
                <div className="feature-icon">✓</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="cities-section">
            <h2>Other Cities</h2>
            <div className="cities-list">
              {cities.map((city) => (
                <button
                  key={city.name}
                  className="city-btn"
                  onClick={() => onSelectCity(city.name)}
                >
                  <span>{city.name}</span>
                  <span className="job-badge">{city.jobs}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            className="explore-btn"
            onClick={() => onSelectCity("Bangalore")}
          >
            Explore Bangalore →
          </button>
        </div>

        <div className="landing-right">
          <div className="illustration-box">
            <div className="illustration-content">
              <div className="circle circle-1"></div>
              <div className="circle circle-2"></div>
              <div className="circle circle-3"></div>
              <div className="main-icon">🚀</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
