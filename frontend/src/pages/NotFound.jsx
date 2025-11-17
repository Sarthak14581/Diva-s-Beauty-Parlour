import { Link } from "react-router-dom";
import "../styles/NotFound.css";

function NotFound() {
  return (
    <div className="notfound-page" style={{ isolation: "isolate" }}>
      <div className="container">
        <div className="notfound-content glass">
          <div className="notfound-icon">💐</div>
          <h1 className="notfound-title">404</h1>
          <h2 className="notfound-subtitle">Oops! Page Not Found</h2>
          <p className="notfound-text">
            The page you're looking for seems to have wandered off to get a
            makeover. Let's get you back to beauty!
          </p>
          <div className="notfound-buttons">
            <Link to="/" className="btn-primary">
              Back to Home
            </Link>
            <Link to="/services" className="btn-secondary-outline">
              Browse Services
            </Link>
          </div>
          <div className="notfound-links">
            <p className="notfound-help-text">
              Looking for something specific?
            </p>
            <div className="quick-links-grid">
              <Link to="/booking" className="quick-link">
                Book Appointment
              </Link>
              <Link to="/gallery" className="quick-link">
                View Gallery
              </Link>
              <Link to="/about" className="quick-link">
                About Us
              </Link>
              <Link to="/contact" className="quick-link">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
