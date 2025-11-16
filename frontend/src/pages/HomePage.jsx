import { Link } from "react-router-dom";
import "../styles/HomePage.css";

function HomePage() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Your Beauty, Our Passion</h1>
          <p className="hero-subtitle">
            Experience premium beauty services in a relaxing, luxurious
            environment
          </p>
          <Link to="/booking" className="btn-primary">
            Book Your Appointment
          </Link>
        </div>
        <div className="hero-overlay"></div>
      </section>

      {/* Quick Highlights */}
      <section className="highlights-section">
        <div className="container">
          <div className="highlights-grid">
            <div className="highlight-card glass">
              <div className="highlight-icon">⏰</div>
              <h3>Opening Hours</h3>
              <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
              <p>Sunday: 10:00 AM - 5:00 PM</p>
            </div>
            <div className="highlight-card glass">
              <div className="highlight-icon">📍</div>
              <h3>Location</h3>
              <p>123 Beauty Street</p>
              <p>Downtown Area, City</p>
            </div>
            <div className="highlight-card glass">
              <div className="highlight-icon">💬</div>
              <h3>WhatsApp Us</h3>
              <p>Quick booking & queries</p>
              <a href="https://wa.me/1234567890" className="whatsapp-link">
                +1 234 567 890
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="featured-services">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">
              Discover our range of premium beauty treatments
            </p>
          </div>
          <div className="services-grid">
            <div className="service-card glass">
              <div className="service-icon">💇</div>
              <h3>Hair Care</h3>
              <p>Cuts, styling, coloring, and treatments for gorgeous hair</p>
              <span className="service-price">From $30</span>
              <Link to="/booking" className="btn-secondary">
                Book Now
              </Link>
            </div>
            <div className="service-card glass">
              <div className="service-icon">✨</div>
              <h3>Skin Care</h3>
              <p>
                Facials, peels, and rejuvenating treatments for radiant skin
              </p>
              <span className="service-price">From $45</span>
              <Link to="/booking" className="btn-secondary">
                Book Now
              </Link>
            </div>
            <div className="service-card glass">
              <div className="service-icon">💄</div>
              <h3>Makeup</h3>
              <p>Bridal, party, and everyday makeup for any occasion</p>
              <span className="service-price">From $50</span>
              <Link to="/booking" className="btn-secondary">
                Book Now
              </Link>
            </div>
            <div className="service-card glass">
              <div className="service-icon">💅</div>
              <h3>Nail Care</h3>
              <p>Manicures, pedicures, nail art, and extensions</p>
              <span className="service-price">From $25</span>
              <Link to="/booking" className="btn-secondary">
                Book Now
              </Link>
            </div>
          </div>
          <div className="view-all-services">
            <Link to="/services" className="btn-outline">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">
              Real experiences from real people
            </p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card glass">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Absolutely amazing service! The attention to detail and care is
                exceptional. I always leave feeling beautiful and pampered."
              </p>
              <div className="testimonial-author">
                <strong>Sarah Johnson</strong>
                <span>Regular Client</span>
              </div>
            </div>
            <div className="testimonial-card glass">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Best beauty parlour in town! Professional, clean, and the
                results are always stunning. Highly recommend for bridal
                makeup!"
              </p>
              <div className="testimonial-author">
                <strong>Emily Davis</strong>
                <span>Bridal Client</span>
              </div>
            </div>
            <div className="testimonial-card glass">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Love the personalized service and friendly atmosphere. It's my
                go-to place for all beauty treatments. Worth every penny!"
              </p>
              <div className="testimonial-author">
                <strong>Jessica Martinez</strong>
                <span>VIP Member</span>
              </div>
            </div>
          </div>
          <div className="view-all-testimonials">
            <Link to="/testimonials" className="btn-outline">
              Read More Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="gallery-preview">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Work</h2>
            <p className="section-subtitle">A glimpse of our artistry</p>
          </div>
          <div className="gallery-grid">
            <div className="gallery-item">
              <img
                src="https://images.unsplash.com/photo-1560869713-7d0a29430803?w=600&q=80"
                alt="Hair styling and treatment"
                className="gallery-image"
              />
            </div>
            <div className="gallery-item">
              <img
                src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80"
                alt="Professional makeup application"
                className="gallery-image"
              />
            </div>
            <div className="gallery-item">
              <img
                src="https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=600&q=80"
                alt="Nail art and manicure"
                className="gallery-image"
              />
            </div>
            <div className="gallery-item">
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80"
                alt="Facial and skincare treatment"
                className="gallery-image"
              />
            </div>
            <div className="gallery-item">
              <img
                src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80"
                alt="Bridal makeup and styling"
                className="gallery-image"
              />
            </div>
            <div className="gallery-item">
              <img
                src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&q=80"
                alt="Hair coloring services"
                className="gallery-image"
              />
            </div>
          </div>
          <div className="view-gallery">
            <Link to="/gallery" className="btn-primary">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content glass">
            <h2>Ready to Transform Your Look?</h2>
            <p>Book your appointment today and experience luxury beauty care</p>
            <div className="cta-buttons">
              <Link to="/booking" className="btn-primary">
                Book Appointment
              </Link>
              <a href="https://wa.me/1234567890" className="btn-whatsapp">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Bottom Bar */}
      <div className="mobile-sticky-bar">
        <Link to="/booking" className="sticky-book-btn">
          Book Now
        </Link>
        <a href="https://wa.me/1234567890" className="sticky-whatsapp-btn">
          WhatsApp
        </a>
      </div>
    </div>
  );
}

export default HomePage;
