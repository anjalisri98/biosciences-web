import React, { useRef, useEffect } from "react";

// UPDATED CSS: Added border and enhanced hover animation
const cardAnimationStyles = `
  .anim-card {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    
    /* Subtle permanent border */
    border: 1px solid rgba(0, 45, 90, 0.08); 
    will-change: transform, box-shadow, border-color;
  }
  
  .anim-card.animate-card {
    opacity: 1;
    transform: translateY(0);
  }

  /* Enhanced Hover Animation */
  .anim-card:hover {
    transform: translateY(-8px) scale(1.02); /* Lifts and slightly scales */
    box-shadow: 0 15px 30px rgba(0, 45, 90, 0.1);
    border-color: #002D5A; /* Turns deep navy on hover */
  }
`;

function About() {
  // --- REFS FOR SCROLL ANIMATIONS ---
  const aboutSectionRef = useRef(null);
  const cardsRef = useRef(null);

  // --- SCROLL OBSERVER FOR IMAGE & TEXT (Left/Right) ---
  useEffect(() => {
    const aboutObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-about");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    if (aboutSectionRef.current) {
      const aboutImage = aboutSectionRef.current.querySelector(".about-image");
      const aboutContent = aboutSectionRef.current.querySelector(".about-content");
      if (aboutImage) aboutObserver.observe(aboutImage);
      if (aboutContent) aboutObserver.observe(aboutContent);
    }

    return () => {
      if (aboutSectionRef.current) {
        const aboutImage = aboutSectionRef.current.querySelector(".about-image");
        const aboutContent = aboutSectionRef.current.querySelector(".about-content");
        if (aboutImage) aboutObserver.unobserve(aboutImage);
        if (aboutContent) aboutObserver.unobserve(aboutContent);
      }
    };
  }, []);

  // --- SCROLL OBSERVER FOR BOTTOM CARDS (Staggered Pop-in) ---
  useEffect(() => {
    const cardsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.dataset.index;
            entry.target.style.transitionDelay = `${index * 0.1}s`;
            entry.target.classList.add("animate-card");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".anim-card");
      cards.forEach((card) => cardsObserver.observe(card));
    }

    return () => {
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".anim-card");
        cards.forEach((card) => cardsObserver.unobserve(card));
      }
    };
  }, []);

  return (
    <div className="page-container">
      {/* Inject CSS for enhanced card borders and animations */}
      <style>{cardAnimationStyles}</style>

      {/* --- PAGE HEADER BANNER --- */}
      <div
        className="page-header"
        style={{
          background: "#002D5A",
          color: "white",
          padding: "80px 0",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>About Us</h1>
        <p style={{ fontSize: "1.2rem", opacity: "0.9" }}>
          Leading the way in scientific innovation since 1998
        </p>
      </div>

      {/* --- MAIN BODY --- */}
      <div className="container" style={{ padding: "70px 0 40px 0" }}>
        
        {/* 1. CENTERED TITLE */}
        <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 50px auto" }}>
          <h3 className="subtitle" style={{ textAlign: "center" }}>OUR STORY</h3>
          <h2 
            style={{ 
              fontSize: "2.8rem", 
              color: "#002D5A", 
              margin: "10px 0 0 0",
              letterSpacing: "-0.5px",
              fontWeight: "800",
              lineHeight: "1.2"
            }}
          >
            Reliable Partner. Superior Solutions.
          </h2>
        </div>

        {/* 2. IMAGE LEFT + TEXT RIGHT */}
        <div 
          className="about-section" 
          ref={aboutSectionRef} 
          style={{ 
            flexDirection: "row",
            alignItems: "flex-start", 
            maxWidth: "1100px", 
            margin: "0 auto", 
            gap: "50px",
            paddingBottom: "40px"
          }}
        >
          {/* Left Image */}
          <div className="about-image" style={{ flex: 1, minWidth: "300px", height: "380px", borderRadius: "16px", boxShadow: "0 15px 40px rgba(0, 45, 90, 0.12)" }}>
            <img src="/image7.jpg" alt="Factory" />
          </div>

          {/* Right Text Block */}
          <div className="about-content" style={{ flex: 1, minWidth: "300px", textAlign: "left" }}>
            <p style={{ marginBottom: "20px" }}>
              Crest Bioscientific is a science-focused manufacturer, supplier and
              exporter of laboratory chemicals, research chemicals, laboratory
              reagents, life science products and laboratory glassware, serving the
              diverse requirements of research, pharmaceutical, biotechnology,
              academic and industrial laboratories. As one of India’s leading
              scientific product manufacturers and exporters, we are committed to
              delivering quality-focused products backed by reliable sourcing,
              responsive customer support and efficient logistics. Our growing
              portfolio supports applications across analytical chemistry, life
              sciences, pharmaceutical research, biotechnology, laboratory testing
              and scientific research. With a strong focus on quality, consistency
              and dependable supply, Crest Bioscientific is building a trusted
              presence as a laboratory chemicals, scientific products and
              laboratory glassware partner from India for customers across domestic
              and international markets.
            </p>
            <p style={{ marginTop: "20px" }}>
              Our commitment to sustainability and innovation drives us to develop
              eco-friendly solutions without compromising on performance.
            </p>

            {/* Stats Section */}
            <div 
              style={{ 
                borderTop: "2px solid rgba(0, 45, 90, 0.08)", 
                paddingTop: "35px", 
                marginTop: "40px"
              }}
            >
              <div className="stats" style={{ justifyContent: "flex-start", gap: "50px" }}>
                <div className="stat-item">
                  <h4 style={{ color: "#002D5A", fontSize: "2.2rem", fontWeight: "800" }}>25+</h4>
                  <p style={{ fontSize: "1rem", color: "#555" }}>Years of Excellence</p>
                </div>
                <div className="stat-item">
                  <h4 style={{ color: "#002D5A", fontSize: "2.2rem", fontWeight: "800" }}>500+</h4>
                  <p style={{ fontSize: "1rem", color: "#555" }}>Global Clients</p>
                </div>
                <div className="stat-item">
                  <h4 style={{ color: "#002D5A", fontSize: "2.2rem", fontWeight: "800" }}>10+</h4>
                  <p style={{ fontSize: "1rem", color: "#555" }}>Countries Served</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MISSION, VISION & VALUES CARDS (BORDER + HOVER ANIMATION) */}
      <div 
        style={{ 
          backgroundColor: "#f8fafc", 
          width: "100%", 
          padding: "60px 0" 
        }}
      >
        <div className="container">
          <div
            ref={cardsRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "30px",
            }}
          >
            {/* Card 1: Mission */}
            <div
              className="anim-card"
              data-index="0"
              style={{
                background: "#ffffff",
                padding: "40px 30px",
                borderRadius: "16px",
                textAlign: "center",
                cursor: "default",
                /* The border, shadow, and transition are now handled by the CSS class above */
              }}
            >
              <div style={{ display: "inline-block", background: "rgba(0, 45, 90, 0.05)", borderRadius: "50%", padding: "15px", marginBottom: "20px" }}>
                <i className="fas fa-bullseye" style={{ fontSize: "2.2rem", color: "#002D5A" }}></i>
              </div>
              <h3 style={{ color: "#002D5A", fontSize: "1.2rem", marginBottom: "15px" }}>Our Mission</h3>
              <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "#555" }}>
                To deliver innovative and sustainable chemical solutions that empower industries and improve lives.
              </p>
            </div>

            {/* Card 2: Vision */}
            <div
              className="anim-card"
              data-index="1"
              style={{
                background: "#ffffff",
                padding: "40px 30px",
                borderRadius: "16px",
                textAlign: "center",
                cursor: "default",
              }}
            >
              <div style={{ display: "inline-block", background: "rgba(0, 45, 90, 0.05)", borderRadius: "50%", padding: "15px", marginBottom: "20px" }}>
                <i className="fas fa-eye" style={{ fontSize: "2.2rem", color: "#002D5A" }}></i>
              </div>
              <h3 style={{ color: "#002D5A", fontSize: "1.2rem", marginBottom: "15px" }}>Our Vision</h3>
              <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "#555" }}>
                To become a global leader in specialty chemicals, recognized for quality, innovation, and sustainability.
              </p>
            </div>

            {/* Card 3: Values */}
            <div
              className="anim-card"
              data-index="2"
              style={{
                background: "#ffffff",
                padding: "40px 30px",
                borderRadius: "16px",
                textAlign: "center",
                cursor: "default",
              }}
            >
              <div style={{ display: "inline-block", background: "rgba(0, 45, 90, 0.05)", borderRadius: "50%", padding: "15px", marginBottom: "20px" }}>
                <i className="fas fa-handshake" style={{ fontSize: "2.2rem", color: "#002D5A" }}></i>
              </div>
              <h3 style={{ color: "#002D5A", fontSize: "1.2rem", marginBottom: "15px" }}>Our Values</h3>
              <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "#555" }}>
                Integrity, excellence, environmental stewardship, and customer-centricity in everything we do.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;