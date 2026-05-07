import React, { useState } from "react";
import api from "./api";
import "./Login.css";

function Register({ onLogin, onSwitchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Candidate");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (role === "HR" && !company.trim()) {
      setError("Company name is required for HR.");
      return;
    }

    setLoading(true);

    try {
      const res = await api.register({
        name: name.trim(),
        email: email.trim(),
        password,
        role,
        company: role === "HR" ? company.trim() : "",
      });

      // Auto-login after successful registration
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
      setError(err.response?.data?.error || "Registration failed. Try again.");
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
            <h1>Create Account</h1>
            <p>Join Startup Arena</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="register-name">Full Name</label>
              <input
                type="text"
                id="register-name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                autoComplete="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-email">Email Address</label>
              <input
                type="email"
                id="register-email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-password">Password</label>
              <input
                type="password"
                id="register-password"
                placeholder="Min 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                autoComplete="new-password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-role">I am a</label>
              <select
                id="register-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={loading}
                className="form-select"
              >
                <option value="Candidate">Candidate — Looking for jobs</option>
                <option value="HR">HR — Hiring talent</option>
              </select>
            </div>

            {role === "HR" && (
              <div className="form-group form-group-company">
                <label htmlFor="register-company">Company Name</label>
                <input
                  type="text"
                  id="register-company"
                  placeholder="e.g. Flipkart, Amazon"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  disabled={loading}
                />
              </div>
            )}

            {error && <div className="login-error" id="register-error">{error}</div>}

            <button
              type="submit"
              className="login-btn login-btn-submit"
              disabled={loading}
              id="register-submit-btn"
            >
              {loading ? "Creating account..." : "Create Account →"}
            </button>

            <p className="helper-text">
              Already have an account?{" "}
              <button
                type="button"
                className="switch-link"
                onClick={onSwitchToLogin}
              >
                Sign in here
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

export default Register;
