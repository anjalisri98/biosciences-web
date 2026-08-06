import React from "react";

function About() {
  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header" style={{ background: "#1A3C8F", color: "white", padding: "60px 0", textAlign: "center" }}>
        <h1>About Us</h1>
        <p>Leading the way in chemical innovation since 1998</p>
      </div>

      <div className="container" style={{ padding: "60px 0" }}>
        <div className="about-section" style={{ display: "flex", gap: "40px", alignItems: "center", flexWrap: "wrap" }}>
          <div className="about-image" style={{ flex: 1, minWidth: "300px", borderRadius: "10px", overflow: "hidden", height: "400px" }}>
            <img src="/image7.jpg" alt="Factory" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div className="about-content" style={{ flex: 1, minWidth: "300px" }}>
            <h3 className="subtitle">OUR STORY</h3>
            <h2 style={{ fontSize: "2.5rem", color: "#1A3C8F", marginBottom: "20px" }}>Reliable Partner. Superior Solutions.</h2>
            <p style={{ color: "#555", lineHeight: "1.8", marginBottom: "20px" }}>
              Name Chemicals was founded with a vision to provide high-quality chemical solutions to industries worldwide. 
              With state-of-the-art manufacturing facilities and a dedicated R&D team, we ensure that every product meets 
              international standards.
            </p>
            <p style={{ color: "#555", lineHeight: "1.8", marginBottom: "30px" }}>
              Our commitment to sustainability and innovation drives us to develop eco-friendly solutions without compromising 
              on performance.
            </p>
            <div style={{ display: "flex", gap: "30px", flexWrap: "wrap", marginBottom: "30px" }}>
              <div><strong style={{ fontSize: "2rem", color: "#1A3C8F" }}>25+</strong><p>Years of Excellence</p></div>
              <div><strong style={{ fontSize: "2rem", color: "#1A3C8F" }}>500+</strong><p>Global Clients</p></div>
              <div><strong style={{ fontSize: "2rem", color: "#1A3C8F" }}>10+</strong><p>Countries Served</p></div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "30px", marginTop: "60px" }}>
          <div style={{ background: "#f8fafc", padding: "40px", borderRadius: "16px", textAlign: "center" }}>
            <i className="fas fa-bullseye" style={{ fontSize: "3rem", color: "#1A3C8F", marginBottom: "20px" }}></i>
            <h3 style={{ color: "#1A3C8F" }}>Our Mission</h3>
            <p>To deliver innovative and sustainable chemical solutions that empower industries and improve lives.</p>
          </div>
          <div style={{ background: "#f8fafc", padding: "40px", borderRadius: "16px", textAlign: "center" }}>
            <i className="fas fa-eye" style={{ fontSize: "3rem", color: "#1A3C8F", marginBottom: "20px" }}></i>
            <h3 style={{ color: "#1A3C8F" }}>Our Vision</h3>
            <p>To become a global leader in specialty chemicals, recognized for quality, innovation, and sustainability.</p>
          </div>
          <div style={{ background: "#f8fafc", padding: "40px", borderRadius: "16px", textAlign: "center" }}>
            <i className="fas fa-handshake" style={{ fontSize: "3rem", color: "#1A3C8F", marginBottom: "20px" }}></i>
            <h3 style={{ color: "#1A3C8F" }}>Our Values</h3>
            <p>Integrity, excellence, environmental stewardship, and customer-centricity in everything we do.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;