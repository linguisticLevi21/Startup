import React, { useState } from "react";
import ApplyModal from "./ApplyModal";
import "./JobDetails.css";

function JobDetails({ job, onClose, onApplySuccess }) {
  const [showApplyForm, setShowApplyForm] = useState(false);

  if (!job) return null;

  // Calculate accepted applicants count
  const acceptedCount = job.applicants
    ? job.applicants.filter((a) => a.status === "accepted").length
    : 0;
  const openings = job.openings || 1;
  const positionsAvailable = acceptedCount < openings;

  return (
    <>
      <div className="job-details-overlay" onClick={onClose}>
        <div className="job-details" onClick={(e) => e.stopPropagation()}>
          <button
            className="jd-close-btn"
            onClick={onClose}
            id="job-details-close"
          >
            ✕
          </button>

          <div className="jd-header">
            <h2>{job.title}</h2>
            <p className="jd-company">{job.company}</p>
          </div>

          <div className="jd-info-grid">
            <div className="jd-info-item">
              <span className="jd-info-label">Location</span>
              <span className="jd-info-value">{job.location}</span>
            </div>
            <div className="jd-info-item">
              <span className="jd-info-label">Salary</span>
              <span className="jd-info-value jd-salary">{job.salary}</span>
            </div>
            <div className="jd-info-item">
              <span className="jd-info-label">Openings</span>
              <span className="jd-info-value">
                {acceptedCount}/{openings}
              </span>
            </div>
          </div>

          <div className="jd-section">
            <h3>Description</h3>
            <p>{job.description}</p>
          </div>

          <div className="jd-section">
            <h3>Required Skills</h3>
            <div className="jd-tags">
              {job.tags.map((tag, idx) => (
                <span key={idx} className="jd-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <button
            className="jd-apply-btn"
            onClick={() => setShowApplyForm(true)}
            disabled={!positionsAvailable}
            id="job-apply-btn"
            style={
              !positionsAvailable ? { opacity: 0.6, cursor: "not-allowed" } : {}
            }
          >
            {positionsAvailable
              ? "Apply for this Role →"
              : "✕ No Openings Available"}
          </button>
        </div>
      </div>

      {showApplyForm && (
        <ApplyModal
          job={job}
          onClose={() => setShowApplyForm(false)}
          onSuccess={() => {
            onApplySuccess?.();
            setShowApplyForm(false);
            onClose();
          }}
        />
      )}
    </>
  );
}

export default JobDetails;
