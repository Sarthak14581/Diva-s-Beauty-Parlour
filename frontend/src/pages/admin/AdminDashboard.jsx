import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import "../../styles/AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Fetch bookings from backend
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin/login");
        return;
      }

      const res = await fetch("http://localhost:5000/api/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        // Token expired or invalid
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

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

  // Only show active bookings on dashboard
  const activeBookings = bookings.filter(
    (b) => b.status === "Pending" || b.status === "Confirmed"
  );

  const displayBookings = activeBookings;

  // Apply search, filter, and sort
  useEffect(() => {
    let result = [...displayBookings];

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
  }, [searchQuery, filterStatus, sortBy, displayBookings]);

  // Get today's bookings (only active bookings scheduled for today)
  const getTodayBookings = () => {
    const today = new Date().toISOString().split("T")[0];
    return activeBookings.filter((b) => b.date === today).length;
  };

  // Get bookings created today
  const getTodayTotalBookings = () => {
    const today = new Date().toISOString().split("T")[0];
    return bookings.filter((b) => {
      const bookingDate = new Date(b.createdAt).toISOString().split("T")[0];
      return bookingDate === today;
    }).length;
  };

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
      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        `http://localhost:5000/api/bookings/${bookingId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (res.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

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

  // Move to history function
  const handleMoveToHistory = async (bookingId, newStatus) => {
    if (!window.confirm(`Mark this booking as ${newStatus}?`)) return;
    await handleStatusChange(bookingId, newStatus);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
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
      <AdminNavbar
        onSearch={setSearchQuery}
        onFilterChange={setFilterStatus}
        onSortChange={setSortBy}
        activeFilter={filterStatus}
        activeSort={sortBy}
      />

      <div className="admin-content" style={{ marginTop: "150px" }}>
        <div className="container">
          {/* Stats Card */}
          <div className="stats-card glass">
            <div className="stat-item">
              <div className="stat-icon">📅</div>
              <div className="stat-info">
                <span className="stat-label">Today's Total</span>
                <span className="stat-value">{getTodayTotalBookings()}</span>
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
          {!loading && !error && filteredBookings.length > 0 && (
            <div className="bookings-grid">
              {filteredBookings.map((booking) => (
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

                  {/* Actions - Always show active controls */}
                  <div className="booking-actions">
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        handleStatusChange(booking._id, e.target.value)
                      }
                      className="status-dropdown glass"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <div className="action-buttons-row">
                      <button
                        onClick={() =>
                          handleMoveToHistory(booking._id, "Completed")
                        }
                        className="btn-move-history"
                        title="Mark as Completed"
                      >
                        ✅ Complete
                      </button>
                      <button
                        onClick={() =>
                          handleMoveToHistory(booking._id, "Cancelled")
                        }
                        className="btn-move-cancel"
                        title="Mark as Cancelled"
                      >
                        ❌ Cancel
                      </button>
                    </div>
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
          {!loading && !error && filteredBookings.length === 0 && (
            <div className="empty-state glass">
              <div className="empty-icon">📭</div>
              <h3>No Active Bookings</h3>
              <p>Active bookings will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
