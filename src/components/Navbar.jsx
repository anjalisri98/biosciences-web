import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Products', path: '/products' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  // Check if on white background pages
  const isWhiteBgPage = location.pathname === '/products' || 
                        location.pathname === '/about' || 
                        location.pathname === '/contact';

  return (
    <nav 
      className={`
        navbar 
        ${scrolled ? 'scrolled' : ''} 
        ${isWhiteBgPage && !scrolled ? 'white-bg' : ''}
        ${mobileMenuOpen ? 'menu-open' : ''}
      `}
    >
      <div className="navbar-inner">
        <Link to="/" className={`logo ${isWhiteBgPage && !scrolled ? 'dark' : 'light'}`}>
          <i className="fas fa-flask"></i>
          <span>Crest Bioscientific</span>
        </Link>

        <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className={`
                nav-link 
                ${isActive(link.path) ? 'active' : ''} 
                ${isWhiteBgPage && !scrolled ? 'dark' : 'light'}
              `}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link 
            to="/contact" 
            className={`nav-cta ${isWhiteBgPage && !scrolled ? 'dark-cta' : 'light-cta'}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <i className="fas fa-phone-alt"></i> Contact
          </Link>
        </div>

        <button
          className={`mobile-toggle ${isWhiteBgPage && !scrolled ? 'dark' : 'light'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      <style>{`
        /* ===== BASE NAVBAR ===== */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 0 32px;
          transition: all 0.3s ease;
          background: transparent;
        }

        .navbar-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 0;
          max-width: 1280px;
          margin: 0 auto;
        }

        /* ===== LOGO ===== */
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.6rem;
          font-weight: 800;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .logo.light {
          color: #ffffff;
        }

        .logo.light i {
          color: #7a9bcb;
        }

        .logo.dark {
          color: #0b1a2e;
        }

        .logo.dark i {
          color: #1a4a7a;
        }

        /* ===== NAV LINKS ===== */
        .nav-links {
          display: flex;
          gap: 32px;
          align-items: center;
        }

        .nav-link {
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          padding: 4px 0;
          border-bottom: 2px solid transparent;
          text-decoration: none;
        }

        .nav-link.light {
          color: rgba(255, 255, 255, 0.85);
        }

        .nav-link.light:hover,
        .nav-link.light.active {
          color: #ffffff;
          border-bottom-color: #7a9bcb;
        }

        .nav-link.dark {
          color: #3a4e6b;
        }

        .nav-link.dark:hover,
        .nav-link.dark.active {
          color: #0b1a2e;
          border-bottom-color: #1a4a7a;
        }

        /* ===== CTA BUTTON ===== */
        .nav-cta {
          padding: 8px 24px;
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.3s ease;
          text-decoration: none;
          border-bottom: none !important;
        }

        .nav-cta.light-cta {
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff !important;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .nav-cta.light-cta:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        .nav-cta.dark-cta {
          background: #0b1a2e;
          color: #ffffff !important;
          border: 1px solid #0b1a2e;
        }

        .nav-cta.dark-cta:hover {
          background: #1a3a5a;
          border-color: #1a3a5a;
        }

        /* ===== MOBILE TOGGLE ===== */
        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .mobile-toggle.light {
          color: #ffffff;
        }

        .mobile-toggle.dark {
          color: #0b1a2e;
        }

        /* ===== WHITE BACKGROUND (Products, About, Contact) ===== */
        .navbar.white-bg {
          background: #ffffff;
          box-shadow: 0 1px 20px rgba(0, 0, 0, 0.04);
          border-bottom: 1px solid #eef2f7;
        }

        .navbar.white-bg .logo.light {
          display: none;
        }

        .navbar.white-bg .logo.dark {
          display: flex;
        }

        .navbar.white-bg .nav-link.light {
          display: none;
        }

        .navbar.white-bg .nav-link.dark {
          display: inline-block;
        }

        .navbar.white-bg .nav-cta.light-cta {
          display: none;
        }

        .navbar.white-bg .nav-cta.dark-cta {
          display: inline-block;
        }

        .navbar.white-bg .mobile-toggle.light {
          display: none;
        }

        .navbar.white-bg .mobile-toggle.dark {
          display: block;
        }

        /* Default hidden states */
        .logo.dark {
          display: none;
        }

        .nav-link.dark {
          display: none;
        }

        .nav-cta.dark-cta {
          display: none;
        }

        .mobile-toggle.dark {
          display: none;
        }

        /* ===== SCROLLED STATE (Dark background) ===== */
        .navbar.scrolled {
          background: #0b1a2e !important;
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
          border-bottom: none;
        }

        .navbar.scrolled .logo.light {
          display: flex !important;
        }

        .navbar.scrolled .logo.dark {
          display: none !important;
        }

        .navbar.scrolled .nav-link.light {
          display: inline-block !important;
          color: rgba(255, 255, 255, 0.85) !important;
        }

        .navbar.scrolled .nav-link.dark {
          display: none !important;
        }

        .navbar.scrolled .nav-link.light:hover,
        .navbar.scrolled .nav-link.light.active {
          color: #ffffff !important;
          border-bottom-color: #7a9bcb !important;
        }

        .navbar.scrolled .nav-cta.light-cta {
          display: inline-block !important;
          background: rgba(255, 255, 255, 0.12) !important;
          color: #ffffff !important;
          border: 1px solid rgba(255, 255, 255, 0.15) !important;
        }

        .navbar.scrolled .nav-cta.dark-cta {
          display: none !important;
        }

        .navbar.scrolled .mobile-toggle.light {
          display: block !important;
          color: #ffffff !important;
        }

        .navbar.scrolled .mobile-toggle.dark {
          display: none !important;
        }

        /* ===== MOBILE RESPONSIVE ===== */
        @media (max-width: 820px) {
          .navbar {
            padding: 0 18px;
          }

          .mobile-toggle {
            display: block !important;
          }

          .nav-links {
            display: none;
            flex-direction: column;
            width: 100%;
            padding: 20px 0;
            gap: 16px;
            align-items: center;
          }

          .nav-links.open {
            display: flex !important;
          }

          .nav-link {
            font-size: 1.1rem !important;
          }

          .nav-cta {
            width: 100%;
            text-align: center;
          }

          /* Mobile: White background pages */
          .navbar.white-bg .nav-link.dark {
            display: inline-block !important;
            color: #0b1a2e !important;
          }

          .navbar.white-bg .nav-link.dark:hover,
          .navbar.white-bg .nav-link.dark.active {
            color: #0b1a2e !important;
            border-bottom-color: #1a4a7a !important;
          }

          .navbar.white-bg .mobile-toggle.dark {
            display: block !important;
            color: #0b1a2e !important;
          }

          /* Mobile: Default (dark background) */
          .navbar:not(.white-bg) .nav-link.light {
            display: inline-block !important;
            color: #ffffff !important;
          }

          .navbar:not(.white-bg) .mobile-toggle.light {
            display: block !important;
            color: #ffffff !important;
          }

          /* Mobile: Scrolled */
          .navbar.scrolled .nav-link.light {
            display: inline-block !important;
            color: rgba(255, 255, 255, 0.85) !important;
          }

          .navbar.scrolled .nav-link.light.active {
            color: #ffffff !important;
          }

          .navbar.scrolled .mobile-toggle.light {
            display: block !important;
            color: #ffffff !important;
          }
        }

        @media (max-width: 480px) {
          .navbar {
            padding: 0 12px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;