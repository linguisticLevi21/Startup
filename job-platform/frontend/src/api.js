import axios from "axios";

const API_BASE = "http://localhost:5000/api";

const api = {
  getJobs: () => axios.get(`${API_BASE}/jobs`),
  getJobById: (id) => axios.get(`${API_BASE}/jobs/${id}`),
  getApplicants: (jobId) => axios.get(`${API_BASE}/jobs/${jobId}/applicants`),
  applyForJob: (data) => axios.post(`${API_BASE}/apply`, data),
};

export default api;
