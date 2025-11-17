import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AboutPage.css";

function AboutPage() {
  const navigate = useNavigate();
  const observerRef = useRef(null);
  const whatsappNumber = "7397966346";

  const sendToWhatsApp = ({
    service = "",
    date = "",
    time = "",
    name = "",
    phone = "",
    notes = "",
  } = {}) => {
    const message = `Hello! I would like to book an appointment.

Service: ${service || "Not specified"}
Date: ${date || "Not selected"}
Time: ${time || "Not selected"}

Name: ${name || "Not provided"}
Phone: ${phone || "Not provided"}

Notes: ${notes || "N/A"}

Thank you! ❤️`.trim();

    const url = `https://api.whatsapp.com/send?phone=91${whatsappNumber}&text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

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

    // Observe all animated sections
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

  const credentials = [
    {
      icon: "🎀",
      title: "7+ Years of Experience",
      description: "Trusted by hundreds of satisfied clients",
    },
    {
      icon: "💄",
      title: "Certified Makeup Artist",
      description: "Professionally trained and certified",
    },
    {
      icon: "✨",
      title: "Bridal Specialist",
      description: "Expert in bridal & party makeup",
    },
    {
      icon: "💆",
      title: "Hair & Skin Expert",
      description: "Specialized treatments for all types",
    },
    {
      icon: "🧴",
      title: "Premium Products",
      description: "Only top-quality branded products",
    },
  ];

  const whyChooseMe = [
    "Personalized one-on-one service tailored to your unique beauty needs",
    "Hygienic, safe, and comfortable environment",
    "Friendly atmosphere that makes you feel at home",
    "High-quality branded products for lasting results",
    "Affordable luxury services for everyone",
    "Flexible appointment scheduling for your convenience",
  ];

  const testimonials = [
    {
      text: "She has magic hands! My bridal look was absolutely stunning. Everyone at my wedding couldn't stop complimenting my makeup.",
      author: "Priya Sharma",
      role: "Bride 2024",
    },
    {
      text: "The most caring and skilled beautician I've ever met. She truly understands what suits each person and brings out the best in you.",
      author: "Ananya Verma",
      role: "Regular Client",
    },
    {
      text: "I've been coming here for 3 years and wouldn't go anywhere else. The quality, care, and results are always exceptional!",
      author: "Neha Kapoor",
      role: "Loyal Customer",
    },
  ];

  return (
    <div className="about-page" style={{ isolation: "isolate" }}>
      {/* Owner Intro Section */}
      <section className="owner-intro-section">
        <div className="container">
          <div className="owner-intro-grid">
            <div className="owner-photo-container">
              <div className="owner-photo glass">
                <img
                  src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80"
                  alt="Owner Portrait"
                  className="owner-image"
                />
              </div>
            </div>
            <div className="owner-text-container">
              <h2 className="owner-greeting">Hi, I'm Diva</h2>
              <p className="owner-subtitle">Your Personal Beauty Artist</p>
              <p className="owner-intro">
                Welcome to my beauty sanctuary! With over 7 years of experience
                in the beauty industry, I've had the privilege of helping
                countless women discover their most confident selves. Every
                service I provide is infused with care, precision, and a genuine
                desire to make you feel beautiful inside and out.
              </p>
              <p className="owner-intro">
                Whether you're preparing for your wedding day, a special event,
                or simply want to treat yourself, I'm here to create a
                personalized experience that celebrates your unique beauty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Story */}
      <section className="story-section scroll-animate fade-left">
        <div className="container">
          <div className="story-content glass">
            <h2 className="story-title">My Journey</h2>
            <p className="story-text">
              My passion for beauty began when I was just a teenager, fascinated
              by the transformative power of makeup and skincare. What started
              as a hobby soon became my life's calling. After completing
              professional training and working with renowned beauty experts, I
              decided to create a space where women could feel pampered,
              understood, and truly beautiful.
            </p>
            <p className="story-text">
              At Diva's Parlour, every client is special. I believe beauty is
              not just about appearances— it's about confidence, self-love, and
              the joy of feeling your best. My mission is to provide not just
              services, but an experience that leaves you glowing from within.
            </p>
            <p className="story-text">
              I'm constantly learning, staying updated with the latest trends
              and techniques, because you deserve nothing but the best. Your
              trust and satisfaction are my greatest rewards.
            </p>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="credentials-section scroll-animate fade-up">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Experience & Credentials</h2>
            <p className="section-subtitle">
              Trained, certified, and dedicated to excellence
            </p>
          </div>
          <div className="credentials-grid">
            {credentials.map((cred, index) => (
              <div
                key={index}
                className="credential-card glass"
                style={{ opacity: 1, visibility: "visible" }}
              >
                <div className="credential-icon">{cred.icon}</div>
                <h3 className="credential-title">{cred.title}</h3>
                <p className="credential-description">{cred.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Me */}
      <section className="why-choose-section scroll-animate fade-right">
        <div className="container">
          <div className="why-choose-content glass">
            <h2 className="why-choose-title">Why Choose Me?</h2>
            <ul className="why-choose-list">
              {whyChooseMe.map((reason, index) => (
                <li key={index} className="why-choose-item">
                  <span className="check-icon">✓</span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Beauty Philosophy */}
      <section className="philosophy-section scroll-animate fade-up">
        <div className="container">
          <div className="philosophy-content">
            <p className="philosophy-quote">
              "Beauty is not just what you apply — it's how you feel."
            </p>
            <p className="philosophy-text">
              I believe that true beauty radiates from confidence and self-love.
              My approach is holistic— I don't just enhance your outer
              appearance, I create an experience that makes you feel cherished,
              valued, and truly beautiful. Every treatment is personalized
              because you are unique, and your beauty deserves to be celebrated
              in a way that's authentically you.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Mini */}
      <section className="about-testimonials-section scroll-animate fade-up">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What My Clients Say</h2>
            <p className="section-subtitle">Real stories from real people</p>
          </div>
          <div className="about-testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="about-testimonial-card glass"
                style={{ opacity: 1, visibility: "visible" }}
              >
                <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                <p className="testimonial-quote">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <strong>{testimonial.author}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="about-cta-section scroll-animate fade-up">
        <div className="container">
          <div className="about-cta-content glass">
            <h2>Ready to Experience Personalized Beauty Care?</h2>
            <p>
              Let's create your perfect look together. Book your appointment
              today!
            </p>
            <div className="about-cta-buttons">
              <button
                onClick={() => navigate("/booking")}
                className="btn-primary"
              >
                Book Appointment
              </button>
              <button onClick={() => sendToWhatsApp()} className="btn-whatsapp">
                WhatsApp Me
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
