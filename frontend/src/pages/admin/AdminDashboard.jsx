import { useState, useEffect } from "react";
import "../../styles/AdminDashboard.css";

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("active"); // "active" or "history"

  // Fetch bookings from backend
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/bookings");
      const data = await res.json();
      if (data.success) {
        setBookings(data.data);
      } else {
        setError("Failed to load bookings");
      }
      setLoading(false);
    } catch (err) {
      console.error("Error loading bookings:", err);
      setError("Server error. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Filter bookings based on view mode
  const activeBookings = bookings.filter(
    (b) => b.status === "Pending" || b.status === "Confirmed"
  );
  const historyBookings = bookings.filter(
    (b) => b.status === "Completed" || b.status === "Cancelled"
  );

  // Get the correct bookings based on view mode
  const displayBookings =
    viewMode === "active" ? activeBookings : historyBookings;

  // Get today's bookings (only active bookings scheduled for today)
  const getTodayBookings = () => {
    const today = new Date().toISOString().split("T")[0];
    return activeBookings.filter((b) => b.date === today).length;
  };

  // Sort the displayed bookings by latest first
  const sortedBookings = [...displayBookings].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Format date to DD/MM/YYYY HH:mm
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  // Update booking status
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/bookings/${bookingId}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await res.json();

      if (data.success) {
        // Refresh bookings
        await fetchBookings();
        console.log("✅ Status updated successfully");
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("❌ Error updating status:", error);
      alert("Error updating status");
    }
  };

  // WhatsApp reply function
  const handleWhatsAppReply = (booking) => {
    const phoneNumber = booking.phone.replace(/\D/g, ""); // Remove non-digits
    const message = `Hello ${booking.name}, confirming your booking for ${booking.service} on ${booking.date} at ${booking.time}.`;
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="admin-dashboard standalone-page">
      {/* Header */}
      <div className="admin-header glass">
        <div className="container">
          <h1 className="admin-title">📋 Admin Dashboard</h1>
          <p className="admin-subtitle">Manage all your salon bookings</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-content">
        <div className="container">
          {/* View Mode Tabs */}
          <div className="view-tabs glass">
            <button
              className={`tab-btn ${viewMode === "active" ? "active" : ""}`}
              onClick={() => setViewMode("active")}
            >
              📅 Active Bookings ({activeBookings.length})
            </button>
            <button
              className={`tab-btn ${viewMode === "history" ? "active" : ""}`}
              onClick={() => setViewMode("history")}
            >
              ✨ History ({historyBookings.length})
            </button>
          </div>

          {/* Stats Card */}
          <div className="stats-card glass">
            <div className="stat-item">
              <div className="stat-icon">📅</div>
              <div className="stat-info">
                <span className="stat-label">Total Bookings</span>
                <span className="stat-value">{bookings.length}</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">⏳</div>
              <div className="stat-info">
                <span className="stat-label">Pending</span>
                <span className="stat-value">
                  {bookings.filter((b) => b.status === "Pending").length}
                </span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">✅</div>
              <div className="stat-info">
                <span className="stat-label">Today's Active</span>
                <span className="stat-value">{getTodayBookings()}</span>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading bookings...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="error-container glass">
              <p className="error-message">❌ {error}</p>
            </div>
          )}

          {/* Bookings Grid */}
          {!loading && !error && sortedBookings.length > 0 && (
            <div className="bookings-grid">
              {sortedBookings.map((booking) => (
                <div key={booking._id} className="booking-card glass">
                  {/* Card Header */}
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

                  {/* Card Body */}
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
                        <span className="detail-label">Booked On</span>
                        <span className="detail-value">
                          {formatDate(booking.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Dropdown & Actions */}
                  <div className="booking-actions">
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        handleStatusChange(booking._id, e.target.value)
                      }
                      className="status-dropdown glass"
                      disabled={viewMode === "history"}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={() => handleWhatsAppReply(booking)}
                      className="btn-whatsapp-reply"
                    >
                      💬 Reply on WhatsApp
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && sortedBookings.length === 0 && (
            <div className="empty-state glass">
              <div className="empty-icon">📭</div>
              <h3>
                {viewMode === "active"
                  ? "No Active Bookings"
                  : "No History Yet"}
              </h3>
              <p>
                {viewMode === "active"
                  ? "Active bookings will appear here."
                  : "Completed and cancelled bookings will appear here."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
