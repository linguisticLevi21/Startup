import React, { useState } from "react";
import LandingPage from "./LandingPage";
import MapView from "./MapView";
import HRDashboard from "./HRDashboard";
import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState("landing"); // 'landing', 'map', or 'hr'
  const [selectedCity, setSelectedCity] = useState(null);
  const [userMode, setUserMode] = useState("applicant"); // 'applicant' or 'hr'

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setCurrentView("map");
  };

  const handleModeChange = (mode) => {
    setUserMode(mode);
    if (mode === "hr") {
      setCurrentView("hr");
    } else {
      setCurrentView("landing");
    }
  };

  return (
    <div className="app">
      {currentView === "landing" && (
        <LandingPage onSelectCity={handleSelectCity} />
      )}

      {currentView === "map" && (
        <>
          <nav className="navbar">
            <div className="logo">
              <button onClick={() => setCurrentView("landing")}>← Back</button>
              <h1>🚀 {selectedCity || "Job Platform"}</h1>
            </div>
            <div className="nav-buttons">
              <div className="mode-toggle">
                <button
                  className={`mode-btn ${userMode === "applicant" ? "active" : ""}`}
                  onClick={() => handleModeChange("applicant")}
                >
                  Applicant
                </button>
                <button
                  className={`mode-btn ${userMode === "hr" ? "active" : ""}`}
                  onClick={() => handleModeChange("hr")}
                >
                  HR
                </button>
              </div>
              <button
                className={`nav-btn ${currentView === "map" ? "active" : ""}`}
                onClick={() => setCurrentView("map")}
              >
                🗺️ Explore
              </button>
              <button
                className={`nav-btn ${currentView === "hr" ? "active" : ""}`}
                onClick={() => handleModeChange("hr")}
              >
                👥 Dashboard
              </button>
            </div>
          </nav>
          <MapView city={selectedCity} userMode={userMode} />
        </>
      )}

      {currentView === "hr" && (
        <>
          <nav className="navbar">
            <div className="logo">
              <button onClick={() => setCurrentView("landing")}>← Back</button>
              <h1>🚀 HR Dashboard</h1>
            </div>
            <div className="nav-buttons">
              <div className="mode-toggle">
                <button
                  className={`mode-btn ${userMode === "applicant" ? "active" : ""}`}
                  onClick={() => handleModeChange("applicant")}
                >
                  Applicant
                </button>
                <button
                  className={`mode-btn ${userMode === "hr" ? "active" : ""}`}
                  onClick={() => handleModeChange("hr")}
                >
                  HR
                </button>
              </div>
              <button
                className={`nav-btn ${currentView === "map" ? "active" : ""}`}
                onClick={() => setCurrentView("map")}
              >
                🗺️ Explore
              </button>
              <button
                className={`nav-btn ${currentView === "hr" ? "active" : ""}`}
                onClick={() => setCurrentView("hr")}
              >
                👥 Dashboard
              </button>
            </div>
          </nav>
          <HRDashboard />
        </>
      )}
    </div>
  );
}

export default App;
