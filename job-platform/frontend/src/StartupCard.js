import React from "react";
import "./StartupCard.css";

function StartupCard({ company, isSelected, onClick }) {
  const getCompanyColor = (name) => {
    const colors = [
      "#667eea",
      "#764ba2",
      "#f093fb",
      "#4facfe",
      "#00f2fe",
      "#43e97b",
      "#fa709a",
      "#fee140",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const logo = company.company.charAt(0).toUpperCase();
  const color = getCompanyColor(company.company);

  return (
    <div
      className={`startup-card ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className="card-logo" style={{ backgroundColor: color }}>
        {logo}
      </div>

      <div className="card-content">
        <h3 className="company-name">{company.company}</h3>
        <p className="company-location">📍 {company.location}</p>

        <div className="card-stats">
          <span className="stat">
            <span className="stat-icon">💼</span>
            {company.jobs.length} {company.jobs.length === 1 ? "role" : "roles"}
          </span>
        </div>

        <div className="card-skills">
          {company.jobs
            .slice(0, 3)
            .flatMap((job) => job.tags)
            .slice(0, 3)
            .map((tag, idx) => (
              <span key={idx} className="skill-badge">
                {tag}
              </span>
            ))}
          {company.jobs.flatMap((job) => job.tags).length > 3 && (
            <span className="skill-badge more">+more</span>
          )}
        </div>

        <button className="card-btn">View Opportunities →</button>
      </div>
    </div>
  );
}

export default StartupCard;
