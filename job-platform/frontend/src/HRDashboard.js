import React, { useState, useEffect } from "react";
import api from "./api";
import "./HRDashboard.css";

function HRDashboard() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("experience"); // Sort by experience only

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
      setApplicants(response.data);
    } catch (err) {
      console.error("Error fetching applicants:", err);
    }
  };

  const getSortedApplicants = () => {
    return [...applicants].sort((a, b) => b.experience - a.experience);
  };

  if (loading) return <div className="loading">Loading HR Dashboard...</div>;

  return (
    <div className="hr-dashboard">
      <h1>HR Dashboard - Applicant Management</h1>

      <div className="dashboard-container">
        <div className="jobs-list">
          <h2>Jobs</h2>
          <div className="jobs">
            {jobs.map((job) => (
              <div
                key={job._id}
                className={`job-card ${selectedJob?._id === job._id ? "active" : ""}`}
                onClick={() => handleSelectJob(job)}
              >
                <h3>{job.title}</h3>
                <p>{job.company}</p>
                <p className="location">📍 {job.location}</p>
                <p className="applicant-count">
                  {(job.applicants || []).length} applicant
                  {(job.applicants || []).length !== 1 ? "s" : ""}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="applicants-section">
          {selectedJob ? (
            <>
              <div className="section-header">
                <h2>{selectedJob.title} - Applicants</h2>
              </div>

              {applicants.length === 0 ? (
                <p className="no-applicants">No applicants yet</p>
              ) : (
                <div className="applicants">
                  {getSortedApplicants().map((applicant, idx) => (
                    <div key={idx} className="applicant-card">
                      <div className="applicant-header">
                        <div>
                          <h3>{applicant.name}</h3>
                          <p className="email">{applicant.email}</p>
                        </div>
                      </div>

                      <div className="applicant-info">
                        <div className="info-item">
                          <span className="label">Experience:</span>
                          <span>{applicant.experience} years</span>
                        </div>
                      </div>

                      <div className="skills">
                        <p className="skills-label">Skills:</p>
                        <div className="skill-tags">
                          {applicant.skills.map((skill, idx) => (
                            <span key={idx} className="skill-tag">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="applied-date">
                        Applied:{" "}
                        {new Date(applicant.appliedAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="no-selection">
              <p>Select a job to view applicants</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HRDashboard;
