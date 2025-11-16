import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import "../styles/Footer.css";

function Footer() {
  const observerRef = useRef(null);

  // Scroll Animation Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    const footerElement = document.querySelector(".footer-main");
    if (footerElement) {
      observerRef.current.observe(footerElement);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <footer className="footer">
      <div className="footer-main glass">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Section */}
            <div className="footer-section footer-brand">
              <h3 className="footer-logo">Diva's Parlour</h3>
              <p className="footer-tagline">Where beauty meets elegance.</p>
              <p className="footer-description">
                Your trusted destination for premium beauty services,
                personalized care, and luxury treatments.
              </p>
            </div>

            {/* Quick Links */}
            <div className="footer-section footer-links">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-list">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/services">Services</Link>
                </li>
                <li>
                  <Link to="/gallery">Gallery</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
                <li>
                  <Link to="/booking" className="footer-book-link">
                    Book Appointment
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="footer-section footer-contact">
              <h4 className="footer-heading">Get In Touch</h4>
              <ul className="footer-contact-list">
                <li>
                  <span className="footer-icon">📍</span>
                  <span>123 Beauty Street, Downtown Area, City</span>
                </li>
                <li>
                  <span className="footer-icon">📞</span>
                  <a href="tel:+1234567890">+1 234 567 890</a>
                </li>
                <li>
                  <span className="footer-icon">💬</span>
                  <a href="https://wa.me/1234567890">WhatsApp Us</a>
                </li>
                <li>
                  <span className="footer-icon">⏰</span>
                  <span>
                    Mon-Sat: 9AM-7PM
                    <br />
                    Sun: 10AM-5PM
                  </span>
                </li>
              </ul>
            </div>

            {/* Social Section */}
            <div className="footer-section footer-social">
              <h4 className="footer-heading">Follow Us</h4>
              <p className="footer-social-text">
                Stay connected for beauty tips, offers, and updates!
              </p>
              <div className="footer-social-icons">
                <a
                  href="https://instagram.com"
                  className="social-icon glass"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>📷</span>
                  <span className="social-label">Instagram</span>
                </a>
                <a
                  href="https://facebook.com"
                  className="social-icon glass"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>👍</span>
                  <span className="social-label">Facebook</span>
                </a>
                <a
                  href="https://wa.me/1234567890"
                  className="social-icon glass"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>💬</span>
                  <span className="social-label">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <p className="footer-copyright">
            © 2025 Diva's Parlour. All rights reserved.
          </p>
          <p className="footer-credit">Designed with 💕 by Your Name</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
