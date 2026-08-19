// import React, { useRef, useEffect, useState } from "react"; // 👈 Added useState
// import { Link } from "react-router-dom";

// function Home() {
//   // --- 1. SLIDESHOW STATE & LOGIC ---
//   const slides = ['/image1.jpg', '/image2.jpg', '/image3.jpg', '/image4.jpg', '/image6.jpg'];
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 4000); // Changes every 4 seconds

//     return () => clearInterval(timer);
//   }, [slides.length]);

//   // --- 2. SCROLL ANIMATION LOGIC (YOUR EXISTING CODE) ---
//   const featuresListRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("animate-in");
//           }
//         });
//       },
//       { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
//     );

//     if (featuresListRef.current) {
//       const featureTexts = featuresListRef.current.querySelectorAll(".feature-text");
//       featureTexts.forEach((text, index) => {
//         text.style.transitionDelay = index * 0.15 + "s";
//         observer.observe(text);
//       });
//     }

//     return () => {
//       if (featuresListRef.current) {
//         const featureTexts = featuresListRef.current.querySelectorAll(".feature-text");
//         featureTexts.forEach((text) => observer.unobserve(text));
//       }
//     };
//   }, []);

//   return (
//     <>
//       {/* --- HERO SECTION (UPDATED SLIDESHOW) --- */}
//       <section className="hero">

//         {/* Changed to a container that holds all slides */}
//         <div className="hero-background">
//           {slides.map((slide, index) => (
//             <div
//               key={index}
//               className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
//               style={{ backgroundImage: `url('${slide}')` }}
//             ></div>
//           ))}
//         </div>

//         {/* Your existing text and gradient remain untouched */}
//         <div className="hero-content">
//           <h1>
//             Innovative Chemical
//             <br />
//             Solutions for a Better
//             <br />
//             Tomorrow
//           </h1>
//           <p>
//             High performance chemicals and solvents for a wide range of
//             industrial applications.
//           </p>
//           <Link to="/products" className="btn-primary">
//             EXPLORE PRODUCTS →
//           </Link>
//         </div>

//         {/* 👈 NEW: Slide Indicator Dots */}
//         <div className="hero-indicators">
//           {slides.map((_, index) => (
//             <span
//               key={index}
//               className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
//               onClick={() => setCurrentSlide(index)}
//             ></span>
//           ))}
//         </div>

//         <a
//           href="https://wa.me/919876543210"
//           className="whatsapp-btn"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <i className="fab fa-whatsapp" style={{ fontSize: "1.5rem" }}></i>{" "}
//           Chat on WhatsApp
//         </a>
//       </section>

//       {/* --- THE REST OF YOUR CODE REMAINS EXACTLY THE SAME BELOW --- */}

//       {/* --- SEARCH SECTION --- */}
//       <section className="search-section">
//         <div className="container search-wrapper">
//           <div className="search-features">
//             <span>
//               <i className="fas fa-flask"></i> Wide Product Range
//             </span>
//             <span>
//               <i className="fas fa-check-circle"></i> Premium Quality
//             </span>
//             <span>
//               <i className="fas fa-truck"></i> Timely Delivery
//             </span>
//             <span>
//               <i className="fas fa-headset"></i> Technical Support
//             </span>
//           </div>
//           <div className="search-box">
//             <input type="text" placeholder="Search for products..." />
//             <select>
//               <option>All Categories</option>
//             </select>
//             <button>
//               <i className="fas fa-search"></i> SEARCH
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* --- PRODUCT CATEGORIES (Preview) --- */}
//       <section
//         className="container"
//         style={{ paddingTop: "40px", paddingBottom: "60px" }}
//       >
//         <div className="section-title">
//           <p className="subtitle">OUR PRODUCT CATEGORIES</p>
//           <h2>High Quality Chemical Solutions</h2>
//         </div>
//         <div className="product-grid">
//           {[
//             {
//               icon: "fa-flask",
//               title: "Solvents",
//               desc: "High purity solvents for various industrial applications.",
//             },
//             {
//               icon: "fa-vial",
//               title: "Speciality Chemicals",
//               desc: "Advanced and innovative chemical solutions.",
//             },
//             {
//               icon: "fa-microscope",
//               title: "Lab Chemicals",
//               desc: "Chemicals designed for research & analysis.",
//             },
//             {
//               icon: "fa-industry",
//               title: "Process Chemicals",
//               desc: "Efficient and safe process operations.",
//             },
//             {
//               icon: "fa-oil-can",
//               title: "Petrochemicals",
//               desc: "High grade petrochemicals for diverse industries.",
//             },
//             {
//               icon: "fa-leaf",
//               title: "Green Chemicals",
//               desc: "Environmentally responsible & sustainable solutions.",
//             },
//           ].map((item, index) => (
//             <div className="product-card" key={index}>
//               <div className="icon-wrapper">
//                 <i className={`fas ${item.icon}`}></i>
//               </div>
//               <h3>{item.title}</h3>
//               <p>{item.desc}</p>
//               <Link to="/products" className="view-link">
//                 VIEW PRODUCTS{" "}
//                 <i
//                   className="fas fa-arrow-right"
//                   style={{ fontSize: "0.8rem", marginLeft: "5px" }}
//                 ></i>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* --- ABOUT PREVIEW --- */}
//       <section className="container about-section">
//         <div className="about-image">
//           <img src="/image7.jpg" alt="Industrial Plant" />
//         </div>
//         <div className="about-content">
//           <h3 className="subtitle">ABOUT US</h3>
//           <h2>Reliable Partner. Superior Solutions.</h2>
//           <p>
//             CREST BIOSCIENTIFIC is a leading manufacturer and supplier of high
//             quality chemicals, solvents and specialty products.
//           </p>
//           <div className="stats">
//             <div className="stat-item">
//               <h4>25+</h4>
//               <p>Years of Exp.</p>
//             </div>
//             <div className="stat-item">
//               <h4>500+</h4>
//               <p>Happy Customers</p>
//             </div>
//             <div className="stat-item">
//               <h4>100+</h4>
//               <p>Product Variants</p>
//             </div>
//             <div className="stat-item">
//               <h4>10+</h4>
//               <p>Countries Served</p>
//             </div>
//           </div>
//           <Link to="/about" className="btn-outline">
//             KNOW MORE ABOUT US →
//           </Link>
//         </div>
//       </section>

//       {/* --- WHY CHOOSE US --- */}
//       <section className="why-choose-us-section">
//         <div className="container">
//           <span className="sub-heading">WHY CHOOSE US</span>
//           <h2 className="main-heading">Commitment to Quality. Focused on You.</h2>
//           <div className="features-list" ref={featuresListRef}>
//             <div className="feature-item">
//               <div className="icon-wrapper">
//                 <i className="fa-solid fa-check"></i>
//               </div>
//               <div className="feature-text">
//                 <h3>Quality Assurance</h3>
//                 <p>
//                   Strict quality control and testing to deliver the best
//                   products.
//                 </p>
//               </div>
//             </div>
//             <div className="feature-item">
//               <div className="icon-wrapper">
//                 <i className="fa-solid fa-gears"></i>
//               </div>
//               <div className="feature-text">
//                 <h3>Advanced Technology</h3>
//                 <p>
//                   Modern infrastructure and advanced manufacturing processes.
//                 </p>
//               </div>
//             </div>
//             <div className="feature-item">
//               <div className="icon-wrapper">
//                 <i className="fa-solid fa-user-tie"></i>
//               </div>
//               <div className="feature-text">
//                 <h3>Expert Team</h3>
//                 <p>Experienced professionals ensuring customer satisfaction.</p>
//               </div>
//             </div>
//             <div className="feature-item">
//               <div className="icon-wrapper">
//                 <i className="fa-solid fa-leaf"></i>
//               </div>
//               <div className="feature-text">
//                 <h3>Sustainability</h3>
//                 <p>Committed to safe practices and a sustainable future.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* --- EVENTS PREVIEW --- */}
//       <section className="container events-section">
//         <div className="events-header">
//           <div>
//             <p className="subtitle">UPCOMING EVENTS</p>
//             <h2 className="section-heading">
//               Meet Us at Industry Leading Events
//             </h2>
//           </div>
//           <Link to="/events" className="view-all-link">
//             VIEW ALL EVENTS <i className="fas fa-arrow-right"></i>
//           </Link>
//         </div>
//         <div className="events-grid">
//           {[
//             {
//               src: "/idmwbSRRx4_logos.png",
//               alt: "ICC",
//               date: "26 - 28 November 2024",
//               title: "ICC Annual Conference 2024",
//               location: "India Expo Centre, Greater Noida",
//             },
//             {
//               src: "/chemspec-europe-logo-vector.png",
//               alt: "Chemspec",
//               date: "05 - 06 June 2024",
//               title: "Chemspec Europe 2024",
//               location: "Koelnmesse, Cologne, Germany",
//             },
//             {
//               src: "/iduBzsPe-8_1785830344236.png",
//               alt: "CPM",
//               date: "04 - 06 December 2024",
//               title: "CPM India 2024",
//               location: "Bombay Exhibition Centre, Mumbai",
//             },
//           ].map((event, index) => (
//             <div className="event-card" key={index}>
//               <div className="event-logo-area">
//                 <img src={event.src} alt={event.alt} />
//               </div>
//               <div className="event-details">
//                 <div className="event-meta">
//                   <i className="fas fa-calendar-alt"></i>
//                   <span>{event.date}</span>
//                 </div>
//                 <h4>{event.title}</h4>
//                 <div className="event-location">
//                   <i className="fas fa-map-marker-alt"></i>
//                   <span>{event.location}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// }

// export default Home;
import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api"; // Connects to your backend

// --- INDUSTRIES DATA ---
const industriesData = [
  {
    title: "Pharmaceutical",
    desc: "Quality chemicals, reagents, and intermediates for drug development.",
    image: "/image1.jpg",
    link: "/products?category=Pharmaceutical",
  },
  {
    title: "Biotechnology",
    desc: "Advanced biochemicals and life science reagents for genetic research.",
    image: "/image2.jpg",
    link: "/products?category=Biotechnology",
  },
  {
    title: "Industrial & Petrochemical",
    desc: "High-performance process chemicals and industrial solvents.",
    image: "/image3.jpg",
    link: "/products?category=Industrial",
  },
  {
    title: "Food & Beverage",
    desc: "Food-grade chemicals, preservatives, and analytical testing reagents.",
    image: "/image5.jpg",
    link: "/products?category=Food",
  },
];

function Home() {
  // --- SLIDESHOW ---
  const slides = [
    {
      image: "/image1.jpg",
      title: "Innovative Chemical\nSolutions for a Better\nTomorrow",
      desc: "High performance chemicals for a wide range of industries.",
    },
    {
      image: "/image2.jpg",
      title: "Sustainable & Green\nChemistry Solutions\n ABOUT US",
      desc: "Eco-friendly products designed for a cleaner future.",
      linkTo: "/about",
    },
    {
      image: "/image3.jpg",
      title: "Advanced Laboratory\nReagents & Specialties",
      desc: "High-purity lab chemicals tailored for cutting-edge research.",
    },
    {
      image: "/image4.jpg",
      title: "Industrial-Grade\nProcess Chemicals",
      desc: "Reliable chemicals for petrochemicals and manufacturing.",
    },
    {
      image: "/image6.jpg",
      title: "Global Supply Chain &\nTimely Delivery",
      desc: "Worldwide availability with premium quality standards.",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef(null);
  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      5000,
    );
  };
  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [slides.length]);
  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    resetTimer();
  };
  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    resetTimer();
  };

  // --- LIVE DATA ---
  const [products, setProducts] = useState([]);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await api.get("/dashboard/products/list");
        setProducts(productRes.data || []);
        const eventRes = await api.get("/dashboard/events/list");
        setEvents(eventRes.data || []);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, []);

  // --- ANIMATED COUNTERS ---
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [counter3, setCounter3] = useState(0);
  const aboutSectionRef = useRef(null);
  const animateCount = (start, end, dur, setter) => {
    let s = null;
    const step = (t) => {
      if (!s) s = t;
      const p = Math.min((t - s) / dur, 1);
      setter(Math.floor(p * (end - start) + start));
      if (p < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCount(0, 25, 1500, setCounter1);
            animateCount(0, 500, 1800, setCounter2);
            animateCount(0, 10, 1200, setCounter3);
          }
        });
      },
      { threshold: 0.3 },
    );
    if (aboutSectionRef.current) observer.observe(aboutSectionRef.current);
    return () => {
      if (aboutSectionRef.current) observer.unobserve(aboutSectionRef.current);
    };
  }, []);

  // --- ISOLATED SCROLL ANIMATION OBSERVER ---
  const sectionRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Apply unique animations based on the specific class
            if (entry.target.classList.contains("industry-image-card")) {
              entry.target.classList.add("animate-industry");
            } else if (entry.target.classList.contains("testimonial-card")) {
              entry.target.classList.add("animate-testimonial");
            } else {
              // Apply default reveal for other cards
              entry.target.classList.add("animate-reveal");
            }
          }
        });
      },
      { threshold: 0.15 },
    );

    if (sectionRef.current) {
      const targets = sectionRef.current.querySelectorAll(
        ".industry-image-card, .testimonial-card, .quality-card, .product-card",
      );
      targets.forEach((item, i) => {
        item.style.transitionDelay = i * 0.1 + "s";
        observer.observe(item);
      });
    }
    return () => {
      /* cleanup */
    };
  }, []);

  return (
    <>
      {/* --- HERO SECTION --- */}
      <section className="hero">
        <div className="hero-background">
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            if (slide.linkTo) {
              return (
                <Link
                  key={index}
                  to={slide.linkTo}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "block",
                    zIndex: 1,
                  }}
                >
                  <div
                    className={`hero-slide ${isActive ? "active" : ""}`}
                    style={{ backgroundImage: `url('${slide.image}')` }}
                  ></div>
                </Link>
              );
            }
            return (
              <div
                key={index}
                className={`hero-slide ${isActive ? "active" : ""}`}
                style={{ backgroundImage: `url('${slide.image}')` }}
              ></div>
            );
          })}
        </div>
        <div className="hero-content">
          <h1 style={{ whiteSpace: "pre-line" }}>
            {slides[currentSlide].title.split("\n").map((line, idx) => {
              const isAboutUs =
                line.trim() === "ABOUT US" && slides[currentSlide].linkTo;
              if (isAboutUs)
                return (
                  <React.Fragment key={idx}>
                    <br />
                    <Link
                      to={slides[currentSlide].linkTo}
                      className="about-slide-link"
                    >
                      ABOUT US
                    </Link>
                  </React.Fragment>
                );
              return (
                <React.Fragment key={idx}>
                  {idx > 0 && <br />}
                  {line}
                </React.Fragment>
              );
            })}
          </h1>
          <h2
            className="gradient-text"
            style={{
              fontSize: "2.5rem",
              marginBottom: "15px",
              display: "block",
              fontWeight: "700",
            }}
          >
            Crest Bioscientific
          </h2>
          <p key={currentSlide + "-desc"} className="hero-text-anim">
            {slides[currentSlide].desc}
          </p>
          {!slides[currentSlide].linkTo && (
            <Link to="/products" className="btn-primary">
              EXPLORE PRODUCTS →
            </Link>
          )}
        </div>
        <button className="hero-arrow hero-arrow-left" onClick={handlePrev}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="hero-arrow hero-arrow-right" onClick={handleNext}>
          <i className="fas fa-chevron-right"></i>
        </button>
        <div className="hero-indicators">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`hero-dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => {
                setCurrentSlide(index);
                resetTimer();
              }}
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

      {/* --- FLOATING SEARCH --- */}
      <div
        className="container"
        style={{ position: "relative", marginBottom: "30px" }}
      >
        <div className="search-container-floating">
          <div
            className="search-wrapper"
            style={{
              padding: "15px 20px",
              margin: 0,
              gap: "10px",
              background: "transparent",
              boxShadow: "none",
            }}
          >
            <div
              className="search-features"
              style={{
                color: "#002D5A",
                fontSize: "0.8rem",
                fontWeight: "500",
              }}
            >
              <span>
                <i className="fas fa-flask"></i> Wide Range
              </span>
              <span>
                <i className="fas fa-check-circle"></i> Premium
              </span>
              <span>
                <i className="fas fa-truck"></i> Fast Delivery
              </span>
              <span>
                <i className="fas fa-headset"></i> Support
              </span>
            </div>
            <div className="search-box">
              <input type="text" placeholder="Search..." />
              <select>
                <option>All Categories</option>
              </select>
              <button>
                <i className="fas fa-search"></i> SEARCH
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- PRODUCTS GRID --- */}
      <section className="container" style={{ paddingBottom: "60px" }}>
        <div className="section-title">
          <p className="subtitle">OUR CATALOG</p>
          <h2>High Quality Chemical Solutions</h2>
        </div>
        <div className="product-grid">
          {products.slice(0, 6).map((item) => (
            <div className="product-card" key={item._id}>
              <div className="icon-wrapper">
                <i className="fas fa-flask"></i>
              </div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
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

      {/* --- ISOLATED INDUSTRIES SECTION --- */}
      <section className="container" style={{ padding: "40px 0 60px 0" }}>
        <div className="section-title">
          <p className="subtitle">OUR EXPERTISE</p>
          <h2>Industries We Serve</h2>
        </div>
        <div className="industry-image-grid" ref={sectionRef}>
          {industriesData.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="industry-image-card"
              style={{ backgroundImage: `url('${item.image}')` }}
            >
              <div className="industry-overlay"></div>
              <div className="industry-image-content">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
                <span className="industry-link">Explore →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- ABOUT & STATS --- */}
      <section className="container about-section" ref={aboutSectionRef}>
        <div className="about-image">
          <img src="/image7.jpg" alt="Industrial Plant" />
        </div>
        <div className="about-content">
          <h3 className="subtitle">ABOUT US</h3>
          <h2>Reliable Partner. Superior Solutions.</h2>
          <p>
            CREST Bioscientific is a leading manufacturer and supplier of high
            quality chemicals, solvents and specialty products.
          </p>
          <div
            className="stats"
            style={{ justifyContent: "flex-start", gap: "40px" }}
          >
            <div className="stat-item">
              <h4
                style={{
                  color: "#002D5A",
                  fontSize: "2.2rem",
                  fontWeight: "800",
                }}
              >
                {counter1}+
              </h4>
              <p>Years of Exp.</p>
            </div>
            <div className="stat-item">
              <h4
                style={{
                  color: "#002D5A",
                  fontSize: "2.2rem",
                  fontWeight: "800",
                }}
              >
                {counter2}+
              </h4>
              <p>Happy Clients</p>
            </div>
            <div className="stat-item">
              <h4
                style={{
                  color: "#002D5A",
                  fontSize: "2.2rem",
                  fontWeight: "800",
                }}
              >
                {counter3}+
              </h4>
              <p>Countries Served</p>
            </div>
          </div>
          <Link to="/about" className="btn-outline">
            KNOW MORE ABOUT US →
          </Link>
        </div>
      </section>

      {/* --- ISOLATED TESTIMONIALS & QUALITY PROMISE SECTION --- */}
      <section className="container" style={{ padding: "60px 0" }}>
        <div className="section-title">
          <p className="subtitle">WHY CREST</p>
          <h2>Our Quality Promise</h2>
        </div>

        {/* Testimonials */}
        <div className="testimonials-grid" ref={sectionRef}>
          <div className="testimonial-card">
            <div className="quote-icon">
              <i className="fas fa-quote-left"></i>
            </div>
            <p>
              "Crest Bioscientific has been our go-to partner for lab reagents.
              Their quality control is unmatched."
            </p>
            <h4 className="client-name">Dr. Arjun Mehta</h4>
            <p className="client-role">Head of R&D, BioGen Labs</p>
          </div>
          <div className="testimonial-card">
            <div className="quote-icon">
              <i className="fas fa-quote-left"></i>
            </div>
            <p>
              "Reliable supply chain and fast delivery. They truly understand
              the urgency of pharmaceutical research."
            </p>
            <h4 className="client-name">Sarah Jennings</h4>
            <p className="client-role">Supply Chain Manager, ChemPharma Inc.</p>
          </div>
          <div className="testimonial-card">
            <div className="quote-icon">
              <i className="fas fa-quote-left"></i>
            </div>
            <p>
              "Their sustainable practices and green chemistry initiatives align
              perfectly with our ESG goals."
            </p>
            <h4 className="client-name">Prof. Ramesh Kumar</h4>
            <p className="client-role">
              Faculty, National Institute of Chemistry
            </p>
          </div>
        </div>

        {/* Quality Promise Cards */}
        <div
          className="quality-grid"
          style={{ marginTop: "40px" }}
          ref={sectionRef}
        >
          {[
            "Rigorous Testing",
            "Global Sourcing",
            "Reliable Logistics",
            "Eco-Friendly",
          ].map((title, i) => (
            <div
              key={i}
              className="quality-card"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <i className="fas fa-flask"></i>
              <h4>{title}</h4>
              <p>
                Committed to sustainable manufacturing practices and green
                chemistry initiatives.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA & EVENTS --- */}
      <div className="container">
        <div className="cta-banner">
          <div className="cta-content">
            <h2>Ready to Partner with Us?</h2>
            <p>
              Get in touch today for custom quotes, bulk orders, and technical
              support.
            </p>
            <Link to="/contact" className="btn-primary">
              CONTACT SALES TEAM →
            </Link>
          </div>
        </div>
      </div>
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
          {events.slice(0, 3).map((event) => (
            <div className="event-card" key={event._id}>
              <div className="event-logo-area">
                <img
                  src={event.imageUrl || "/placeholder.jpg"}
                  alt={event.title}
                />
              </div>
              <div className="event-details">
                <div className="event-meta">
                  <i className="fas fa-calendar-alt"></i>
                  <span>{new Date(event.eventDate).toLocaleDateString()}</span>
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
