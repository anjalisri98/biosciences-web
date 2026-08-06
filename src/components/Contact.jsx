import React from 'react';

const Contact = () => (
  <section className="contact-section">
    <div>
      <h2><i className="fas fa-headset" style={{ color: '#0a7e8c', marginRight: '12px' }}></i> Export desk</h2>
      <p>Get a quote, request a sample, or discuss your custom synthesis needs.</p>
    </div>
    <div className="contact-actions">
      <a href="#" className="btn" onClick={(e) => e.preventDefault()}>
        <i className="fas fa-envelope" style={{ marginRight: '8px' }}></i> Email us
      </a>
      <a href="#" className="btn btn-outline" onClick={(e) => e.preventDefault()}>
        <i className="fas fa-phone" style={{ marginRight: '8px' }}></i> +91 22 4000 1234
      </a>
    </div>
  </section>
);

export default Contact;