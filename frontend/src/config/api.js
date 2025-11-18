const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const API_ENDPOINTS = {
  bookings: `${API_BASE_URL}/api/bookings`,
  adminLogin: `${API_BASE_URL}/api/admin/login`,
  updateBookingStatus: (id) => `${API_BASE_URL}/api/bookings/${id}/status`,
};

export default API_BASE_URL;
