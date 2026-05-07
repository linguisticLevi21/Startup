import React, { useState, useEffect } from "react";
import api from "./api";
import "./HRDashboard.css";

function HRDashboard() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("recent"); // "recent" | "experience"
  const [actionLoading, setActionLoading] = useState(null); // applicantId being acted upon

  // Read company from localStorage (set during real JWT login)
  const company = localStorage.getItem("company") || "";
  const loggedInEmail = (() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored).email : "";
    } catch {
      return "";
    }
  })();

  useEffect(() => {
    if (!company) {
      setLoading(false);
      return;
    }
    fetchJobs();
    // eslint-disable-next-line
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.getJobsByCompany(company);
      setJobs(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setLoading(false);
    }
  };

  const handleSelectJob = async (job) => {
    setSelectedJob(job);
    setSortBy("recent");
    try {
      const response = await api.getApplicants(job._id);
      setApplicants(response.data);
    } catch (err) {
      console.error("Error fetching applicants:", err);
      setApplicants([]);
    }
  };

  // ── Accept / Reject via PUT endpoint ──────────────────────────────
  const handleAction = async (applicantId, status) => {
    if (!selectedJob) return;
    setActionLoading(applicantId);
    try {
      await api.updateApplicantStatus(selectedJob._id, applicantId, status);
      // Refresh applicants
      const response = await api.getApplicants(selectedJob._id);
      setApplicants(response.data);
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setActionLoading(null);
    }
  };

  // ── Sort / Filter logic ───────────────────────────────────────────
  const getFilteredApplicants = () => {
    let list = [...applicants];

    if (sortBy === "recent") {
      list.sort(
        (a, b) => new Date(b.appliedAt || 0) - new Date(a.appliedAt || 0)
      );
    } else if (sortBy === "experience") {
      list = list.filter((a) => (a.experience || 0) > 2);
      list.sort((a, b) => (b.experience || 0) - (a.experience || 0));
    }

    return list;
  };

  if (loading) {
    return <div className="hr-loading">Loading HR Dashboard...</div>;
  }

  if (!company) {
    return (
      <div className="hr-loading">
        <p>⚠️ Not authenticated. Please log in with a valid HR account.</p>
      </div>
    );
  }

  const filteredApplicants = getFilteredApplicants();

  return (
    <div className="hr-dashboard">
      <div className="hr-jobs-panel">
        <div className="hr-panel-header">
          <h2>Welcome, {company} HR</h2>
          <p className="hr-company-name">{loggedInEmail}</p>
          <span className="job-count">{jobs.length} jobs</span>
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

            {/* Filter bar */}
            <div className="hr-filter-bar">
              <select
                className="hr-filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recent">Sort by Recent</option>
                <option value="experience">Filter: Exp &gt; 2 yrs</option>
              </select>
              <span className="hr-filter-count">
                {filteredApplicants.length} applicant{filteredApplicants.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="hr-applicants-list">
              {filteredApplicants.length > 0 ? (
                filteredApplicants.map((applicant) => (
                  <div key={applicant._id || applicant.email} className="hr-applicant-card">
                    <div className="hr-applicant-header">
                      <div className="hr-applicant-name">{applicant.name}</div>
                      {applicant.status !== "pending" && (
                        <div
                          className={`hr-status-badge hr-status-${applicant.status}`}
                        >
                          {applicant.status === "accepted" && "✓ Accepted"}
                          {applicant.status === "rejected" && "✕ Rejected"}
                        </div>
                      )}
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
                      {applicant.skills?.map((skill, i) => (
                        <span key={i} className="hr-skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Accept / Reject buttons — shown only for pending */}
                    {applicant.status === "pending" && (
                      <div className="hr-action-buttons">
                        <button
                          className="hr-accept-btn"
                          onClick={() => handleAction(applicant._id, "Accepted")}
                          disabled={actionLoading === applicant._id}
                        >
                          {actionLoading === applicant._id ? "..." : "✓ Accept"}
                        </button>
                        <button
                          className="hr-reject-btn"
                          onClick={() => handleAction(applicant._id, "Rejected")}
                          disabled={actionLoading === applicant._id}
                        >
                          {actionLoading === applicant._id ? "..." : "✕ Reject"}
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
