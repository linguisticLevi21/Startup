import React, { useState, useEffect } from "react";
import Login from "./Login";
import LandingPage from "./LandingPage";
import MapView from "./MapView";
import HRDashboard from "./HRDashboard";
import "./App.css";

const VALID_CITIES = ["Bangalore", "Mumbai", "Delhi", "Remote"];

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState("landing");
  const [selectedCity, setSelectedCity] = useState(null);

  // Check localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        if (parsed.role === "hr") {
          setCurrentView("hr");
        }
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    if (userData.role === "hr") {
      setCurrentView("hr");
    } else {
      setCurrentView("landing");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setCurrentView("landing");
    setSelectedCity(null);
  };

  const handleSelectCity = (city) => {
    if (!VALID_CITIES.includes(city)) return;
    setSelectedCity(city);
    setCurrentView("map");
  };

  // Not logged in → show login
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar" id="main-navbar">
        <div className="nav-left">
          <div
            className="nav-brand"
            onClick={() =>
              setCurrentView(user.role === "hr" ? "hr" : "landing")
            }
          >
            <div className="nav-logo-icon">S</div>
            <span className="nav-logo-text">Startup Arena</span>
          </div>

          {user.role === "applicant" && currentView === "map" && (
            <button
              className="nav-back-btn"
              onClick={() => setCurrentView("landing")}
              id="nav-back-btn"
            >
              ← Cities
            </button>
          )}
        </div>

        <div className="nav-right">
          <div className="nav-role-badge" id="nav-role-badge">
            <span
              className={`role-dot ${user.role === "hr" ? "hr" : "applicant"}`}
            ></span>
            {user.role === "hr" ? "HR Manager" : "Applicant"}
          </div>
          <button
            className="nav-logout-btn"
            onClick={handleLogout}
            id="nav-logout-btn"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="app-content">
        {user.role === "hr" ? (
          <HRDashboard />
        ) : (
          <>
            {currentView === "landing" && (
              <LandingPage onSelectCity={handleSelectCity} />
            )}
            {currentView === "map" && <MapView city={selectedCity} />}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
