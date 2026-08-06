import React from 'react';

const ByNumbers = () => {
  const metrics = [
    { value: '200+', label: 'Products', icon: 'fa-capsules', description: 'FDA approved formulations', color: '#4a9bcb' },
    { value: '150+', label: 'Markets', icon: 'fa-globe-americas', description: 'Countries served worldwide', color: '#6ab84a' },
    { value: '4.9/5', label: 'Rating', icon: 'fa-star', description: 'Customer satisfaction score', color: '#f5a623' },
    { value: '#1', label: 'Rank', icon: 'fa-trophy', description: 'Leading generics in US market', color: '#e8a87c' },
  ];

  return (
    <section id="research" className="numbers-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">📊 MARKET LEADERSHIP</span>
          <h2 className="section-title">
            By the <span>Numbers</span>
          </h2>
          <p className="section-subtitle">
            Delivering exceptional value to all our consumers worldwide.
          </p>
        </div>

        <div className="metrics-grid">
          {metrics.map((metric, index) => (
            <div key={metric.label} className={`metric-card animate-fade-up delay-${index + 1}`}>
              <div className="metric-icon" style={{ color: metric.color }}>
                <i className={`fas ${metric.icon}`}></i>
              </div>
              <div className="metric-value">{metric.value}</div>
              <div className="metric-label">{metric.label}</div>
              <div className="metric-description">{metric.description}</div>
            </div>
          ))}
        </div>

        <div className="footnote">
          * Largest generic Pharma Company in the US by prescriptions dispensed as per MAT March 2024
        </div>
      </div>

      <style jsx>{`
        .numbers-section {
          padding: 80px 0 60px;
          background: linear-gradient(145deg, #0b1a2e 0%, #1a3a5a 50%, #0b1a2e 100%);
          color: #ffffff;
        }

        .section-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .section-tag {
          display: inline-block;
          background: rgba(122, 155, 203, 0.15);
          padding: 8px 24px;
          border-radius: 40px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #7a9bcb;
          letter-spacing: 1.5px;
          margin-bottom: 12px;
        }

        .section-title {
          font-size: 2.4rem;
          font-weight: 700;
          color: #0b1a2e;
          margin-bottom: 0.75rem;
        }

        .section-title span {
          color: #7a9bcb;
        }

        .section-subtitle {
          color: rgba(255, 255, 255, 0.6);
          font-size: 1.15rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 32px;
          margin-bottom: 40px;
        }

        .metric-card {
          text-align: center;
          padding: 32px 20px;
          background: rgba(255, 255, 255, 0.04);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition: 0.3s;
        }

        .metric-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-4px);
          border-color: rgba(255, 255, 255, 0.12);
        }

        .metric-icon i {
          font-size: 2.5rem;
          margin-bottom: 12px;
        }

        .metric-value {
          font-size: 3rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 4px;
        }

        .metric-label {
          font-size: 1.1rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
        }

        .metric-description {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.4);
          margin-top: 4px;
        }

        .footnote {
          text-align: center;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.3);
          max-width: 600px;
          margin: 0 auto;
          padding-top: 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        @media (max-width: 768px) {
          .numbers-section {
            padding: 50px 0 40px;
          }

          .section-title {
            font-size: 1.8rem;
          }

          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .metric-value {
            font-size: 2.2rem;
          }
        }

        @media (max-width: 480px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default ByNumbers;