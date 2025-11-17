import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "../styles/BookingPage.css";

function BookingPage() {
  const location = useLocation();
  const observerRef = useRef(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const whatsappNumber = "7397966346";

  // Form state
  const [formData, setFormData] = useState({
    services: [],
    date: "",
    time: "",
    name: "",
    phone: "",
    notes: "",
  });

  // Update services when navigating from other pages
  useEffect(() => {
    const selectedService = location.state?.serviceName;
    if (selectedService && !formData.services.includes(selectedService)) {
      setFormData((prev) => ({
        ...prev,
        services: [selectedService],
      }));
    }
  }, [location.state?.serviceName]);

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

  const services = [
    "Haircut",
    "Hair Spa",
    "Smoothening",
    "Keratin",
    "Facial",
    "Clean-Up",
    "Makeup",
    "Nail Art",
    "Waxing",
    "Bridal Makeup",
  ];

  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "3:00 PM",
    "4:00 PM",
    "6:00 PM",
  ];

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceSelect = (e) => {
    const service = e.target.value;
    if (service && !formData.services.includes(service)) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, service],
      }));
    }
    e.target.value = "";
  };

  const handleRemoveService = (serviceToRemove) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s !== serviceToRemove),
    }));
  };

  const handleTimeSelect = (time) => {
    setFormData((prev) => ({
      ...prev,
      time: time,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.services.length === 0 ||
      !formData.date ||
      !formData.time ||
      !formData.name ||
      !formData.phone
    ) {
      alert(
        "Please fill in all required fields and select at least one service"
      );
      return;
    }

    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setFormData({
      services: [],
      date: "",
      time: "",
      name: "",
      phone: "",
      notes: "",
    });
  };

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

  const handleWhatsAppBooking = () => {
    if (
      formData.services.length === 0 ||
      !formData.date ||
      !formData.time ||
      !formData.name ||
      !formData.phone
    ) {
      alert(
        "Please fill in all required fields and select at least one service"
      );
      return;
    }

    const servicesText = formData.services.join(", ");
    sendToWhatsApp({
      service: servicesText,
      date: formData.date,
      time: formData.time,
      name: formData.name,
      phone: formData.phone,
      notes: formData.notes,
    });
  };

  return (
    <div className="booking-page" style={{ isolation: "isolate" }}>
      {/* Page Header */}
      <section className="booking-hero">
        <div className="container">
          <div className="booking-hero-content">
            <h1 className="booking-hero-title">Book Your Appointment</h1>
            <p className="booking-hero-subtitle">
              Choose your service and schedule your beauty session
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="booking-form-section scroll-animate fade-up">
        <div className="container">
          <div className="booking-form-wrapper glass">
            <form onSubmit={handleSubmit} className="booking-form">
              {/* Service Selection */}
              <div className="form-group">
                <label htmlFor="service">Select Services *</label>
                <select
                  id="service"
                  onChange={handleServiceSelect}
                  className="form-input glass"
                >
                  <option value="">Add a service...</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>
                      {service}
                    </option>
                  ))}
                </select>

                {/* Selected Services Display */}
                {formData.services.length > 0 && (
                  <div className="selected-services">
                    {formData.services.map((service, index) => (
                      <div key={index} className="service-tag glass">
                        <span>{service}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveService(service)}
                          className="remove-service-btn"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Date Selection */}
              <div className="form-group">
                <label htmlFor="date">Select Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={getTodayDate()}
                  required
                  className="form-input glass"
                />
              </div>

              {/* Time Slot Selection */}
              <div className="form-group">
                <label>Select Time Slot *</label>
                <div className="time-slots-grid">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`time-slot-btn glass ${
                        formData.time === slot ? "active" : ""
                      }`}
                      onClick={() => handleTimeSelect(slot)}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Details */}
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
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
                  onChange={handleInputChange}
                  required
                  placeholder="+1 234 567 890"
                  className="form-input glass"
                />
              </div>

              <div className="form-group">
                <label htmlFor="notes">Additional Notes (Optional)</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Any special requests or requirements..."
                  className="form-input glass"
                ></textarea>
              </div>

              {/* Submit Buttons */}
              <div className="form-buttons">
                <button type="submit" className="btn-submit">
                  Confirm Booking
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="btn-whatsapp-booking"
                >
                  Book Through WhatsApp
                </button>
              </div>
            </form>

            {/* Summary Box */}
            {(formData.services.length > 0 ||
              formData.date ||
              formData.time ||
              formData.name ||
              formData.phone) && (
              <div className="booking-summary glass">
                <h3 className="summary-title">Booking Summary</h3>
                <div className="summary-content">
                  {formData.services.length > 0 && (
                    <div className="summary-item">
                      <span className="summary-label">Services:</span>
                      <span className="summary-value">
                        {formData.services.join(", ")}
                      </span>
                    </div>
                  )}
                  {formData.date && (
                    <div className="summary-item">
                      <span className="summary-label">Date:</span>
                      <span className="summary-value">{formData.date}</span>
                    </div>
                  )}
                  {formData.time && (
                    <div className="summary-item">
                      <span className="summary-label">Time:</span>
                      <span className="summary-value">{formData.time}</span>
                    </div>
                  )}
                  {formData.name && (
                    <div className="summary-item">
                      <span className="summary-label">Name:</span>
                      <span className="summary-value">{formData.name}</span>
                    </div>
                  )}
                  {formData.phone && (
                    <div className="summary-item">
                      <span className="summary-label">Phone:</span>
                      <span className="summary-value">{formData.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Success Message */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-message glass">
            <div className="success-icon">✓</div>
            <h3>Booking Request Sent!</h3>
            <p>
              Your appointment request has been sent! We will contact you soon
              ❤️
            </p>
            <button onClick={handleCloseSuccess} className="btn-success-close">
              Back to Form
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingPage;
