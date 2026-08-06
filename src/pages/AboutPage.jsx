import React from 'react';

const AboutPage = () => {
  return (
    <section className="about-page">
      <div className="container">
        <div className="page-header">
          <span className="page-tag">🏢 ABOUT US</span>
          <h1 className="page-title">
            About <span>Crest Bioscientific</span>
          </h1>
          <p className="page-subtitle">
            Trusted partner for chemical sourcing, export documentation, and logistics.
          </p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              <strong>Founded in 2012</strong>, Crest Bioscientific is a premier chemical export house 
              based in India, serving pharma, agro, and industrial clients across Asia, Europe, 
              and the Americas.
            </p>
            <p>
              We combine deep technical expertise with robust supply chain — ensuring 
              <strong> quality, compliance, and traceability</strong> from source to port.
            </p>
            <p>
              Our team of chemists and trade specialists manage every step: procurement, 
              quality control, documentation, and shipping. We are committed to 
              <strong> sustainable sourcing</strong> and <strong>ethical business practices</strong>.
            </p>

            <h2>Our Mission</h2>
            <p>
              To deliver high-quality chemical solutions that drive innovation and 
              sustainability across industries worldwide.
            </p>

            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-item">
                <i className="fas fa-shield-alt"></i>
                <h4>Quality</h4>
                <p>Uncompromising quality standards</p>
              </div>
              <div className="value-item">
                <i className="fas fa-handshake"></i>
                <h4>Integrity</h4>
                <p>Ethical business practices</p>
              </div>
              <div className="value-item">
                <i className="fas fa-lightbulb"></i>
                <h4>Innovation</h4>
                <p>Continuous improvement</p>
              </div>
              <div className="value-item">
                <i className="fas fa-globe"></i>
                <h4>Sustainability</h4>
                <p>Environmental responsibility</p>
              </div>
            </div>
          </div>

          <div className="about-sidebar">
            <div className="cert-card">
              <i className="fas fa-certificate"></i>
              <h4>ISO 9001:2024</h4>
              <p>Certified Quality Management</p>
            </div>
            <div className="cert-card">
              <i className="fas fa-ship"></i>
              <h4>40+ Freight Partners</h4>
              <p>Global Logistics Network</p>
            </div>
            <div className="cert-card">
              <i className="fas fa-file-signature"></i>
              <h4>REACH / TSCA</h4>
              <p>Full Regulatory Compliance</p>
            </div>
            <div className="cert-card">
              <i className="fas fa-microscope"></i>
              <h4>In-house R&D</h4>
              <p>Custom Synthesis Support</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-page {
          padding: 120px 0 60px;
          background: #ffffff;
        }

        .page-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .page-tag {
          display: inline-block;
          background: rgba(11, 26, 46, 0.06);
          padding: 8px 24px;
          border-radius: 40px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #1a4a7a;
          letter-spacing: 1.5px;
          margin-bottom: 12px;
        }

        .page-title {
          font-size: 2.8rem;
          font-weight: 800;
          color: #0b1a2e;
          margin-bottom: 0.75rem;
        }

        .page-title span {
          color: #1a4a7a;
        }

        .page-subtitle {
          color: #5a6e8b;
          font-size: 1.15rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .about-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 48px;
        }

        .about-text h2 {
          font-size: 1.5rem;
          color: #0b1a2e;
          margin: 24px 0 12px;
        }

        .about-text p {
          color: #1d2e44;
          font-size: 1.05rem;
          line-height: 1.8;
          margin-bottom: 16px;
        }

        .values-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 16px;
        }

        .value-item {
          padding: 20px;
          background: #f8faff;
          border-radius: 16px;
          text-align: center;
          border: 1px solid #eef2f7;
        }

        .value-item i {
          font-size: 2rem;
          color: #1a4a7a;
          margin-bottom: 8px;
        }

        .value-item h4 {
          font-size: 1rem;
          color: #0b1a2e;
        }

        .value-item p {
          font-size: 0.85rem;
          color: #5a6e8b;
          margin: 0;
        }

        .about-sidebar {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cert-card {
          padding: 24px;
          background: #f8faff;
          border-radius: 16px;
          border: 1px solid #eef2f7;
          text-align: center;
          transition: 0.3s;
        }

        .cert-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(11, 26, 46, 0.06);
        }

        .cert-card i {
          font-size: 2rem;
          color: #1a4a7a;
          margin-bottom: 8px;
        }

        .cert-card h4 {
          font-size: 1rem;
          color: #0b1a2e;
        }

        .cert-card p {
          font-size: 0.85rem;
          color: #5a6e8b;
          margin: 0;
        }

        @media (max-width: 820px) {
          .about-page { padding: 100px 0 40px; }
          .page-title { font-size: 2rem; }
          .about-content { grid-template-columns: 1fr; }
          .values-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 480px) {
          .values-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
};

export default AboutPage;