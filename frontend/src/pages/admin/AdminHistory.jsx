import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import "../../styles/AdminDashboard.css";

function AdminHistory() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Fetch history bookings
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("http://localhost:5000/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

      const data = await res.json();
      if (data.success) {
        // Filter only completed and cancelled
        const historyBookings = data.data.filter(
          (b) => b.status === "Completed" || b.status === "Cancelled"
        );
        setBookings(historyBookings);
        setFilteredBookings(historyBookings);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error loading history:", err);
      setError("Server error. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Apply search, filter, and sort
  useEffect(() => {
    let result = [...bookings];

    // Search
    if (searchQuery) {
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.phone.includes(searchQuery) ||
          b.service.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== "All") {
      result = result.filter((b) => b.status === filterStatus);
    }

    // Sort
    if (sortBy === "Latest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "Oldest") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === "Service") {
      result.sort((a, b) => a.service.localeCompare(b.service));
    }

    setFilteredBookings(result);
  }, [searchQuery, filterStatus, sortBy, bookings]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()} ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  return (
    <div className="admin-dashboard standalone-page">
      <AdminNavbar
        onSearch={setSearchQuery}
        onFilterChange={setFilterStatus}
        onSortChange={setSortBy}
        activeFilter={filterStatus}
        activeSort={sortBy}
      />

      <div className="admin-content" style={{ marginTop: "120px" }}>
        <div className="container">
          {/* Header */}
          <div className="admin-header glass" style={{ position: "relative" }}>
            <h1 className="admin-title">✨ Booking History</h1>
            <p className="admin-subtitle">
              Completed and cancelled bookings ({filteredBookings.length})
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading history...</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="error-container glass">
              <p className="error-message">❌ {error}</p>
            </div>
          )}

          {/* History Grid */}
          {!loading && !error && filteredBookings.length > 0 && (
            <div className="bookings-grid">
              {filteredBookings.map((booking) => (
                <div key={booking._id} className="booking-card glass">
                  <div className="booking-header">
                    <div className="booking-customer">
                      <div className="customer-icon">👤</div>
                      <div className="customer-info">
                        <h3 className="customer-name">{booking.name}</h3>
                        <p className="customer-phone">📞 {booking.phone}</p>
                      </div>
                    </div>
                    <span className={`status ${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="booking-details">
                    <div className="detail-item">
                      <span className="detail-icon">💇</span>
                      <div className="detail-info">
                        <span className="detail-label">Service</span>
                        <span className="detail-value">{booking.service}</span>
                      </div>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📅</span>
                      <div className="detail-info">
                        <span className="detail-label">Date</span>
                        <span className="detail-value">{booking.date}</span>
                      </div>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">⏰</span>
                      <div className="detail-info">
                        <span className="detail-label">Time</span>
                        <span className="detail-value">{booking.time}</span>
                      </div>
                    </div>
                    {booking.notes && (
                      <div className="detail-item full-width">
                        <span className="detail-icon">📝</span>
                        <div className="detail-info">
                          <span className="detail-label">Notes</span>
                          <span className="detail-value">{booking.notes}</span>
                        </div>
                      </div>
                    )}
                    <div className="detail-item full-width">
                      <span className="detail-icon">🕐</span>
                      <div className="detail-info">
                        <span className="detail-label">Completed On</span>
                        <span className="detail-value">
                          {formatDate(booking.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredBookings.length === 0 && (
            <div className="empty-state glass">
              <div className="empty-icon">📭</div>
              <h3>No History Found</h3>
              <p>
                {searchQuery || filterStatus !== "All"
                  ? "No bookings match your search or filter."
                  : "Completed and cancelled bookings will appear here."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminHistory;
