import React, { useRef, useEffect, useState } from "react"; // 👈 Added useState
import { Link } from "react-router-dom";

function Home() {
  // --- 1. SLIDESHOW STATE & LOGIC ---
  const slides = ['/image1.jpg', '/image2.jpg', '/image3.jpg', '/image4.jpg', '/image6.jpg'];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Changes every 4 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  // --- 2. SCROLL ANIMATION LOGIC (YOUR EXISTING CODE) ---
  const featuresListRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    if (featuresListRef.current) {
      const featureTexts = featuresListRef.current.querySelectorAll(".feature-text");
      featureTexts.forEach((text, index) => {
        text.style.transitionDelay = index * 0.15 + "s";
        observer.observe(text);
      });
    }

    return () => {
      if (featuresListRef.current) {
        const featureTexts = featuresListRef.current.querySelectorAll(".feature-text");
        featureTexts.forEach((text) => observer.unobserve(text));
      }
    };
  }, []);

  return (
    <>
      {/* --- HERO SECTION (UPDATED SLIDESHOW) --- */}
      <section className="hero">
        
        {/* Changed to a container that holds all slides */}
        <div className="hero-background">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url('${slide}')` }}
            ></div>
          ))}
        </div>

        {/* Your existing text and gradient remain untouched */}
        <div className="hero-content">
          <h1>
            Innovative Chemical
            <br />
            Solutions for a Better
            <br />
            Tomorrow
          </h1>
          <p>
            High performance chemicals and solvents for a wide range of
            industrial applications.
          </p>
          <Link to="/products" className="btn-primary">
            EXPLORE PRODUCTS →
          </Link>
        </div>

        {/* 👈 NEW: Slide Indicator Dots */}
        <div className="hero-indicators">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>

        <a
          href="https://wa.me/919876543210"
          className="whatsapp-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-whatsapp" style={{ fontSize: "1.5rem" }}></i>{" "}
          Chat on WhatsApp
        </a>
      </section>

      {/* --- THE REST OF YOUR CODE REMAINS EXACTLY THE SAME BELOW --- */}
      
      {/* --- SEARCH SECTION --- */}
      <section className="search-section">
        <div className="container search-wrapper">
          <div className="search-features">
            <span>
              <i className="fas fa-flask"></i> Wide Product Range
            </span>
            <span>
              <i className="fas fa-check-circle"></i> Premium Quality
            </span>
            <span>
              <i className="fas fa-truck"></i> Timely Delivery
            </span>
            <span>
              <i className="fas fa-headset"></i> Technical Support
            </span>
          </div>
          <div className="search-box">
            <input type="text" placeholder="Search for products..." />
            <select>
              <option>All Categories</option>
            </select>
            <button>
              <i className="fas fa-search"></i> SEARCH
            </button>
          </div>
        </div>
      </section>

      {/* --- PRODUCT CATEGORIES (Preview) --- */}
      <section
        className="container"
        style={{ paddingTop: "40px", paddingBottom: "60px" }}
      >
        <div className="section-title">
          <p className="subtitle">OUR PRODUCT CATEGORIES</p>
          <h2>High Quality Chemical Solutions</h2>
        </div>
        <div className="product-grid">
          {[
            {
              icon: "fa-flask",
              title: "Solvents",
              desc: "High purity solvents for various industrial applications.",
            },
            {
              icon: "fa-vial",
              title: "Speciality Chemicals",
              desc: "Advanced and innovative chemical solutions.",
            },
            {
              icon: "fa-microscope",
              title: "Lab Chemicals",
              desc: "Chemicals designed for research & analysis.",
            },
            {
              icon: "fa-industry",
              title: "Process Chemicals",
              desc: "Efficient and safe process operations.",
            },
            {
              icon: "fa-oil-can",
              title: "Petrochemicals",
              desc: "High grade petrochemicals for diverse industries.",
            },
            {
              icon: "fa-leaf",
              title: "Green Chemicals",
              desc: "Environmentally responsible & sustainable solutions.",
            },
          ].map((item, index) => (
            <div className="product-card" key={index}>
              <div className="icon-wrapper">
                <i className={`fas ${item.icon}`}></i>
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <Link to="/products" className="view-link">
                VIEW PRODUCTS{" "}
                <i
                  className="fas fa-arrow-right"
                  style={{ fontSize: "0.8rem", marginLeft: "5px" }}
                ></i>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* --- ABOUT PREVIEW --- */}
      <section className="container about-section">
        <div className="about-image">
          <img src="/image7.jpg" alt="Industrial Plant" />
        </div>
        <div className="about-content">
          <h3 className="subtitle">ABOUT US</h3>
          <h2>Reliable Partner. Superior Solutions.</h2>
          <p>
            Name Chemicals is a leading manufacturer and supplier of high
            quality chemicals, solvents and specialty products.
          </p>
          <div className="stats">
            <div className="stat-item">
              <h4>25+</h4>
              <p>Years of Exp.</p>
            </div>
            <div className="stat-item">
              <h4>500+</h4>
              <p>Happy Customers</p>
            </div>
            <div className="stat-item">
              <h4>100+</h4>
              <p>Product Variants</p>
            </div>
            <div className="stat-item">
              <h4>10+</h4>
              <p>Countries Served</p>
            </div>
          </div>
          <Link to="/about" className="btn-outline">
            KNOW MORE ABOUT US →
          </Link>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section className="why-choose-us-section">
        <div className="container">
          <span className="sub-heading">WHY CHOOSE US</span>
          <h2 className="main-heading">Commitment to Quality. Focused on You.</h2>
          <div className="features-list" ref={featuresListRef}>
            <div className="feature-item">
              <div className="icon-wrapper">
                <i className="fa-solid fa-check"></i>
              </div>
              <div className="feature-text">
                <h3>Quality Assurance</h3>
                <p>
                  Strict quality control and testing to deliver the best
                  products.
                </p>
              </div>
            </div>
            <div className="feature-item">
              <div className="icon-wrapper">
                <i className="fa-solid fa-gears"></i>
              </div>
              <div className="feature-text">
                <h3>Advanced Technology</h3>
                <p>
                  Modern infrastructure and advanced manufacturing processes.
                </p>
              </div>
            </div>
            <div className="feature-item">
              <div className="icon-wrapper">
                <i className="fa-solid fa-user-tie"></i>
              </div>
              <div className="feature-text">
                <h3>Expert Team</h3>
                <p>Experienced professionals ensuring customer satisfaction.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="icon-wrapper">
                <i className="fa-solid fa-leaf"></i>
              </div>
              <div className="feature-text">
                <h3>Sustainability</h3>
                <p>Committed to safe practices and a sustainable future.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- EVENTS PREVIEW --- */}
      <section className="container events-section">
        <div className="events-header">
          <div>
            <p className="subtitle">UPCOMING EVENTS</p>
            <h2 className="section-heading">
              Meet Us at Industry Leading Events
            </h2>
          </div>
          <Link to="/events" className="view-all-link">
            VIEW ALL EVENTS <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
        <div className="events-grid">
          {[
            {
              src: "/idmwbSRRx4_logos.png",
              alt: "ICC",
              date: "26 - 28 November 2024",
              title: "ICC Annual Conference 2024",
              location: "India Expo Centre, Greater Noida",
            },
            {
              src: "/chemspec-europe-logo-vector.png",
              alt: "Chemspec",
              date: "05 - 06 June 2024",
              title: "Chemspec Europe 2024",
              location: "Koelnmesse, Cologne, Germany",
            },
            {
              src: "/iduBzsPe-8_1785830344236.png",
              alt: "CPM",
              date: "04 - 06 December 2024",
              title: "CPM India 2024",
              location: "Bombay Exhibition Centre, Mumbai",
            },
          ].map((event, index) => (
            <div className="event-card" key={index}>
              <div className="event-logo-area">
                <img src={event.src} alt={event.alt} />
              </div>
              <div className="event-details">
                <div className="event-meta">
                  <i className="fas fa-calendar-alt"></i>
                  <span>{event.date}</span>
                </div>
                <h4>{event.title}</h4>
                <div className="event-location">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;