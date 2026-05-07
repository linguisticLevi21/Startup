import React, { useState } from "react";
import api from "./api";
import "./Login.css";

function Login({ onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await api.login(email.trim(), password);

      // Save JWT token + user data
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("company", user.company || "");
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: user.id,
          email: user.email,
          role: user.role === "HR" ? "hr" : "applicant",
          name: user.name,
          company: user.company,
        })
      );

      onLogin({
        id: user.id,
        email: user.email,
        role: user.role === "HR" ? "hr" : "applicant",
        name: user.name,
        company: user.company,
      });
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid Email or Password");
      } else {
        setError(err.response?.data?.error || "Server error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
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
            <p>Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="login-email">Email Address</label>
              <input
                type="email"
                id="login-email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="login-password">Password</label>
              <input
                type="password"
                id="login-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                autoComplete="current-password"
              />
            </div>

            {error && <div className="login-error" id="login-error">{error}</div>}

            <button
              type="submit"
              className="login-btn login-btn-submit"
              disabled={loading}
              id="login-submit-btn"
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>

            <p className="helper-text">
              Don't have an account?{" "}
              <button
                type="button"
                className="switch-link"
                onClick={onSwitchToRegister}
              >
                Register here
              </button>
            </p>
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
