import React, { useState } from "react";
import "./LoginPage.css";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      alert("Please enter an email");
      return;
    }

    setLoading(true);

    // Simulate delay
    setTimeout(() => {
      const isHR = email.toLowerCase() === "hr@test.com";
      const role = isHR ? "hr" : "applicant";

      // Store role in localStorage
      localStorage.setItem("userRole", role);
      localStorage.setItem("userEmail", email);

      onLogin(role);
    }, 500);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <h1>Startup Arena</h1>
            <p>Find your next opportunity</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
