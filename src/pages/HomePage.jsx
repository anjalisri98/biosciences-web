import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// -------------------- Custom Hooks --------------------

const useScrollAnimation = (threshold = 0.15) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

const useCounter = (target, duration = 2000) => {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollAnimation(0.3);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return { ref, count };
};

// -------------------- Main Component --------------------

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const heroImages = [
    { url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1920&q=80', alt: 'Chemical lab' },
    { url: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=1920&q=80', alt: 'Industrial plant' },
    { url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80', alt: 'Oil refinery' },
    { url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80', alt: 'Green chemistry' }
  ];

  const categories = [
    { id: 'solvents', label: 'Solvents', icon: 'fa-flask', desc: 'High purity solvents for various industrial applications.', img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop' },
    { id: 'speciality', label: 'Speciality Chemicals', icon: 'fa-microscope', desc: 'Specialty chemicals for advanced and innovative solutions.', img: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=400&h=300&fit=crop' },
    { id: 'lab', label: 'Lab Chemicals', icon: 'fa-vial', desc: 'Laboratory chemicals designed for research and analysis.', img: 'https://images.unsplash.com/photo-1585435465945-bef5a93f8849?w=400&h=300&fit=crop' },
    { id: 'process', label: 'Process Chemicals', icon: 'fa-industry', desc: 'Process chemicals for efficient and safe operations.', img: 'https://images.unsplash.com/photo-1581092335871-5b2b2b4f7c7c?w=400&h=300&fit=crop' },
    { id: 'petrochemicals', label: 'Petrochemicals', icon: 'fa-oil-can', desc: 'High grade petrochemicals for diverse industries.', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop' },
    { id: 'green', label: 'Green Chemicals', icon: 'fa-leaf', desc: 'Environmentally responsible and sustainable solutions.', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop' },
  ];

  const stats = [
    { value: 25, label: 'Years of Experience', suffix: '+' },
    { value: 500, label: 'Happy Customers', suffix: '+' },
    { value: 100, label: 'Product Variants', suffix: '+' },
    { value: 10, label: 'Countries Served', suffix: '+' },
  ];

  const whyChoose = [
    { icon: 'fa-check-circle', title: 'Quality Assurance', desc: 'Strict quality control and testing to deliver the best products.' },
    { icon: 'fa-microchip', title: 'Advanced Technology', desc: 'Modern infrastructure and advanced manufacturing.' },
    { icon: 'fa-users', title: 'Expert Team', desc: 'Experienced professionals ensuring customer satisfaction.' },
    { icon: 'fa-recycle', title: 'Sustainability', desc: 'Committed to safe practices and a sustainable future.' },
  ];

  const events = [
    { title: 'CPHI India', date: '26 - 28 November 2024', event: 'CPHI India 2024', venue: 'India Expo Centre, Greater Noida', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop' },
    { title: 'Chemspec Europe', date: '05 - 06 June 2024', event: 'Chemspec Europe 2024', venue: 'Koelnmesse, Cologne, Germany', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop' },
    { title: 'IndiaChem', date: '04 - 06 December 2024', event: 'IndiaChem 2024', venue: 'Bombay Exhibition Centre, Mumbai', img: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop' },
  ];

  // ----- Stack images for About section -----
  const stackImages = [
    { id: 1, url: 'https://images.unsplash.com/photo-1581092335871-5b2b2b4f7c7c?w=600&h=400&fit=crop', alt: 'Chemical plant' },
    { id: 2, url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop', alt: 'Laboratory' },
    { id: 3, url: 'https://images.unsplash.com/photo-1585435465945-bef5a93f8849?w=600&h=400&fit=crop', alt: 'Research' },
  ];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, heroImages.length]);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchTerm} in ${searchCategory === 'all' ? 'all categories' : searchCategory}`);
  };

  const goToSlide = (index) => setCurrentSlide(index);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const StatItem = ({ value, label, suffix }) => {
    const { ref, count } = useCounter(value);
    return (
      <div ref={ref} className="stat-item animate-on-scroll">
        <span className="stat-value">{count}{suffix}</span>
        <span className="stat-label">{label}</span>
      </div>
    );
  };

  const ScrollCard = ({ children, className, delay = 0 }) => {
    const { ref, isVisible } = useScrollAnimation(0.1);
    return (
      <div ref={ref} className={`${className} ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
        {children}
      </div>
    );
  };

  return (
    <div className="homepage">
      {/* ===== HERO SECTION ===== */}
      <section 
        className="hero-section"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="hero-slideshow">
          {heroImages.map((img, index) => (
            <div 
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${img.url})` }}
            />
          ))}
        </div>
        <div className="hero-overlay"></div>

        <div className="container hero-content">
          <h1 className="hero-title animate-fade-up delay-1">
            Innovative Chemical Solutions<br />for a Better Tomorrow
          </h1>

          <div className="hero-actions animate-fade-up delay-3">
            <Link to="/products" className="btn-primary">
              Explore Products <i className="fas fa-arrow-right"></i>
            </Link>
          </div>

          <div className="search-container animate-fade-up delay-4">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-wrapper">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Search for products, chemicals or applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="search-select-wrapper">
                <select value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)}>
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
                <i className="fas fa-chevron-down"></i>
              </div>
              <button type="submit" className="btn-search">Search</button>
            </form>
          </div>

          <div className="slide-indicators">
            {heroImages.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCT CATEGORIES ===== */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Product Categories</span>
            <h2 className="section-title">High Quality Chemical Solutions</h2>
          </div>
          <div className="categories-grid">
            {categories.map((cat, idx) => (
              <ScrollCard key={cat.id} className="category-card" delay={idx * 100}>
                <div className="category-image" style={{ backgroundImage: `url(${cat.img})` }}>
                  <div className="category-overlay">
                    <div className="category-icon">
                      <i className={`fas ${cat.icon}`}></i>
                    </div>
                  </div>
                </div>
                <div className="category-content">
                  <h3>{cat.label}</h3>
                  <p>{cat.desc}</p>
                  <Link to={`/products?category=${cat.id}`} className="category-link">
                    View Products <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </ScrollCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT + ANIMATED IMAGE STACK + STATS ===== */}
      <section className="about-section">
        <div className="container">
          <div className="about-wrapper">
            <div className="about-row">
              <div className="about-text">
                <span className="section-tag">About Us</span>
                <h2>Reliable Partner. Superior Solutions.</h2>
                <p>
                  Crest Bioscientific is a leading manufacturer and supplier of high quality chemicals,
                  solvents and specialty products. With state-of-the-art facilities and stringent quality
                  control, we deliver solutions that meet global standards and drive customer success.
                </p>
                <Link to="/about" className="btn-outline-navy">Learn More</Link>
              </div>
              <div className="about-image-stack">
                {stackImages.map((img, index) => (
                  <div 
                    key={img.id} 
                    className={`stack-item item-${index + 1}`}
                    style={{ backgroundImage: `url(${img.url})` }}
                  />
                ))}
              </div>
            </div>
            <div className="stats-row">
              <div className="stats-grid">
                {stats.map((stat) => (
                  <StatItem key={stat.label} value={stat.value} label={stat.label} suffix={stat.suffix} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="why-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Why Choose Us</span>
            <h2 className="section-title">Commitment to Quality. Focused on You.</h2>
          </div>
          <div className="why-grid">
            {whyChoose.map((item, idx) => (
              <ScrollCard key={idx} className="why-card" delay={idx * 100}>
                <div className="why-icon">
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </ScrollCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===== UPCOMING EVENTS ===== */}
      <section className="events-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Upcoming Events</span>
            <h2 className="section-title">Meet Us at Industry Leading Events</h2>
          </div>
          <div className="events-grid">
            {events.map((evt, idx) => (
              <ScrollCard key={idx} className="event-card" delay={idx * 150}>
                <div className="event-image" style={{ backgroundImage: `url(${evt.img})` }}>
                  <div className="event-date-badge">
                    <i className="fas fa-calendar-alt"></i> {evt.date}
                  </div>
                </div>
                <div className="event-content">
                  <h4>{evt.title}</h4>
                  <p className="event-name">{evt.event}</p>
                  <p className="event-venue"><i className="fas fa-map-marker-alt"></i> {evt.venue}</p>
                </div>
              </ScrollCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-wrapper">
            <div className="newsletter-content">
              <h3>Stay Updated with Crest Bioscientific</h3>
              <p>Subscribe to our newsletter for the latest updates and offers.</p>
            </div>
            <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); }}>
              <input type="email" placeholder="Enter your email address" required />
              <button type="submit" className="btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h4>Address</h4>
                <p>123, Industrial Area, Plot No. 45, Sector 1<br />Vadodara, Gujarat - 390001, India</p>
              </div>
            </div>
            <div className="contact-info">
              <i className="fas fa-phone"></i>
              <div>
                <h4>Phone</h4>
                <p><a href="tel:+919876543210">+91 98765 43210</a></p>
              </div>
            </div>
            <div className="contact-info">
              <i className="fas fa-envelope"></i>
              <div>
                <h4>Email</h4>
                <p><a href="mailto:info@crestbio.com">info@crestbio.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BACK TO TOP ===== */}
      {showBackToTop && (
        <button className="back-to-top" onClick={scrollToTop}>
          <i className="fas fa-arrow-up"></i>
        </button>
      )}

      {/* ========== STYLES ========== */}
      <style jsx>{`
        .homepage {
          background: #ffffff;
        }

        /* ----- Hero (unchanged) ----- */
        .hero-section {
          position: relative;
          min-height: 85vh;
          display: flex;
          align-items: center;
          padding: 100px 0 60px;
          overflow: hidden;
        }
        .hero-slideshow {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hero-slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1);
          transform: scale(1.05);
          will-change: opacity;
        }
        .hero-slide.active {
          opacity: 1;
          transform: scale(1);
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0.35) 80%);
          z-index: 1;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: #fff;
          max-width: 900px;
          margin: 0 auto;
          width: 100%;
        }
        .hero-title {
          font-size: 3.6rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 20px rgba(0,0,0,0.5);
        }
        .hero-subtitle {
          font-size: 1.3rem;
          color: rgba(255,255,255,0.95);
          max-width: 700px;
          margin: 0 auto 30px;
          text-shadow: 0 1px 12px rgba(0,0,0,0.4);
          line-height: 1.6;
        }
        .btn-primary {
          display: inline-block;
          background: #fff;
          color: #0b1a2e;
          font-weight: 600;
          padding: 14px 38px;
          border-radius: 40px;
          text-decoration: none;
          transition: 0.3s;
          font-size: 1rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        .btn-primary:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 8px 30px rgba(255,255,255,0.25);
        }
        .btn-primary i { margin-left: 8px; }
        .hero-actions {
          display: flex;
          justify-content: center;
          width: 100%;
        }
        .search-container {
          max-width: 750px;
          margin: 30px auto 0;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(10px);
          border-radius: 60px;
          padding: 6px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.15);
          border: 1px solid rgba(255,255,255,0.3);
        }
        .search-form {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-wrap: wrap;
        }
        .search-input-wrapper {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-input-wrapper i {
          position: absolute;
          left: 18px;
          color: #5a6e8b;
        }
        .search-input-wrapper input {
          width: 100%;
          padding: 14px 18px 14px 48px;
          background: transparent;
          border: none;
          color: #0b1a2e;
          font-size: 1rem;
          outline: none;
          font-family: inherit;
        }
        .search-input-wrapper input::placeholder { color: #8a9eab; }
        .search-select-wrapper {
          position: relative;
          min-width: 160px;
        }
        .search-select-wrapper select {
          width: 100%;
          padding: 14px 40px 14px 18px;
          background: rgba(0,0,0,0.04);
          border: none;
          border-radius: 40px;
          color: #0b1a2e;
          font-size: 0.95rem;
          appearance: none;
          cursor: pointer;
          outline: none;
          font-family: inherit;
        }
        .search-select-wrapper select option { background: #fff; color: #0b1a2e; }
        .search-select-wrapper i {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #5a6e8b;
          pointer-events: none;
        }
        .btn-search {
          background: #0b1a2e;
          color: #fff;
          border: none;
          padding: 14px 32px;
          border-radius: 40px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
          font-family: inherit;
          font-size: 1rem;
          white-space: nowrap;
        }
        .btn-search:hover {
          background: #1a3a5a;
          transform: scale(1.02);
        }
        .slide-indicators {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 25px;
        }
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.3);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }
        .dot.active {
          background: #fff;
          border-color: #fff;
          transform: scale(1.2);
        }
        .dot:hover {
          border-color: #fff;
          transform: scale(1.1);
        }

        /* ----- Animations (unchanged) ----- */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-up {
          opacity: 0;
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ----- Section common ----- */
        .section-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .section-tag {
          display: inline-block;
          background: rgba(11,26,46,0.06);
          padding: 6px 20px;
          border-radius: 40px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #1a4a7a;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 12px;
        }
        .section-title {
          font-size: 2.4rem;
          font-weight: 700;
          color: #0b1a2e;
        }
        .btn-outline-navy {
          display: inline-block;
          padding: 10px 28px;
          border: 2px solid #0b1a2e;
          border-radius: 40px;
          color: #0b1a2e;
          font-weight: 600;
          text-decoration: none;
          transition: 0.3s;
        }
        .btn-outline-navy:hover {
          background: #0b1a2e;
          color: #fff;
          transform: scale(1.03);
        }

        /* ----- Categories (unchanged) ----- */
        .categories-section {
          padding: 80px 0 60px;
          background: #f8faff;
        }
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .category-card {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid #eef2f7;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          cursor: default;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.3s ease;
        }
        .category-card.visible { opacity: 1; transform: translateY(0); }
        .category-card:nth-child(odd) { transform: translateX(-30px) translateY(40px); }
        .category-card:nth-child(odd).visible { transform: translateX(0) translateY(0); }
        .category-card:nth-child(even) { transform: translateX(30px) translateY(40px); }
        .category-card:nth-child(even).visible { transform: translateX(0) translateY(0); }
        .category-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 20px 60px rgba(0,0,0,0.08);
        }
        .category-image {
          height: 180px;
          background-size: cover;
          background-position: center;
          position: relative;
        }
        .category-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(11,26,46,0.5), rgba(26,58,90,0.3));
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease;
        }
        .category-card:hover .category-overlay { background: linear-gradient(135deg, rgba(11,26,46,0.6), rgba(26,58,90,0.4)); }
        .category-icon {
          width: 64px;
          height: 64px;
          background: rgba(255,255,255,0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: #1a4a7a;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .category-card:hover .category-icon { transform: scale(1.1) rotate(-5deg); }
        .category-content {
          padding: 24px 20px 20px;
          text-align: center;
        }
        .category-content h3 {
          font-size: 1.2rem;
          font-weight: 700;
          color: #0b1a2e;
          margin-bottom: 8px;
        }
        .category-content p {
          color: #5a6e8b;
          font-size: 0.95rem;
          margin-bottom: 16px;
        }
        .category-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #1a4a7a;
          font-weight: 600;
          text-decoration: none;
          font-size: 0.9rem;
          transition: gap 0.3s ease;
        }
        .category-link:hover { gap: 12px; }

        /* ----- About with Animated Image Stack ----- */
        .about-section {
          padding: 80px 0 40px;
          background: #fff;
        }
        .about-wrapper {
          display: flex;
          flex-direction: column;
          gap: 50px;
        }
        .about-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          align-items: center;
        }
        .about-text h2 {
          font-size: 2.2rem;
          font-weight: 700;
          color: #0b1a2e;
          margin: 8px 0 16px;
        }
        .about-text p {
          color: #1d2e44;
          font-size: 1.05rem;
          line-height: 1.8;
          margin-bottom: 24px;
        }

        /* Image Stack */
        .about-image-stack {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          max-width: 500px;
          margin: 0 auto;
        }
        .stack-item {
          position: absolute;
          width: 85%;
          height: 85%;
          background-size: cover;
          background-position: center;
          border-radius: 20px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
          transition: transform 0.4s ease, box-shadow 0.4s ease, z-index 0s;
          will-change: transform;
          border: 2px solid rgba(255,255,255,0.8);
        }
        .stack-item.item-1 {
          top: 0;
          left: 0;
          z-index: 3;
          transform: rotate(-2deg) translateY(-4px);
          animation: floatStack 6s ease-in-out infinite;
        }
        .stack-item.item-2 {
          top: 8%;
          left: 8%;
          z-index: 2;
          transform: rotate(3deg) translateY(2px);
          animation: floatStack 7s ease-in-out infinite reverse;
        }
        .stack-item.item-3 {
          top: 16%;
          left: 16%;
          z-index: 1;
          transform: rotate(-1deg) translateY(8px);
          animation: floatStack 8s ease-in-out infinite 1s;
        }
        .about-image-stack:hover .stack-item {
          transform: scale(1.02) rotate(0deg) translateY(0);
          z-index: 5;
          box-shadow: 0 16px 40px rgba(0,0,0,0.12);
        }
        .about-image-stack:hover .stack-item.item-1 {
          transform: scale(1.03) rotate(1deg) translateY(-6px);
        }
        .about-image-stack:hover .stack-item.item-2 {
          transform: scale(1.02) rotate(-1deg) translateY(-2px);
        }
        .about-image-stack:hover .stack-item.item-3 {
          transform: scale(1.01) rotate(2deg) translateY(4px);
        }

        @keyframes floatStack {
          0%, 100% { transform: translateY(0) rotate(var(--rotation, 0deg)); }
          50% { transform: translateY(-10px) rotate(var(--rotation, 0deg)); }
        }
        .stack-item.item-1 { --rotation: -2deg; }
        .stack-item.item-2 { --rotation: 3deg; }
        .stack-item.item-3 { --rotation: -1deg; }

        /* Stats row */
        .stats-row {
          width: 100%;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .stat-item {
          background: #f8faff;
          padding: 24px 16px;
          border-radius: 16px;
          text-align: center;
          border: 1px solid #eef2f7;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .stat-item:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 12px 30px rgba(0,0,0,0.04);
        }
        .stat-value {
          display: block;
          font-size: 2.6rem;
          font-weight: 800;
          color: #0b1a2e;
          line-height: 1;
        }
        .stat-label {
          font-size: 0.95rem;
          color: #5a6e8b;
          margin-top: 4px;
        }

        /* ----- Why Choose Us (unchanged) ----- */
        .why-section {
          padding: 80px 0 60px;
          background: #f8faff;
        }
        .why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 30px;
        }
        .why-card {
          background: #fff;
          padding: 32px 24px;
          border-radius: 20px;
          text-align: center;
          border: 1px solid #eef2f7;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          opacity: 0;
          transform: translateY(40px);
        }
        .why-card.visible { opacity: 1; transform: translateY(0); }
        .why-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 16px 48px rgba(0,0,0,0.05);
        }
        .why-icon {
          width: 56px;
          height: 56px;
          margin: 0 auto 16px;
          background: #e8edf5;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          color: #1a4a7a;
          transition: background 0.3s ease, transform 0.3s ease;
        }
        .why-card:hover .why-icon {
          background: #1a4a7a;
          color: #fff;
          transform: scale(1.05) rotate(-5deg);
        }
        .why-card h4 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0b1a2e;
          margin-bottom: 6px;
        }
        .why-card p {
          color: #5a6e8b;
          font-size: 0.95rem;
        }

        /* ----- Events (unchanged) ----- */
        .events-section {
          padding: 80px 0 60px;
          background: #fff;
        }
        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }
        .event-card {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid #eef2f7;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          opacity: 0;
          transform: translateY(40px);
        }
        .event-card.visible { opacity: 1; transform: translateY(0); }
        .event-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 20px 60px rgba(0,0,0,0.06);
        }
        .event-image {
          height: 200px;
          background-size: cover;
          background-position: center;
          position: relative;
        }
        .event-date-badge {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background: rgba(11,26,46,0.85);
          backdrop-filter: blur(6px);
          padding: 6px 14px;
          border-radius: 30px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #fff;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .event-content {
          padding: 20px 20px 24px;
        }
        .event-content h4 {
          font-size: 1.2rem;
          font-weight: 700;
          color: #0b1a2e;
          margin-bottom: 4px;
        }
        .event-content .event-name {
          font-weight: 600;
          color: #1a4a7a;
          margin-bottom: 6px;
        }
        .event-content .event-venue {
          color: #5a6e8b;
          font-size: 0.9rem;
        }
        .event-content i { margin-right: 6px; }

        /* ----- Newsletter (unchanged) ----- */
        .newsletter-section {
          padding: 60px 0;
          background: #0b1a2e;
          color: #fff;
        }
        .newsletter-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 30px;
        }
        .newsletter-content h3 {
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .newsletter-content p {
          color: rgba(255,255,255,0.6);
          font-size: 1.05rem;
        }
        .newsletter-form {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          max-width: 450px;
          width: 100%;
        }
        .newsletter-form input {
          flex: 1;
          padding: 12px 20px;
          border-radius: 40px;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.06);
          color: #fff;
          font-size: 1rem;
          outline: none;
          font-family: inherit;
          min-width: 200px;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .newsletter-form input::placeholder { color: rgba(255,255,255,0.4); }
        .newsletter-form input:focus {
          border-color: #7a9bcb;
          box-shadow: 0 0 0 3px rgba(122,155,203,0.1);
        }
        .newsletter-form .btn-primary {
          background: #fff;
          color: #0b1a2e;
          border: none;
          padding: 12px 32px;
          border-radius: 40px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
          font-family: inherit;
          white-space: nowrap;
        }
        .newsletter-form .btn-primary:hover {
          background: #e8edf5;
          transform: scale(1.02);
        }

        /* ----- Contact (unchanged) ----- */
        .contact-section {
          padding: 60px 0 40px;
          background: #fff;
          border-top: 1px solid #eef2f7;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 32px;
        }
        .contact-info {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          transition: transform 0.2s ease;
        }
        .contact-info:hover { transform: translateX(6px); }
        .contact-info i {
          font-size: 1.6rem;
          color: #1a4a7a;
          margin-top: 4px;
          min-width: 32px;
        }
        .contact-info h4 {
          font-size: 1rem;
          font-weight: 700;
          color: #0b1a2e;
          margin-bottom: 2px;
        }
        .contact-info p,
        .contact-info a {
          color: #5a6e8b;
          text-decoration: none;
          font-size: 0.95rem;
        }
        .contact-info a:hover { color: #0b1a2e; }

        /* ----- Back to Top (unchanged) ----- */
        .back-to-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #0b1a2e;
          color: #fff;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
          transition: transform 0.3s ease, background 0.3s ease;
          z-index: 999;
          animation: fadeIn 0.3s ease;
        }
        .back-to-top:hover {
          transform: scale(1.1) translateY(-4px);
          background: #1a3a5a;
        }

        /* ----- Responsive (updated) ----- */
        @media (max-width: 820px) {
          .hero-title { font-size: 2.6rem; }
          .hero-subtitle { font-size: 1.1rem; }
          .search-container { border-radius: 30px; padding: 10px; }
          .search-form { flex-direction: column; align-items: stretch; }
          .search-select-wrapper { min-width: auto; }
          .btn-search { width: 100%; }
          .about-row { grid-template-columns: 1fr; gap: 30px; }
          .about-image-stack { max-width: 100%; aspect-ratio: 4/3; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .newsletter-wrapper { flex-direction: column; text-align: center; }
          .newsletter-form { max-width: 100%; }
          .slide-indicators { margin-top: 20px; }
          .categories-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
        }

        @media (max-width: 480px) {
          .hero-title { font-size: 2rem; }
          .hero-subtitle { font-size: 1rem; }
          .section-title { font-size: 1.8rem; }
          .stats-grid { grid-template-columns: 1fr; }
          .contact-grid { grid-template-columns: 1fr; }
          .events-grid { grid-template-columns: 1fr; }
          .back-to-top { bottom: 16px; right: 16px; width: 40px; height: 40px; font-size: 1rem; }
          .dot { width: 10px; height: 10px; }
          .categories-grid { grid-template-columns: 1fr; max-width: 400px; }
          .stack-item { width: 90%; height: 90%; }
        }
      `}</style>
    </div>
  );
};

export default HomePage;