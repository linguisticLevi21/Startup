import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import api from "./api";
import JobDetails from "./JobDetails";
import "./MapView.css";

// Create company logo markers
const createCompanyMarker = (companyName) => {
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA07A",
    "#98D8C8",
    "#F7DC6F",
    "#BB8FCE",
    "#85C1E2",
    "#F8B88B",
    "#A8E6CF",
    "#FF8B94",
    "#A8D8EA",
    "#FFE66D",
    "#95E1D3",
    "#F38181",
  ];

  let hash = 0;
  for (let i = 0; i < companyName.length; i++) {
    hash = companyName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = colors[Math.abs(hash) % colors.length];
  const initial = companyName.charAt(0).toUpperCase();

  const html = `
    <div class="company-marker" style="background-color: ${color}; border: 2px solid rgba(255,255,255,0.9); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; font-size: 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
      ${initial}
    </div>
  `;

  return L.divIcon({
    html,
    className: "",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });
};

function MapView({ city }) {
  const [jobs, setJobs] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

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

  const groupJobsByCompany = () => {
    const grouped = {};
    jobs.forEach((job) => {
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
    return (
      company.company.toLowerCase().includes(filter.toLowerCase()) ||
      company.location.toLowerCase().includes(filter.toLowerCase()) ||
      company.jobs.some((job) =>
        job.title.toLowerCase().includes(filter.toLowerCase()),
      )
    );
  });

  if (loading)
    return (
      <div className="map-view">
        <div className="loading-state">Loading opportunities...</div>
      </div>
    );

  return (
    <div className="map-view">
      <div className="map-left">
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={5}
          className="leaflet-map"
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
              <Popup>{company.company}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="map-right">
        <div className="panel-header">
          <h2>Startups in {city || "India"}</h2>
          <p className="company-count">{filteredCompanies.length} companies</p>
        </div>

        <div className="panel-search">
          <input
            type="text"
            placeholder="Search companies..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
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
                <div className="company-logo">
                  {company.company.charAt(0).toUpperCase()}
                </div>
                <div className="company-info">
                  <h3>{company.company}</h3>
                  <p className="location">{company.location}</p>
                  <div className="company-meta">
                    <span className="role-count">
                      {company.jobs.length} roles
                    </span>
                    <div className="tech-tags">
                      {company.jobs
                        .slice(0, 2)
                        .flatMap((j) => j.tags)
                        .slice(0, 2)
                        .map((tag, i) => (
                          <span key={i} className="tag">
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No results found</div>
          )}
        </div>
      </div>

      {selectedCompany && !selectedJob && (
        <div
          className="roles-modal-overlay"
          onClick={() => setSelectedCompany(null)}
        >
          <div className="roles-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedCompany.company}</h2>
              <p>{selectedCompany.location}</p>
              <button
                className="close-btn"
                onClick={() => setSelectedCompany(null)}
              >
                ✕
              </button>
            </div>

            <div className="roles-list">
              <h3>Available Roles</h3>
              {selectedCompany.jobs.map((job) => (
                <div
                  key={job._id}
                  className="role-item"
                  onClick={() => setSelectedJob(job)}
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
