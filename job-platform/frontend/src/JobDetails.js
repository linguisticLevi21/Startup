import React, { useState } from "react";
import ApplyForm from "./ApplyForm";
import "./JobDetails.css";

function JobDetails({ job, onClose, onApplySuccess }) {
  const [showApplyForm, setShowApplyForm] = useState(false);

  if (!job) return null;

  return (
    <>
      <div className="job-details-overlay" onClick={onClose}>
        <div className="job-details" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>

          <div className="job-header">
            <h2>{job.title}</h2>
            <p className="company">{job.company}</p>
          </div>

          <div className="job-info">
            <div className="info-row">
              <span className="label">📍 Location:</span>
              <span>{job.location}</span>
            </div>
            <div className="info-row">
              <span className="label">💰 Salary:</span>
              <span>{job.salary}</span>
            </div>
            <div className="info-row">
              <span className="label">📅 Posted:</span>
              <span>{new Date(job.postedAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="job-description">
            <h3>Description</h3>
            <p>{job.description}</p>
          </div>

          <div className="job-tags">
            <h3>Required Skills</h3>
            <div className="tags">
              {job.tags.map((tag, idx) => (
                <span key={idx} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <button className="apply-btn" onClick={() => setShowApplyForm(true)}>
            Apply Now
          </button>
        </div>
      </div>

      {showApplyForm && (
        <ApplyForm
          jobId={job._id}
          onClose={() => setShowApplyForm(false)}
          onSuccess={onApplySuccess}
        />
      )}
    </>
  );
}

export default JobDetails;
