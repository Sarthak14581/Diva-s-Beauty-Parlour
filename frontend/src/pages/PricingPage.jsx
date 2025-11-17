import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/PricingPage.css";

function PricingPage() {
  const observerRef = useRef(null);
  const [openCategory, setOpenCategory] = useState(null);

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

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  const pricingCategories = [
    {
      icon: "💇",
      title: "Hair Care",
      starting: "Starting from ₹499",
      services: [
        { name: "Haircut & Styling", price: "₹499" },
        { name: "Hair Spa", price: "₹899" },
        { name: "Hair Coloring", price: "₹1,999" },
        { name: "Keratin Treatment", price: "₹3,500" },
        { name: "Hair Smoothening", price: "₹3,000" },
        { name: "Highlights", price: "₹2,500" },
      ],
    },
    {
      icon: "✨",
      title: "Skin Care",
      starting: "Starting from ₹799",
      services: [
        { name: "Deep Cleansing Facial", price: "₹799" },
        { name: "Brightening Facial", price: "₹1,200" },
        { name: "Anti-Aging Treatment", price: "₹1,500" },
        { name: "Acne Treatment", price: "₹1,100" },
        { name: "Gold Facial", price: "₹2,000" },
        { name: "Cleanup", price: "₹600" },
      ],
    },
    {
      icon: "💄",
      title: "Makeup",
      starting: "Starting from ₹1,499",
      services: [
        { name: "Party Makeup", price: "₹1,499" },
        { name: "Engagement Makeup", price: "₹2,500" },
        { name: "Bridal Makeup", price: "₹5,000" },
        { name: "Airbrush Makeup", price: "₹3,500" },
        { name: "HD Makeup", price: "₹2,800" },
        { name: "Pre-Bridal Makeup", price: "₹2,000" },
      ],
    },
    {
      icon: "💅",
      title: "Nail Care",
      starting: "Starting from ₹399",
      services: [
        { name: "Classic Manicure", price: "₹399" },
        { name: "Spa Manicure", price: "₹699" },
        { name: "Classic Pedicure", price: "₹499" },
        { name: "Spa Pedicure", price: "₹799" },
        { name: "Gel Polish", price: "₹599" },
        { name: "Nail Extensions", price: "₹1,200" },
        { name: "Nail Art", price: "₹299" },
      ],
    },
    {
      icon: "🌸",
      title: "Waxing & Threading",
      starting: "Starting from ₹299",
      services: [
        { name: "Full Body Waxing", price: "₹1,500" },
        { name: "Half Body Waxing", price: "₹899" },
        { name: "Full Arms", price: "₹399" },
        { name: "Full Legs", price: "₹499" },
        { name: "Bikini Waxing", price: "₹699" },
        { name: "Facial Threading", price: "₹299" },
        { name: "Eyebrow Shaping", price: "₹99" },
      ],
    },
    {
      icon: "👰",
      title: "Bridal Services",
      starting: "Starting from ₹15,000",
      services: [
        { name: "Bridal Makeup Package", price: "₹15,000" },
        { name: "Pre-Bridal Package", price: "₹8,000" },
        { name: "Bridal Trial", price: "₹2,500" },
        { name: "Saree Draping", price: "₹1,000" },
        { name: "Hair Styling", price: "₹1,500" },
        { name: "Complete Bridal Look", price: "₹20,000" },
      ],
    },
  ];

  const packages = [
    {
      icon: "👰",
      title: "Bridal Glamour Package",
      description: "Complete bridal makeover for your special day",
      includes: [
        "Bridal Makeup",
        "Hair Styling",
        "Saree Draping",
        "Pre-Bridal Facial",
      ],
      price: "₹18,000",
      popular: true,
    },
    {
      icon: "🎉",
      title: "Party Ready Package",
      description: "Get party-ready with style",
      includes: ["Party Makeup", "Hair Styling", "Manicure", "Pedicure"],
      price: "₹3,500",
    },
    {
      icon: "✨",
      title: "Glow & Shine Package",
      description: "Complete skin rejuvenation treatment",
      includes: ["Gold Facial", "Cleanup", "Face Massage", "Hair Spa"],
      price: "₹4,000",
    },
    {
      icon: "💆",
      title: "Pamper Me Package",
      description: "Ultimate relaxation and beauty combo",
      includes: ["Spa Facial", "Full Body Waxing", "Manicure", "Pedicure"],
      price: "₹5,500",
    },
  ];

  return (
    <div className="pricing-page" style={{ isolation: "isolate" }}>
      {/* Page Header */}
      <section className="pricing-hero">
        <div className="container">
          <div className="pricing-hero-content">
            <h1 className="pricing-hero-title">Our Pricing</h1>
            <p className="pricing-hero-subtitle">
              Transparent, fair, and premium-quality beauty services
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Categories */}
      <section className="pricing-categories-section scroll-animate fade-up">
        <div className="container">
          <div className="pricing-categories-grid">
            {pricingCategories.map((category, index) => (
              <div
                key={index}
                className="pricing-category-card glass"
                style={{
                  opacity: 1,
                  visibility: "visible",
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="category-header">
                  <div className="category-icon">{category.icon}</div>
                  <h3 className="category-title">{category.title}</h3>
                  <p className="category-starting">{category.starting}</p>
                </div>
                <button
                  className="category-toggle"
                  onClick={() => toggleCategory(index)}
                >
                  {openCategory === index ? "Hide Details" : "View Details"}
                  <span className="toggle-icon">
                    {openCategory === index ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`category-services ${
                    openCategory === index ? "open" : ""
                  }`}
                >
                  <ul className="services-list">
                    {category.services.map((service, idx) => (
                      <li key={idx} className="service-item">
                        <span className="service-name">{service.name}</span>
                        <span className="service-dots"></span>
                        <span className="service-price">{service.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link to="/booking" className="btn-category">
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="packages-section scroll-animate fade-up">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Special Packages</h2>
            <p className="section-subtitle">
              Curated combinations for the best value
            </p>
          </div>
          <div className="packages-grid">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`package-card glass ${pkg.popular ? "popular" : ""}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {pkg.popular && (
                  <div className="popular-badge">Most Popular</div>
                )}
                <div className="package-icon">{pkg.icon}</div>
                <h3 className="package-title">{pkg.title}</h3>
                <p className="package-description">{pkg.description}</p>
                <ul className="package-includes">
                  {pkg.includes.map((item, idx) => (
                    <li key={idx}>
                      <span className="check-icon">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="package-price">{pkg.price}</div>
                <Link to="/booking" className="btn-package">
                  Book Package
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="disclaimer-section scroll-animate fade-left">
        <div className="container">
          <div className="disclaimer-content glass">
            <h3 className="disclaimer-title">Please Note</h3>
            <ul className="disclaimer-list">
              <li>
                Prices may vary based on hair length, skin type, and specific
                requirements
              </li>
              <li>
                Complimentary bridal trial available with full bridal package
                booking
              </li>
              <li>
                Customized packages available on request - contact us for
                details
              </li>
              <li>All services use premium, branded products</li>
              <li>Advance booking recommended to ensure availability</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pricing-cta-section scroll-animate fade-up">
        <div className="container">
          <div className="pricing-cta-content glass">
            <h2>Ready to Treat Yourself?</h2>
            <p>Book your beauty session today and experience luxury care!</p>
            <div className="pricing-cta-buttons">
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

export default PricingPage;
