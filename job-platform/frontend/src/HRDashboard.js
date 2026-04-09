import React, { useState, useEffect } from "react";
import api from "./api";
import "./HRDashboard.css";

function HRDashboard() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.getJobs();
      setJobs(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setLoading(false);
    }
  };

  const handleSelectJob = async (job) => {
    setSelectedJob(job);
    try {
      const response = await api.getApplicants(job._id);
      // Sort by matchScore descending
      const sorted = [...response.data].sort(
        (a, b) => (b.matchScore || 0) - (a.matchScore || 0),
      );
      setApplicants(sorted);
    } catch (err) {
      console.error("Error fetching applicants:", err);
      setApplicants([]);
    }
  };

  const handleAccept = async (email) => {
    try {
      await api.acceptApplicant(selectedJob._id, email);
      // Refresh applicants
      handleSelectJob(selectedJob);
    } catch (err) {
      console.error("Error accepting applicant:", err);
    }
  };

  const handleReject = async (email) => {
    try {
      await api.rejectApplicant(selectedJob._id, email);
      // Refresh applicants
      handleSelectJob(selectedJob);
    } catch (err) {
      console.error("Error rejecting applicant:", err);
    }
  };

  if (loading) {
    return <div className="hr-loading">Loading HR Dashboard...</div>;
  }

  return (
    <div className="hr-dashboard">
      <div className="hr-jobs-panel">
        <div className="hr-panel-header">
          <h2>All Jobs</h2>
          <span className="job-count">{jobs.length}</span>
        </div>
        <div className="hr-jobs-list">
          {jobs.map((job) => (
            <div
              key={job._id}
              className={`hr-job-card ${selectedJob?._id === job._id ? "active" : ""}`}
              onClick={() => handleSelectJob(job)}
            >
              <div className="hr-job-title">{job.title}</div>
              <div className="hr-job-meta">
                <span className="hr-company">{job.company}</span>
                <span className="hr-applicant-badge">
                  {job.applicants.length} 👥
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hr-applicants-panel">
        {selectedJob ? (
          <>
            <div className="hr-panel-header">
              <h2>{selectedJob.title}</h2>
              <p className="hr-company-name">{selectedJob.company}</p>
            </div>
            <div className="hr-applicants-list">
              {applicants.length > 0 ? (
                applicants.map((applicant, idx) => (
                  <div key={idx} className="hr-applicant-card">
                    <div className="hr-applicant-header">
                      <div className="hr-applicant-name">{applicant.name}</div>
                      <div
                        className={`hr-status-badge hr-status-${applicant.status || "pending"}`}
                      >
                        {applicant.status === "accepted" && "✓ Accepted"}
                        {applicant.status === "rejected" && "✕ Rejected"}
                        {applicant.status === "pending" && "⏳ Pending"}
                      </div>
                    </div>
                    <div className="hr-applicant-email">{applicant.email}</div>
                    <div className="hr-applicant-experience">
                      {applicant.experience} years exp
                    </div>
                    {applicant.portfolio && (
                      <div className="hr-portfolio-link">
                        <a
                          href={applicant.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          📎 Portfolio
                        </a>
                      </div>
                    )}
                    <div className="hr-applicant-skills">
                      {applicant.skills.map((skill, i) => (
                        <span key={i} className="hr-skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="hr-match-badge">
                      {applicant.matchScore}% match
                    </div>
                    {applicant.status === "pending" && (
                      <div className="hr-action-buttons">
                        <button
                          className="hr-accept-btn"
                          onClick={() => handleAccept(applicant.email)}
                        >
                          ✓ Accept
                        </button>
                        <button
                          className="hr-reject-btn"
                          onClick={() => handleReject(applicant.email)}
                        >
                          ✕ Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="hr-no-applicants">No applicants yet</div>
              )}
            </div>
          </>
        ) : (
          <div className="hr-no-job-selected">
            <p>Select a job to view applicants</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HRDashboard;
