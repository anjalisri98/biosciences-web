import React from 'react';

const ContactCTA = () => {
  return (
    <section id="contact" className="cta-section">
      <div className="container">
        <div className="cta-wrapper">
          <div className="cta-content">
            <h2>
              <i className="fas fa-headset"></i> Global Headquarters
            </h2>
            <p>
              Get in touch with our team for partnerships, inquiries, or product information.
            </p>
          </div>

          <div className="contact-methods">
            <div className="method-card">
              <i className="fas fa-envelope"></i>
              <h4>Email Us</h4>
              <a href="mailto:info@crestbio.com">info@crestbio.com</a>
            </div>
            <div className="method-card">
              <i className="fas fa-phone"></i>
              <h4>Call Us</h4>
              <a href="tel:+912240001234">+91 22 4000 1234</a>
            </div>
            <div className="method-card">
              <i className="fas fa-map-marker-alt"></i>
              <h4>Visit Us</h4>
              <span>Mumbai, India</span>
            </div>
          </div>

          <div className="cta-action">
            <a href="#" className="btn-primary">
              <i className="fas fa-paper-plane"></i> Send Inquiry
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cta-section {
          padding: 60px 0;
          background: #ffffff;
        }

        .cta-wrapper {
          background: #0b1a2e;
          border-radius: 24px;
          padding: 56px 48px;
          color: #ffffff;
        }

        .cta-content {
          text-align: center;
          margin-bottom: 40px;
        }

        .cta-content h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .cta-content h2 i {
          color: #7a9bcb;
          margin-right: 12px;
        }

        .cta-content p {
          color: rgba(255, 255, 255, 0.6);
          font-size: 1.1rem;
        }

        .contact-methods {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .method-card {
          text-align: center;
          padding: 24px 20px;
          background: rgba(255, 255, 255, 0.04);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition: 0.3s;
        }

        .method-card:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .method-card i {
          font-size: 2rem;
          color: #7a9bcb;
          margin-bottom: 8px;
        }

        .method-card h4 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .method-card a,
        .method-card span {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          text-decoration: none;
          transition: 0.3s;
        }

        .method-card a:hover {
          color: #ffffff;
        }

        .cta-action {
          text-align: center;
        }

        .cta-action .btn-primary {
          background: #ffffff;
          color: #0b1a2e;
        }

        .cta-action .btn-primary:hover {
          background: #e8edf5;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }

        .cta-action .btn-primary i {
          margin-right: 8px;
        }

        @media (max-width: 768px) {
          .cta-wrapper {
            padding: 32px 24px;
          }

          .cta-content h2 {
            font-size: 1.6rem;
          }

          .contact-methods {
            grid-template-columns: 1fr;
            max-width: 300px;
            margin: 0 auto 32px;
          }
        }
      `}</style>
    </section>
  );
};

export default ContactCTA;