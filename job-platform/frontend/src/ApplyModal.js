import React, { useState } from "react";
import api from "./api";
import "./ApplyModal.css";

function ApplyModal({ job, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: localStorage.getItem("userEmail") || "",
    skills: "",
    experience: "",
    portfolio: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.skills ||
      !formData.experience
    ) {
      setMessage("All fields are required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await api.applyForJob({
        ...formData,
        experience: parseInt(formData.experience),
        skills: formData.skills.split(",").map((s) => s.trim()),
        portfolio: formData.portfolio.trim(),
        jobId: job._id,
      });

      setMessage("✓ Application submitted successfully!");
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 1000);
    } catch (err) {
      setMessage(`Error: ${err.response?.data?.error || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apply-modal-overlay" onClick={onClose}>
      <div className="apply-modal" onClick={(e) => e.stopPropagation()}>
        <button className="apply-modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="apply-modal-header">
          <h2>{job.title}</h2>
          <p>{job.company}</p>
        </div>

        <form onSubmit={handleSubmit} className="apply-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Skills (comma separated)</label>
            <textarea
              name="skills"
              placeholder="React, Node.js, MongoDB"
              value={formData.skills}
              onChange={handleChange}
              disabled={loading}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Years of Experience</label>
            <input
              type="number"
              name="experience"
              placeholder="2"
              min="0"
              max="50"
              value={formData.experience}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Portfolio Link (Optional)</label>
            <input
              type="url"
              name="portfolio"
              placeholder="https://yourportfolio.com or https://github.com/yourprofile"
              value={formData.portfolio}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {message && (
            <div
              className={`message ${message.includes("Error") ? "error" : "success"}`}
            >
              {message}
            </div>
          )}

          <button type="submit" className="apply-submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Apply Now"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApplyModal;
