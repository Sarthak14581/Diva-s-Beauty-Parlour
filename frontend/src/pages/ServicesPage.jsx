import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ServicesPage.css";

function ServicesPage() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const mainServices = [
    {
      icon: "💇",
      title: "Hair Care",
      description:
        "Expert cuts, styling, coloring, and treatments for gorgeous, healthy hair",
      price: "From ₹499",
      features: [
        "Hair Cut & Styling",
        "Hair Coloring",
        "Hair Spa",
        "Keratin Treatment",
      ],
    },
    {
      icon: "✨",
      title: "Skin Care",
      description:
        "Rejuvenating facials, peels, and treatments for radiant, glowing skin",
      price: "From ₹799",
      features: [
        "Deep Cleansing Facial",
        "Anti-Aging Treatment",
        "Brightening Facial",
        "Acne Treatment",
      ],
    },
    {
      icon: "💄",
      title: "Makeup",
      description:
        "Professional makeup for bridal, party, and everyday glamour",
      price: "From ₹1,499",
      features: [
        "Bridal Makeup",
        "Party Makeup",
        "Engagement Makeup",
        "Airbrush Makeup",
      ],
    },
    {
      icon: "💅",
      title: "Nail Care",
      description:
        "Manicures, pedicures, nail art, and extensions for perfect nails",
      price: "From ₹399",
      features: [
        "Classic Manicure",
        "Spa Pedicure",
        "Gel Polish",
        "Nail Extensions",
      ],
    },
    {
      icon: "🌸",
      title: "Waxing & Threading",
      description: "Gentle hair removal services for smooth, flawless skin",
      price: "From ₹299",
      features: [
        "Full Body Waxing",
        "Brazilian Waxing",
        "Facial Threading",
        "Eyebrow Shaping",
      ],
    },
    {
      icon: "👰",
      title: "Bridal Packages",
      description: "Complete bridal makeovers for your special day",
      price: "From ₹15,000",
      features: [
        "Pre-Bridal Treatment",
        "Bridal Makeup",
        "Hair Styling",
        "Saree Draping",
      ],
    },
  ];

  const addOnServices = [
    {
      icon: "🧖",
      title: "Hair Spa",
      price: "₹899",
    },
    {
      icon: "🦶",
      title: "Foot Spa",
      price: "₹699",
    },
    {
      icon: "🎨",
      title: "Nail Art",
      price: "₹299",
    },
    {
      icon: "🌺",
      title: "Head Massage",
      price: "₹499",
    },
  ];

  const faqs = [
    {
      question: "Do I need to book in advance?",
      answer:
        "Yes, we recommend booking 2-3 days in advance to ensure availability. Walk-ins are welcome but subject to availability.",
    },
    {
      question: "What products do you use?",
      answer:
        "We use only premium, internationally certified products from brands like L'Oréal, Schwarzkopf, MAC, and Kryolan to ensure the best results.",
    },
    {
      question: "Do you offer bridal trial sessions?",
      answer:
        "Yes! We offer complimentary bridal makeup and hair trials when you book our bridal package. This helps you finalize your look before the big day.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "You can cancel or reschedule up to 24 hours before your appointment. Cancellations within 24 hours may incur a 50% charge.",
    },
  ];

  return (
    <div className="services-page">
      {/* Page Header */}
      <section className="services-hero">
        <div className="container">
          <div className="services-hero-content">
            <h1 className="services-hero-title">Our Services</h1>
            <p className="services-hero-subtitle">
              Discover our range of premium beauty treatments designed to
              enhance your natural beauty
            </p>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="main-services-section">
        <div className="container">
          <div className="services-main-grid">
            {mainServices.map((service, index) => (
              <div key={index} className="service-main-card glass">
                <div className="service-main-icon">{service.icon}</div>
                <h3 className="service-main-title">{service.title}</h3>
                <p className="service-main-description">
                  {service.description}
                </p>
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <div className="service-main-footer">
                  <span className="service-main-price">{service.price}</span>
                  <Link to="/booking" className="btn-service">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-On Services */}
      <section className="addon-services-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Add-On Treatments</h2>
            <p className="section-subtitle">
              Enhance your experience with these relaxing extras
            </p>
          </div>
          <div className="addon-services-grid">
            {addOnServices.map((addon, index) => (
              <div key={index} className="addon-card glass">
                <div className="addon-icon">{addon.icon}</div>
                <h4 className="addon-title">{addon.title}</h4>
                <span className="addon-price">{addon.price}</span>
                <Link to="/booking" className="btn-addon">
                  Add to Booking
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Everything you need to know about our services
            </p>
          </div>
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item glass ${
                  openFAQ === index ? "active" : ""
                }`}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">
                    {openFAQ === index ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`faq-answer ${openFAQ === index ? "open" : ""}`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta-section">
        <div className="container">
          <div className="services-cta-content glass">
            <h2>Ready to Book Your Service?</h2>
            <p>Transform your look with our expert beauty treatments</p>
            <div className="services-cta-buttons">
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

export default ServicesPage;
