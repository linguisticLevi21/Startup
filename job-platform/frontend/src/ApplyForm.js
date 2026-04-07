import React, { useState } from "react";
import api from "./api";
import "./ApplyForm.css";

function ApplyForm({ jobId, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    experience: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await api.applyForJob({
        ...formData,
        experience: parseInt(formData.experience),
        skills: formData.skills.split(",").map((s) => s.trim()),
        jobId,
      });

      setMessage(`Success! Application submitted`);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.error || "Application failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apply-form-overlay">
      <div className="apply-form">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
        <h2>Apply for Job</h2>

        {message && (
          <div
            className={`message ${message.includes("Success") ? "success" : "error"}`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="skills"
            placeholder="Skills (comma separated, e.g., React, Node.js, MongoDB)"
            value={formData.skills}
            onChange={handleChange}
            required
            rows="3"
          />

          <input
            type="number"
            name="experience"
            placeholder="Years of Experience"
            value={formData.experience}
            onChange={handleChange}
            required
            min="0"
          />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Apply Now"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApplyForm;
