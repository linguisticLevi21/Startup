import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import api from "./api";
import JobDetails from "./JobDetails";
import "./MapView.css";

// Company marker with colored initial
const createCompanyMarker = (companyName) => {
  const colors = [
    "#6366f1",
    "#8b5cf6",
    "#ec4899",
    "#f43f5e",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#14b8a6",
    "#06b6d4",
    "#3b82f6",
    "#a855f7",
    "#e879f9",
  ];

  let hash = 0;
  for (let i = 0; i < companyName.length; i++) {
    hash = companyName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = colors[Math.abs(hash) % colors.length];
  const initial = companyName.charAt(0).toUpperCase();

  const html = `
    <div style="
      background: ${color};
      width: 36px; height: 36px;
      border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      font-weight: 700; color: white; font-size: 15px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.4);
      border: 2px solid rgba(255,255,255,0.2);
      font-family: Inter, sans-serif;
    ">${initial}</div>
  `;

  return L.divIcon({
    html,
    className: "",
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });
};

function MapView({ city }) {
  const [jobs, setJobs] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const cityCoordinates = {
    Bangalore: [12.9716, 77.5946],
    Mumbai: [19.076, 72.8777],
    Delhi: [28.7041, 77.1025],
    Remote: [20.5937, 78.9629],
  };

  const mapCenter = cityCoordinates[city] || [20.5937, 78.9629];
  const mapZoom = city && city !== "Remote" ? 11 : 5;

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.getJobs();
      setJobs(response.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  const groupJobsByCompany = () => {
    const grouped = {};
    jobs.forEach((job) => {
      if (job.location !== city) return;
      if (!grouped[job.company]) {
        grouped[job.company] = {
          company: job.company,
          coordinates: job.coordinates,
          location: job.location,
          jobs: [],
        };
      }
      grouped[job.company].jobs.push(job);
    });
    return Object.values(grouped);
  };

  const allCompanies = groupJobsByCompany();
  const filteredCompanies = allCompanies.filter((company) => {
    const q = filter.toLowerCase();
    return (
      company.company.toLowerCase().includes(q) ||
      company.location.toLowerCase().includes(q) ||
      company.jobs.some((job) => job.title.toLowerCase().includes(q))
    );
  });

  if (loading)
    return (
      <div className="map-view">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          Loading opportunities...
        </div>
      </div>
    );

  return (
    <div className="map-view">
      <div className="map-left">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          className="leaflet-map"
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredCompanies.map((company) => (
            <Marker
              key={company.company}
              position={[company.coordinates.lat, company.coordinates.lng]}
              icon={createCompanyMarker(company.company)}
              eventHandlers={{
                click: () => setSelectedCompany(company),
              }}
            >
              <Popup>
                <strong>{company.company}</strong>
                <br />
                {company.jobs.length} open role
                {company.jobs.length !== 1 ? "s" : ""}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="map-right">
        <div className="panel-header">
          <h2>Startups in {city}</h2>
          <span className="company-count">
            {filteredCompanies.length} companies
          </span>
        </div>

        <div className="panel-search">
          <input
            type="text"
            placeholder="Search companies or roles..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            id="company-search"
          />
        </div>

        <div className="companies-panel">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <div
                key={company.company}
                className={`company-item ${selectedCompany?.company === company.company ? "active" : ""}`}
                onClick={() => setSelectedCompany(company)}
              >
                <div className="company-avatar">
                  {company.company.charAt(0).toUpperCase()}
                </div>
                <div className="company-info">
                  <h3>{company.company}</h3>
                  <div className="company-meta">
                    <span className="role-count">
                      {company.jobs.length} role
                      {company.jobs.length !== 1 ? "s" : ""}
                    </span>
                    <div className="tech-tags">
                      {company.jobs
                        .flatMap((j) => j.tags)
                        .slice(0, 2)
                        .map((tag, i) => (
                          <span key={i} className="tag">
                            {tag}
                          </span>
                        ))}
                      {company.jobs.flatMap((j) => j.tags).length > 2 && (
                        <span className="tag">
                          +{company.jobs.flatMap((j) => j.tags).length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No startups found</p>
              <p className="no-results-hint">Try a different search term</p>
            </div>
          )}
        </div>
      </div>

      {/* Roles Modal */}
      {selectedCompany && !selectedJob && (
        <div
          className="roles-modal-overlay"
          onClick={() => setSelectedCompany(null)}
        >
          <div className="roles-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-company-badge">
                {selectedCompany.company.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2>{selectedCompany.company}</h2>
                <p>{selectedCompany.location}</p>
              </div>
              <button
                className="close-btn"
                onClick={() => setSelectedCompany(null)}
              >
                ✕
              </button>
            </div>

            <div className="roles-list">
              <h3>Open Positions ({selectedCompany.jobs.length})</h3>
              {selectedCompany.jobs.map((job) => (
                <div
                  key={job._id}
                  className="role-item"
                  onClick={() => {
                    setSelectedJob(job);
                    setSelectedCompany(null);
                  }}
                >
                  <div className="role-info">
                    <h4>{job.title}</h4>
                    <p className="salary">{job.salary}</p>
                  </div>
                  <span className="arrow">→</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Job Details */}
      {selectedJob && (
        <JobDetails
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onApplySuccess={fetchJobs}
        />
      )}
    </div>
  );
}

export default MapView;
