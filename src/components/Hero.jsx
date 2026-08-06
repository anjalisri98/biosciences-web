import React from 'react';

const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="hero-bg-overlay"></div>
      <div className="hero-content-wrapper">
        <div className="container hero">
          <div className="hero-text animate-fade-up delay-1">
            <span className="hero-badge">
              <i className="fas fa-globe-americas"></i> GLOBAL PRESENCE
            </span>
            <h1>
              Delivering exceptional value
              <br />
              <span>to all our consumers worldwide</span>
            </h1>
            <p>
              Premium intermediates, agrochemicals & specialty compounds — sourced with integrity, 
              delivered across 45+ countries.
            </p>
            <div className="hero-actions">
              <a href="#products" className="btn-primary">
                <i className="fas fa-flask"></i> Explore Products
              </a>
              <a href="#contact" className="btn-secondary">
                <i className="fas fa-phone-alt"></i> Contact Sales
              </a>
            </div>
          </div>

          <div className="hero-stats animate-fade-up delay-3">
            <div className="stat stat-1">
              <i className="fas fa-globe-americas"></i>
              <strong>45+</strong>
              <span>Countries</span>
            </div>
            <div className="stat stat-2">
              <i className="fas fa-capsules"></i>
              <strong>120+</strong>
              <span>Products</span>
            </div>
            <div className="stat stat-3">
              <i className="fas fa-check-circle"></i>
              <strong>98%</strong>
              <span>On-time Delivery</span>
            </div>
            <div className="stat stat-4">
              <i className="fas fa-award"></i>
              <strong>15+</strong>
              <span>Years Excellence</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-wrapper {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: linear-gradient(145deg, #0b1a2e 0%, #1a3a5a 50%, #0b1a2e 100%);
          overflow: hidden;
        }

        .hero-bg-overlay {
          position: absolute;
          inset: 0;
          background: 
            url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="%230b1a2e"/><circle cx="200" cy="200" r="180" fill="%232a5a8a" opacity="0.15"/><circle cx="1000" cy="400" r="250" fill="%233a6a9a" opacity="0.1"/><circle cx="600" cy="600" r="200" fill="%232a5a8a" opacity="0.08"/></svg>') center/cover no-repeat;
          pointer-events: none;
        }

        .hero-content-wrapper {
          position: relative;
          z-index: 2;
          width: 100%;
          padding: 120px 0 60px;
        }

        .hero {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }

        .hero-text {
          flex: 1 1 500px;
          color: #ffffff;
        }

        .hero-badge {
          display: inline-block;
          background: rgba(122, 155, 203, 0.2);
          padding: 8px 24px;
          border-radius: 40px;
          font-size: 0.85rem;
          font-weight: 700;
          color: #ffffff;
          border: 1px solid rgba(122, 155, 203, 0.3);
          margin-bottom: 24px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .hero-badge i {
          margin-right: 8px;
          color: #7a9bcb;
        }

        .hero-text h1 {
          font-size: 3.8rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 20px;
          color: #ffffff;
        }

        .hero-text h1 span {
          color: #7a9bcb;
        }

        .hero-text p {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.85);
          max-width: 500px;
          margin-bottom: 32px;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn-primary {
          display: inline-block;
          background: #ffffff;
          color: #0b1a2e;
          font-weight: 700;
          padding: 14px 38px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .btn-primary:hover {
          background: #e8edf5;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(255, 255, 255, 0.15);
        }

        .btn-secondary {
          display: inline-block;
          background: transparent;
          color: #ffffff;
          font-weight: 600;
          padding: 14px 38px;
          border-radius: 8px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: #ffffff;
          transform: translateY(-2px);
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          flex: 0 0 100%;
          margin-top: 40px;
          padding-top: 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 16px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.04);
          transition: 0.3s;
        }

        .stat:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-4px);
        }

        .stat i {
          font-size: 1.6rem;
          color: #7a9bcb;
          margin-bottom: 6px;
        }

        .stat strong {
          font-size: 2.2rem;
          font-weight: 800;
          color: #ffffff;
        }

        .stat span {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          font-weight: 500;
        }

        /* Individual stat hover colors */
        .stat-1:hover i { color: #4a9bcb; }
        .stat-2:hover i { color: #6ab84a; }
        .stat-3:hover i { color: #f5a623; }
        .stat-4:hover i { color: #e8a87c; }

        @media (max-width: 820px) {
          .hero-content-wrapper {
            padding: 100px 0 40px;
          }

          .hero-text h1 {
            font-size: 2.6rem;
          }

          .hero-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .hero-text h1 {
            font-size: 2rem;
          }

          .hero-stats {
            grid-template-columns: 1fr 1fr;
          }

          .stat strong {
            font-size: 1.6rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;