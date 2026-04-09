import React, { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      alert("Please enter an email");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const isHR = email.toLowerCase().trim() === "hr@test.com";
      const role = isHR ? "hr" : "applicant";

      const user = {
        email: email.toLowerCase().trim(),
        role,
        name: isHR ? "HR Manager" : "Job Seeker",
      };

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
            <p>Find your next opportunity</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
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

      <div className="login-footer">
        <p>Created by Shahadat and Abhishek</p>
      </div>
    </div>
  );
}

export default Login;
