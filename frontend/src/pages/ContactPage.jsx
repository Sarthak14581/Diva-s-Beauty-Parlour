import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/ContactPage.css";

function ContactPage() {
  const observerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
  });

  // Scroll Animation Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".scroll-animate");
    animatedElements.forEach((el) => {
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend only - just show alert for now
    alert(
      `Thank you, ${formData.name}! We'll contact you soon at ${formData.phone}.`
    );
    // Reset form
    setFormData({
      name: "",
      phone: "",
      service: "",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: "📍",
      title: "Visit Us",
      details: [
        "123 Beauty Street",
        "Downtown Area, City",
        "Postal Code 12345",
      ],
    },
    {
      icon: "📞",
      title: "Call Us",
      details: ["+1 234 567 890", "Mon-Sat: 9AM-7PM", "Sun: 10AM-5PM"],
    },
    {
      icon: "💬",
      title: "WhatsApp",
      details: ["Quick response", "+1 234 567 890"],
      link: "https://wa.me/1234567890",
    },
    {
      icon: "📧",
      title: "Email",
      details: ["info@divasparlour.com", "Response within 24 hours"],
    },
  ];

  return (
    <div className="contact-page">
      {/* Page Header */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <h1 className="contact-hero-title">Get in Touch</h1>
            <p className="contact-hero-subtitle">
              We're here to bring out your beauty
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info-section scroll-animate fade-up">
        <div className="container">
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-info-card glass">
                <div className="contact-info-icon">{info.icon}</div>
                <h3 className="contact-info-title">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="contact-info-detail">
                    {info.link && idx === 1 ? (
                      <a
                        href={info.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {detail}
                      </a>
                    ) : (
                      detail
                    )}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section scroll-animate fade-up">
        <div className="container">
          <div className="contact-form-wrapper glass">
            <h2 className="contact-form-title">Send Us a Message</h2>
            <p className="contact-form-subtitle">
              Fill out the form and we'll get back to you shortly
            </p>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="form-input glass"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+1 234 567 890"
                  className="form-input glass"
                />
              </div>
              <div className="form-group">
                <label htmlFor="service">Service Interested In</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="form-input glass"
                >
                  <option value="">Select a service</option>
                  <option value="hair">Hair Care</option>
                  <option value="skin">Skin Care</option>
                  <option value="makeup">Makeup</option>
                  <option value="nails">Nail Care</option>
                  <option value="waxing">Waxing & Threading</option>
                  <option value="bridal">Bridal Package</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Tell us about your requirements..."
                  className="form-input glass"
                ></textarea>
              </div>
              <button type="submit" className="btn-submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="contact-map-section scroll-animate fade-up">
        <div className="container">
          <h2 className="map-section-title">Find Us Here</h2>
          <div className="map-container glass">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0867891873756!2d-122.41941548468195!3d37.77492997975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter%20HQ!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Diva's Parlour Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="contact-cta-section scroll-animate fade-up">
        <div className="container">
          <div className="contact-cta-content glass">
            <h2>Ready to Book Your Beauty Session?</h2>
            <p>
              Experience personalized beauty care that makes you feel amazing!
            </p>
            <div className="contact-cta-buttons">
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
    </div>
  );
}

export default ContactPage;
