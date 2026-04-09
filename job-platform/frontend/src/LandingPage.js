import React from "react";
import "./LandingPage.css";

function LandingPage({ onSelectCity, user, onLogout }) {
  const cities = [
    { name: "Mumbai",    image: "/mumbai.png",    key: "Mumbai"    },
    { name: "Hyderabad", image: "/hyderabad.png", key: "Hyderabad" },
    { name: "Bengaluru", image: "/bengaluru.png", key: "Bangalore"  },
    { name: "Delhi",     image: "/delhi.png",     key: "Delhi"     },
  ];

  const features = [
    {
      icon: "⚡",
      title: "Live Job Feed",
      desc: "Updated daily from top startups across India's biggest cities.",
    },
    {
      icon: "🗺️",
      title: "Map Explorer",
      desc: "Browse startups visually by location — click any pin to dive in.",
    },
    {
      icon: "🚀",
      title: "Zero Friction",
      desc: "No sign-up walls. Just explore, apply, and get matched fast.",
    },
  ];

  return (
    <div className="lp-root">
      {/* Subtle grid background */}
      <div className="lp-grid-bg" />

      {/* ── HEADER ── */}
      <header className="lp-header">
        <div className="lp-header-left">
          <img src="/logo.png" alt="Startup Arena Logo" className="lp-logo-img" />
        </div>
        <div className="lp-header-right">
          {user && (
            <>
              <span className="lp-role-badge">
                <span className="lp-role-dot" />
                {user.role === "hr" ? "HR Manager" : "Applicant"}
              </span>
              <button className="lp-logout-btn" onClick={onLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="lp-hero">
        <h1 className="lp-hero-title">Startup Arena</h1>
        <p className="lp-hero-sub">
          India's most direct way to discover startup jobs — city by city, on the map.
        </p>
      </section>

      {/* ── FEATURES ── */}
      <section className="lp-features-section">
        <div className="lp-features-row">
          {features.map((f, i) => (
            <div key={i} className="lp-feature-card">
              <span className="lp-feature-icon">{f.icon}</span>
              <h3 className="lp-feature-title">{f.title}</h3>
              <p className="lp-feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CITY CARDS ── */}
      <section className="lp-cities-section">
        <p className="lp-cities-label">EXPLORE BY CITY</p>
        <div className="lp-cities-grid">
          {cities.map((city) => (
            <button
              key={city.key}
              className="lp-city-card"
              style={{ backgroundImage: `url(${city.image})` }}
              onClick={() => onSelectCity(city.key)}
              aria-label={`Explore ${city.name}`}
            >
              <div className="lp-city-overlay" />
              <div className="lp-city-default">
                <span className="lp-city-name">{city.name}</span>
              </div>
              <div className="lp-city-hover-content">
                <span className="lp-city-action">Explore Map →</span>
                <span className="lp-city-action">View Jobs →</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lp-footer">
        <span className="lp-made-by">Made by Shahadat and Abhishek</span>
        <button
          className="lp-enter-btn"
          onClick={() => onSelectCity("Bangalore")}
          id="lp-enter-btn"
        >
          Enter →
        </button>
      </footer>
    </div>
  );
}

export default LandingPage;
