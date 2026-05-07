import axios from "axios";

const API_BASE = "http://localhost:5000/api";

const api = {
  getJobs: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.city) params.append("city", filters.city);
    if (filters.jobRole) params.append("jobRole", filters.jobRole);
    if (filters.experienceLevel) params.append("experienceLevel", filters.experienceLevel);
    const query = params.toString();
    return axios.get(`${API_BASE}/jobs${query ? `?${query}` : ""}`);
  },
  getJobById: (id) => axios.get(`${API_BASE}/jobs/${id}`),
  getJobsByHR: (email) => axios.get(`${API_BASE}/jobs/hr/${encodeURIComponent(email)}`),
  getApplicants: (jobId) => axios.get(`${API_BASE}/jobs/${jobId}/applicants`),
  applyForJob: (data) => axios.post(`${API_BASE}/apply`, data),
  acceptApplicant: (jobId, email) =>
    axios.post(`${API_BASE}/accept`, { jobId, email }),
  rejectApplicant: (jobId, email) =>
    axios.post(`${API_BASE}/reject`, { jobId, email }),
};

export default api;
