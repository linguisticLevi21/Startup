import React, { useState, useEffect, useMemo } from "react";
import api from "./api";
import "./HRDashboard.css";

function HRDashboard() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("all");
  const [actionLoading, setActionLoading] = useState(null);

  const storedUser = (() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  })();
  const company = storedUser?.company || localStorage.getItem("company") || "";
  const loggedInEmail = storedUser?.email || "";

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
    setSortBy("all");
    try {
      const response = await api.getApplicants(job._id);
      setApplicants(response.data);
    } catch (err) {
      console.error("Error fetching applicants:", err);
      setApplicants([]);
    }
  };

  const handleAction = async (applicantId, status) => {
    if (!selectedJob) return;
    setActionLoading(applicantId);
    try {
      await api.updateApplicantStatus(selectedJob._id, applicantId, status);
      const response = await api.getApplicants(selectedJob._id);
      setApplicants(response.data);
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setActionLoading(null);
    }
  };

  // ── Derived sorted/filtered list using useMemo ────────────────────
  const sortedApplicants = useMemo(() => {
    if (sortBy === "all") return applicants;

    let list = [...applicants];

    switch (sortBy) {
      case "recent":
        list.sort(
          (a, b) => new Date(b.appliedAt || 0) - new Date(a.appliedAt || 0),
        );
        break;
      case "experience-high":
        list.sort((a, b) => (b.experience || 0) - (a.experience || 0));
        break;
      case "experience-low":
        list.sort((a, b) => (a.experience || 0) - (b.experience || 0));
        break;
      case "exp-gt-2":
        list = list.filter((a) => (a.experience || 0) > 2);
        list.sort((a, b) => (b.experience || 0) - (a.experience || 0));
        break;
      default:
        break;
    }

    return list;
  }, [applicants, sortBy]);

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

            {/* ── Filter / Sort Bar ── */}
            <div className="hr-filter-bar">
              <select
                className="hr-filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="all">All Applicants</option>
                <option value="recent">Sort by Recent</option>
                <option value="experience-high">Experience: High → Low</option>
                <option value="experience-low">Experience: Low → High</option>
                <option value="exp-gt-2">Filter: Exp &gt; 2 years</option>
              </select>
              <span className="hr-filter-count">
                {sortedApplicants.length} applicant
                {sortedApplicants.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* ── Applicant Cards ── */}
            <div className="hr-applicants-list">
              {sortedApplicants.length > 0 ? (
                sortedApplicants.map((applicant) => {
                  const isActioned =
                    applicant.status === "accepted" ||
                    applicant.status === "rejected";

                  return (
                    <div
                      key={applicant._id || applicant.email}
                      className="hr-applicant-card"
                    >
                      {/* Name + status badge */}
                      <div className="hr-applicant-header">
                        <div className="hr-applicant-name">
                          {applicant.name}
                        </div>
                        {isActioned && (
                          <span
                            style={{
                              padding: "4px 10px",
                              borderRadius: "6px",
                              fontSize: "11px",
                              fontWeight: 600,
                              backgroundColor:
                                applicant.status === "accepted"
                                  ? "rgba(34,197,94,0.15)"
                                  : "rgba(239,68,68,0.15)",
                              color:
                                applicant.status === "accepted"
                                  ? "#22c55e"
                                  : "#ef4444",
                              border: `1px solid ${
                                applicant.status === "accepted"
                                  ? "rgba(34,197,94,0.3)"
                                  : "rgba(239,68,68,0.3)"
                              }`,
                            }}
                          >
                            {applicant.status === "accepted"
                              ? "✓ Accepted"
                              : "✕ Rejected"}
                          </span>
                        )}
                      </div>

                      {/* Details */}
                      <div className="hr-applicant-email">
                        {applicant.email}
                      </div>
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

                      {applicant.skills?.length > 0 && (
                        <div className="hr-applicant-skills">
                          {applicant.skills.map((skill, i) => (
                            <span key={i} className="hr-skill-tag">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* ── ACTION BUTTONS ── */}
                      {!isActioned && (
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            marginTop: "16px",
                            paddingTop: "12px",
                            borderTop: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <button
                            onClick={() =>
                              handleAction(applicant._id, "Accepted")
                            }
                            disabled={actionLoading === applicant._id}
                            style={{
                              flex: 1,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "6px",
                              padding: "10px 16px",
                              minHeight: "44px",
                              background: "rgba(34, 197, 94, 0.15)",
                              color: "#4ade80",
                              border: "1px solid rgba(34, 197, 94, 0.35)",
                              borderRadius: "8px",
                              fontSize: "14px",
                              fontWeight: 600,
                              cursor: "pointer",
                              fontFamily: "inherit",
                              lineHeight: "1.2",
                            }}
                          >
                            {actionLoading === applicant._id
                              ? "..."
                              : "✓ Accept"}
                          </button>
                          <button
                            onClick={() =>
                              handleAction(applicant._id, "Rejected")
                            }
                            disabled={actionLoading === applicant._id}
                            style={{
                              flex: 1,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "6px",
                              padding: "10px 16px",
                              minHeight: "44px",
                              background: "rgba(239, 68, 68, 0.15)",
                              color: "#f87171",
                              border: "1px solid rgba(239, 68, 68, 0.35)",
                              borderRadius: "8px",
                              fontSize: "14px",
                              fontWeight: 600,
                              cursor: "pointer",
                              fontFamily: "inherit",
                              lineHeight: "1.2",
                            }}
                          >
                            {actionLoading === applicant._id
                              ? "..."
                              : "✕ Reject"}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
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
