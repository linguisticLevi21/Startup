import React, { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [loading, setLoading] = useState(false);

  const handleRoleLogin = (role) => {
    setLoading(true);

    setTimeout(() => {
      const user =
        role === "hr"
          ? { email: "hr@startuparena.com", role: "hr", name: "HR Manager" }
          : { email: "candidate@startuparena.com", role: "applicant", name: "Job Seeker" };

      localStorage.setItem("user", JSON.stringify(user));
      onLogin(user);
      setLoading(false);
    }, 400);
  };

  return (
    <div className="login-page">
      <div className="login-branding">
        <h1 className="brand-title">Startup Job Arena</h1>
        <p className="brand-motto">
          Direct access to India's top startup roles.
        </p>
      </div>

      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <h1>Startup Arena</h1>
            <p>Choose how you'd like to continue</p>
          </div>

          <div className="login-form">
            <button
              className="login-btn login-btn-hr"
              onClick={() => handleRoleLogin("hr")}
              disabled={loading}
              id="login-hr-btn"
            >
              {loading ? "Logging in..." : "🏢  Login as HR"}
            </button>

            <button
              className="login-btn login-btn-candidate"
              onClick={() => handleRoleLogin("applicant")}
              disabled={loading}
              id="login-candidate-btn"
            >
              {loading ? "Logging in..." : "🎯  Login as Candidate"}
            </button>
          </div>
        </div>
      </div>

      <div className="login-footer">
        <p>Created by Shahadat and Abhishek</p>
      </div>
    </div>
  );
}

export default Login;
