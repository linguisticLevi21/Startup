import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Login from "./Login";
import Register from "./Register";
import LandingPage from "./LandingPage";
import MapView from "./MapView";
import HRDashboard from "./HRDashboard";
import { NavLogo } from "./NavLogo";
import "./App.css";

// Animation variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  out: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const VALID_CITIES = ["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Remote"];

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState("landing");
  const [selectedCity, setSelectedCity] = useState(null);
  const [authView, setAuthView] = useState("login"); // "login" or "register"

  // Check localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed?.company && !localStorage.getItem("company")) {
          localStorage.setItem("company", parsed.company);
        }
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
    localStorage.removeItem("company");
    localStorage.removeItem("token");
    setUser(null);
    setCurrentView("landing");
    setSelectedCity(null);
    setAuthView("login");
  };

  const handleSelectCity = (city) => {
    if (!VALID_CITIES.includes(city)) return;
    setSelectedCity(city);
    setCurrentView("map");
  };

  // Not logged in → show login or register
  if (!user) {
    if (authView === "register") {
      return (
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
        >
          <Register
            onLogin={handleLogin}
            onSwitchToLogin={() => setAuthView("login")}
          />
        </motion.div>
      );
    }
    return (
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
      >
        <Login
          onLogin={handleLogin}
          onSwitchToRegister={() => setAuthView("register")}
        />
      </motion.div>
    );
  }

  return (
    <div className="app">
      {user.role === "hr" ? (
        /* HR view keeps the full navbar */
        <motion.div
          key="hr-view"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          style={{ display: "flex", flexDirection: "column", flex: 1 }}
        >
          <nav className="navbar" id="main-navbar">
            <div className="nav-left">
              <NavLogo onClick={() => setCurrentView("hr")} />
            </div>
            <div className="nav-right">
              <div className="nav-role-badge" id="nav-role-badge">
                <span className="role-dot hr"></span>
                {user.company ? `${user.company} HR` : "HR Manager"}
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
          <main className="app-content">
            <HRDashboard />
          </main>
        </motion.div>
      ) : (
        /* Applicant flow */
        <motion.div
          key="applicant-view"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          style={{ display: "flex", flexDirection: "column", flex: 1 }}
        >
          {currentView === "landing" && (
            <LandingPage
              onSelectCity={handleSelectCity}
              user={user}
              onLogout={handleLogout}
            />
          )}
          {currentView === "map" && (
            <>
              <nav className="navbar" id="main-navbar">
                <div className="nav-left">
                  <NavLogo onClick={() => setCurrentView("landing")} />
                  <button
                    className="nav-back-btn"
                    onClick={() => setCurrentView("landing")}
                    id="nav-back-btn"
                  >
                    ← Cities
                  </button>
                </div>
                <div className="nav-right">
                  <div className="nav-role-badge" id="nav-role-badge">
                    <span className="role-dot applicant"></span>
                    {user.name || "Applicant"}
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
              <main className="app-content">
                <MapView city={selectedCity} />
              </main>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default App;
