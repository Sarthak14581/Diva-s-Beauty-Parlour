import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/GalleryPage.css";

function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxImage, setLightboxImage] = useState(null);
  const observerRef = useRef(null);

  const galleryItems = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80",
      category: "Makeup",
      title: "Bridal Glow",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80",
      category: "Hair",
      title: "Hair Styling",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&q=80",
      category: "Nails",
      title: "Nail Art",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
      category: "Skin",
      title: "Facial Glow",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80",
      category: "Bridal",
      title: "Bridal Makeup",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80",
      category: "Hair",
      title: "Hair Coloring",
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=800&q=80",
      category: "Makeup",
      title: "Party Makeup",
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
      category: "Nails",
      title: "Gel Nails",
    },
    {
      id: 9,
      image:
        "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80",
      category: "Skin",
      title: "Skin Treatment",
    },
    {
      id: 10,
      image:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
      category: "Hair",
      title: "Hair Spa",
    },
    {
      id: 11,
      image:
        "https://images.unsplash.com/photo-1605980413788-d36fd6ced05e?w=800&q=80",
      category: "Makeup",
      title: "Engagement Look",
    },
    {
      id: 12,
      image:
        "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=800&q=80",
      category: "Bridal",
      title: "Bridal Styling",
    },
  ];

  const categories = ["All", "Makeup", "Hair", "Nails", "Skin", "Bridal"];

  const filteredItems =
    activeFilter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  // Scroll Animation Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      observerOptions
    );

    // Observe all gallery items
    const items = document.querySelectorAll(".gallery-grid-item");
    items.forEach((item) => {
      observerRef.current.observe(item);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [filteredItems]);

  const openLightbox = (image) => {
    setLightboxImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="gallery-page">
      {/* Page Header */}
      <section className="gallery-hero">
        <div className="container">
          <div className="gallery-hero-content">
            <h1 className="gallery-hero-title">Our Gallery</h1>
            <p className="gallery-hero-subtitle">
              A glimpse of our latest beauty transformations
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="gallery-filter-section">
        <div className="container">
          <div className="filter-buttons">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${
                  activeFilter === category ? "active" : ""
                }`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-grid-section">
        <div className="container">
          <div className="gallery-grid">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="gallery-grid-item glass"
                data-index={index}
                onClick={() => openLightbox(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="gallery-grid-image"
                />
                <div className="gallery-item-overlay">
                  <span className="gallery-item-title">{item.title}</span>
                  <span className="gallery-item-category">{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gallery-cta-section">
        <div className="container">
          <div className="gallery-cta-content glass">
            <h2>Love These Looks?</h2>
            <p>Book your appointment now and get your transformation!</p>
            <div className="gallery-cta-buttons">
              <Link to="/booking" className="btn-primary">
                Book Now
              </Link>
              <a href="https://wa.me/1234567890" className="btn-whatsapp">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content">
            <button className="lightbox-close" onClick={closeLightbox}>
              ×
            </button>
            <img
              src={lightboxImage.image}
              alt={lightboxImage.title}
              className="lightbox-image"
            />
            <div className="lightbox-info">
              <h3>{lightboxImage.title}</h3>
              <span>{lightboxImage.category}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GalleryPage;
