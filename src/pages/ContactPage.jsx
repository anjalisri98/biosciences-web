import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We\'ll get back to you shortly.');
    setFormData({ name: '', email: '', company: '', subject: 'General Inquiry', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="contact-page">
      <div className="container">
        <div className="page-header">
          <span className="page-tag">📞 CONTACT US</span>
          <h1 className="page-title">
            Get in <span>Touch</span>
          </h1>
          <p className="page-subtitle">
            Have questions about our products or services? Reach out to our team.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="info-card">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h4>Office</h4>
                <p>Mumbai, India</p>
              </div>
            </div>
            <div className="info-card">
              <i className="fas fa-phone"></i>
              <div>
                <h4>Phone</h4>
                <p>+91 22 4000 1234</p>
              </div>
            </div>
            <div className="info-card">
              <i className="fas fa-envelope"></i>
              <div>
                <h4>Email</h4>
                <p>exports@crestbio.com</p>
              </div>
            </div>
            <div className="info-card">
              <i className="fas fa-clock"></i>
              <div>
                <h4>Working Hours</h4>
                <p>Mon-Fri: 9:00 AM - 6:00 PM IST</p>
              </div>
            </div>

            <div className="social-links">
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
              <a href="#"><i className="fab fa-facebook"></i></a>
            </div>
          </div>

          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name <span>*</span></label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address <span>*</span></label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  name="company"
                  placeholder="Your company name"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Subject</label>
                <select name="subject" value={formData.subject} onChange={handleChange}>
                  <option>General Inquiry</option>
                  <option>Product Quote</option>
                  <option>Custom Synthesis</option>
                  <option>Partnership</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Message <span>*</span></label>
                <textarea
                  name="message"
                  placeholder="Tell us about your requirements..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn-primary">
                <i className="fas fa-paper-plane"></i> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-page {
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

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 48px;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .info-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: #f8faff;
          border-radius: 16px;
          border: 1px solid #eef2f7;
        }

        .info-card i {
          font-size: 1.5rem;
          color: #1a4a7a;
          width: 48px;
          height: 48px;
          background: #e8edf5;
          border-radius: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .info-card h4 {
          font-size: 0.95rem;
          color: #0b1a2e;
          margin: 0;
        }

        .info-card p {
          font-size: 0.9rem;
          color: #5a6e8b;
          margin: 0;
        }

        .social-links {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }

        .social-links a {
          width: 44px;
          height: 44px;
          border-radius: 60px;
          background: #e8edf5;
          color: #1a4a7a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          transition: 0.3s;
          text-decoration: none;
        }

        .social-links a:hover {
          background: #1a4a7a;
          color: #ffffff;
          transform: translateY(-2px);
        }

        .contact-form {
          background: #f8faff;
          padding: 40px;
          border-radius: 20px;
          border: 1px solid #eef2f7;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          font-size: 0.9rem;
          color: #0b1a2e;
          margin-bottom: 6px;
        }

        .form-group label span {
          color: #c0392b;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 14px 18px;
          border-radius: 12px;
          border: 1px solid #dce4ee;
          font-family: inherit;
          font-size: 1rem;
          transition: 0.2s;
          background: #ffffff;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: #1a4a7a;
          box-shadow: 0 0 0 4px rgba(26, 74, 122, 0.06);
        }

        .form-group textarea {
          min-height: 120px;
          resize: vertical;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .btn-primary {
          width: 100%;
          background: #0b1a2e;
          color: #ffffff;
          padding: 14px;
          border-radius: 12px;
          border: none;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: 0.3s;
          font-family: inherit;
        }

        .btn-primary:hover {
          background: #1a3a5a;
          transform: translateY(-2px);
        }

        .btn-primary i {
          margin-right: 8px;
        }

        @media (max-width: 820px) {
          .contact-page { padding: 100px 0 40px; }
          .page-title { font-size: 2rem; }
          .contact-grid { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
        }

        @media (max-width: 480px) {
          .contact-form { padding: 24px; }
        }
      `}</style>
    </section>
  );
};

export default ContactPage;