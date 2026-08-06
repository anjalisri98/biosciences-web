import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <i className="fas fa-flask"></i>
              <span>Crest Bioscientific</span>
            </div>
            <p>Delivering exceptional value to all our consumers worldwide.</p>
          </div>

          <div className="footer-links">
            <div className="link-group">
              <h4>Company</h4>
              <a href="#about">About</a>
              <a href="#products">Products</a>
              <a href="#research">Research</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="link-group">
              <h4>Resources</h4>
              <a href="#">Careers</a>
              <a href="#">Investors</a>
              <a href="#">Sustainability</a>
              <a href="#">Sitemap</a>
            </div>
            <div className="link-group">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
              <a href="#">Cookie Policy</a>
              <a href="#">SDS</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            © 2026 Crest Bioscientific · All Rights Reserved
          </div>
          <div className="footer-social">
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: #0b1a2e;
          color: rgba(255, 255, 255, 0.6);
          padding: 48px 0 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 3fr;
          gap: 48px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          margin-bottom: 24px;
        }

        .footer-brand .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.4rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 12px;
        }

        .footer-brand .logo i {
          color: #7a9bcb;
          font-size: 1.6rem;
        }

        .footer-brand p {
          font-size: 0.95rem;
          max-width: 280px;
        }

        .footer-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        .link-group h4 {
          color: #ffffff;
          font-weight: 600;
          margin-bottom: 12px;
          font-size: 0.95rem;
        }

        .link-group a {
          display: block;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
          padding: 4px 0;
          transition: 0.3s;
          text-decoration: none;
        }

        .link-group a:hover {
          color: #ffffff;
          padding-left: 4px;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .footer-copy {
          font-size: 0.85rem;
        }

        .footer-social {
          display: flex;
          gap: 16px;
        }

        .footer-social a {
          color: rgba(255, 255, 255, 0.3);
          font-size: 1.2rem;
          transition: 0.3s;
          text-decoration: none;
        }

        .footer-social a:hover {
          color: #ffffff;
          transform: translateY(-2px);
        }

        @media (max-width: 820px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .footer-links {
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .footer-links {
            grid-template-columns: 1fr;
          }

          .footer-brand p {
            max-width: 100%;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;