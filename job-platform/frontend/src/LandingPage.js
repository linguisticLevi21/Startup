import React, { useState } from "react";
import "./LandingPage.css";

function LandingPage({ onSelectCity }) {
  const [selectedCity, setSelectedCity] = useState("Bangalore");

  const cities = [
    {
      name: "Bangalore",
      code: "BNG",
      image:
        "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Mumbai",
      code: "BOM",
      image:
        "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Delhi",
      code: "DEL",
      image:
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Hyderabad",
      code: "HYD",
      image:
        "https://images.unsplash.com/photo-1574431535497-6a58396ecf7d?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const features = [
    { icon: "🔄", title: "Always Fresh", desc: "Refreshed daily." },
    { icon: "⚡", title: "No Sign-in", desc: "Zero friction." },
    { icon: "🗺️", title: "Free Forever", desc: "No paywalls." },
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
              The most direct way to find startup roles in India's top cities.
              Zero friction, visual first.
            </p>

            {/* FEATURES */}
            <div className="features-grid">
              {features.map((feature, idx) => (
                <div key={idx} className="feature-card">
                  <span className="feature-icon">{feature.icon}</span>
                  <div className="feature-text">
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-desc">{feature.desc}</p>
                  </div>
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
                      style={{ backgroundImage: `url(${city.image})` }}
                      onClick={() => {
                        setSelectedCity(city.name);
                        onSelectCity(city.name);
                      }}
                    >
                      <div className="explore-city-overlay"></div>
                      <div className="explore-city-content">
                        <span className="explore-city-code">{city.code}</span>
                        <p className="explore-city-name">{city.name}</p>
                      </div>
                    </button>
                  ))}
              </div>
            </div>

            <div className="made-by-section">
              <span className="made-by">MADE BY HRDK</span>
              <button className="get-matched-btn">
                <span>🔔 Get Matched Now</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="landing-right-section">
          <div
            className="hero-image"
            style={{
              backgroundImage: `url(${cities.find((c) => c.name === selectedCity)?.image})`,
            }}
          >
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
