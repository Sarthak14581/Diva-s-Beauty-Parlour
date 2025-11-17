import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/AdminNavbar.css";

function AdminNavbar({
  onSearch,
  onFilterChange,
  onSortChange,
  activeFilter = "All",
  activeSort = "Latest",
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <nav className="admin-navbar glass">
      <div className="container">
        <div className="admin-navbar-content">
          {/* Logo/Brand */}
          <div className="admin-navbar-brand">
            <h2>Admin Panel</h2>
          </div>

          {/* Navigation Links */}
          <div className="admin-navbar-links">
            <Link
              to="/admin/dashboard"
              className={`nav-link ${
                location.pathname === "/admin/dashboard" ? "active" : ""
              }`}
            >
              📋 Dashboard
            </Link>
            <Link
              to="/admin/history"
              className={`nav-link ${
                location.pathname === "/admin/history" ? "active" : ""
              }`}
            >
              ✨ History
            </Link>
          </div>

          {/* Search, Filter, Sort Controls */}
          <div className="admin-navbar-controls">
            {/* Search */}
            {onSearch && (
              <input
                type="text"
                placeholder="Search by name, phone, service..."
                onChange={(e) => onSearch(e.target.value)}
                className="search-input glass"
              />
            )}

            {/* Filter */}
            {onFilterChange && (
              <select
                value={activeFilter}
                onChange={(e) => onFilterChange(e.target.value)}
                className="filter-select glass"
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            )}

            {/* Sort */}
            {onSortChange && (
              <select
                value={activeSort}
                onChange={(e) => onSortChange(e.target.value)}
                className="sort-select glass"
              >
                <option value="Latest">Latest</option>
                <option value="Oldest">Oldest</option>
                <option value="Service">Service (A-Z)</option>
              </select>
            )}

            {/* Logout */}
            <button onClick={handleLogout} className="btn-logout-nav">
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
