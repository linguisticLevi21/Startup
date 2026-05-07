import axios from "axios";

const API_BASE = "http://localhost:5000/api";

const api = {
  // Auth
  login: (email, password) =>
    axios.post(`${API_BASE}/auth/login`, { email, password }),
  register: (data) =>
    axios.post(`${API_BASE}/auth/register`, data),

  // Jobs
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
  getJobsByCompany: (companyName) =>
    axios.get(`${API_BASE}/jobs/company/${encodeURIComponent(companyName)}`),
  getApplicants: (jobId) => axios.get(`${API_BASE}/jobs/${jobId}/applicants`),
  applyForJob: (data) => axios.post(`${API_BASE}/apply`, data),
  acceptApplicant: (jobId, email) =>
    axios.post(`${API_BASE}/accept`, { jobId, email }),
  rejectApplicant: (jobId, email) =>
    axios.post(`${API_BASE}/reject`, { jobId, email }),
  updateApplicantStatus: (jobId, applicantId, status) =>
    axios.put(`${API_BASE}/jobs/${jobId}/applicants/${applicantId}/status`, { status }),
};

export default api;
