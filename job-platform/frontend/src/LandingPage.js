import React, { useState } from "react";
import "./LandingPage.css";

function LandingPage({ onSelectCity }) {
  const [selectedCity, setSelectedCity] = useState("Bangalore");

  const cities = [
    { name: "Bangalore", code: "BNG", image: "🌆" },
    { name: "Mumbai", code: "BOM", image: "🌃" },
    { name: "Delhi", code: "DEL", image: "🏛️" },
  ];

  const features = [
    { icon: "🔄", title: "Always Fresh", desc: "Refreshed daily." },
    { icon: "🔓", title: "No Sign-in", desc: "Zero friction." },
    { icon: "💰", title: "Free Forever", desc: "No paywalls." },
  ];

  return (
    <div className="landing-page">
      <div className="landing-grid-bg"></div>

      <div className="landing-container">
        {/* LEFT SECTION */}
        <div className="landing-left-section">
          <div className="landing-main-content">
            <h1 className="landing-main-heading">
              {selectedCity.toUpperCase()}
              <br />
              STARTUP ARENA
            </h1>
            <p className="landing-main-description">
              The most direct way to find startup roles in {selectedCity}. Zero
              friction, visual first.
            </p>

            {/* FEATURES */}
            <div className="features-grid">
              {features.map((feature, idx) => (
                <div key={idx} className="feature-card">
                  <span className="feature-icon">{feature.icon}</span>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-desc">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* ALSO EXPLORE */}
            <div className="also-explore">
              <p className="explore-label">ALSO EXPLORE</p>
              <div className="explore-cities">
                {cities
                  .filter((c) => c.name !== selectedCity)
                  .map((city) => (
                    <button
                      key={city.name}
                      className="explore-city-card"
                      onClick={() => {
                        setSelectedCity(city.name);
                        onSelectCity(city.name);
                      }}
                    >
                      <div className="explore-city-emoji">{city.image}</div>
                      <span className="explore-city-code">{city.code}</span>
                      <p className="explore-city-name">{city.name}</p>
                    </button>
                  ))}
              </div>
            </div>

            <p className="made-by">MADE BY HRDK</p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="landing-right-section">
          <div className={`hero-image hero-${selectedCity.toLowerCase()}`}>
            <button
              className="enter-arena-btn"
              onClick={() => onSelectCity(selectedCity)}
            >
              ENTER THE ARENA →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
