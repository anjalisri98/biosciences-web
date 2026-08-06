import React from 'react';

const About = () => (
  <section style={{ margin: '50px 0 30px' }}>
    <h2 className="section-title">About Crest Bioscientific</h2>
    <p className="section-sub">Trusted partner for chemical sourcing, export documentation, and logistics.</p>
    <div className="about-grid">
      <div className="about-text">
        <p><strong>Founded in 2012</strong>, Crest Bioscientific is a premier chemical export house based in India, serving pharma, agro, and industrial clients across Asia, Europe, and Americas.</p>
        <p>We combine deep technical expertise with robust supply chain — ensuring <strong>quality, compliance, and traceability</strong> from source to port.</p>
        <p>Our team of chemists and trade specialists manage every step: procurement, quality control, documentation, and shipping.</p>
      </div>
      <div className="about-highlight">
        <i className="fas fa-award"></i>
        <h4>ISO 9001:2024</h4>
        <p>Certified quality management system</p>
        <div style={{ marginTop: '16px' }}>
          <i className="fas fa-ship" style={{ marginRight: '10px' }}></i> 
          <span>40+ freight partners</span>
        </div>
        <div style={{ marginTop: '8px' }}>
          <i className="fas fa-file-alt" style={{ marginRight: '10px' }}></i> 
          <span>REACH / TSCA compliant</span>
        </div>
      </div>
    </div>
  </section>
);

export default About;