import React from 'react';

const GlobalFootprint = () => {
  const regions = [
    { name: 'North America', icon: 'fa-flag-usa', countries: 'USA, Canada, Mexico', color: '#2a5a8a' },
    { name: 'Europe', icon: 'fa-flag', countries: 'UK, Germany, France, Italy', color: '#3a6a9a' },
    { name: 'Asia Pacific', icon: 'fa-globe-asia', countries: 'India, China, Japan, Australia', color: '#4a7aaa' },
    { name: 'Africa', icon: 'fa-globe-africa', countries: 'South Africa, Nigeria, Kenya', color: '#2a8a6a' },
    { name: 'Latin America', icon: 'fa-globe-americas', countries: 'Brazil, Argentina, Colombia', color: '#3a8a7a' },
  ];

  return (
    <section id="about" className="footprint-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">🌍 GLOBAL PRESENCE</span>
          <h2 className="section-title">
            A Global <span>Footprint</span> of Excellence
          </h2>
          <p className="section-subtitle">
            Our presence spans across continents, delivering quality healthcare solutions worldwide.
          </p>
        </div>

        <div className="map-container">
          <div className="map-placeholder">
            <i className="fas fa-globe"></i>
            <span>Global Network</span>
            <div className="map-pins">
              {regions.map((region, index) => (
                <div key={region.name} className="pin" style={{ 
                  left: ['22%', '52%', '72%', '42%', '32%'][index],
                  top: ['32%', '28%', '42%', '62%', '72%'][index],
                  background: region.color
                }}>
                  <i className="fas fa-map-pin"></i>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="regions-grid">
          {regions.map((region, index) => (
            <div key={region.name} className={`region-card animate-fade-up delay-${index + 1}`}>
              <div className="region-icon" style={{ background: region.color + '22', color: region.color }}>
                <i className={`fas ${region.icon}`}></i>
              </div>
              <h4 style={{ color: region.color }}>{region.name}</h4>
              <p>{region.countries}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .footprint-section {
          padding: 80px 0 60px;
          background: #f8faff;
        }

        .section-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .section-tag {
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

        .section-title {
          font-size: 2.4rem;
          font-weight: 700;
          color: #0b1a2e;
          margin-bottom: 0.75rem;
        }

        .section-title span {
          color: #1a4a7a;
        }

        .section-subtitle {
          color: #5a6e8b;
          font-size: 1.15rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .map-container {
          margin: 40px 0 50px;
          border-radius: 20px;
          overflow: hidden;
          background: #e8edf5;
          position: relative;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        }

        .map-placeholder {
          position: relative;
          height: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: 
            url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><rect width="1200" height="600" fill="%23e8edf5"/><path d="M100 300 Q300 180 500 280 T900 220 T1100 300" stroke="%231a4a7a" stroke-width="2" fill="none" opacity="0.08"/><path d="M150 350 Q350 220 550 320 T950 260 T1150 340" stroke="%231a4a7a" stroke-width="2" fill="none" opacity="0.06"/></svg>') center/cover no-repeat;
        }

        .map-placeholder i {
          font-size: 5rem;
          color: #1a4a7a;
          opacity: 0.12;
          margin-bottom: 8px;
        }

        .map-placeholder > span {
          color: #5a6e8b;
          font-weight: 600;
          font-size: 0.95rem;
          letter-spacing: 1px;
        }

        .map-pins {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }

        .pin {
          position: absolute;
          transform: translate(-50%, -50%);
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulsePin 2s infinite;
          box-shadow: 0 2px 12px rgba(0,0,0,0.15);
        }

        .pin i {
          font-size: 0.9rem;
          color: #ffffff;
          opacity: 1;
        }

        @keyframes pulsePin {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.2); }
        }

        .regions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 24px;
        }

        .region-card {
          background: #ffffff;
          padding: 28px 20px;
          border-radius: 16px;
          text-align: center;
          border: 1px solid #e4eaf2;
          transition: 0.3s;
        }

        .region-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(11, 26, 46, 0.08);
          border-color: #c8d6e4;
        }

        .region-icon {
          width: 56px;
          height: 56px;
          border-radius: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
          font-size: 1.6rem;
        }

        .region-card h4 {
          font-size: 1.05rem;
          color: #0b1a2e;
          margin-bottom: 4px;
          font-weight: 700;
        }

        .region-card p {
          color: #5a6e8b;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .footprint-section {
            padding: 50px 0 40px;
          }

          .section-title {
            font-size: 1.8rem;
          }

          .map-placeholder {
            height: 200px;
          }

          .pin {
            width: 22px;
            height: 22px;
          }

          .pin i {
            font-size: 0.7rem;
          }

          .regions-grid {
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          }
        }
      `}</style>
    </section>
  );
};

export default GlobalFootprint;