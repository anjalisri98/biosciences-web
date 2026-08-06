import React from 'react';

const Subsidiaries = () => {
  const subsidiaries = [
    {
      title: 'Pharma Division',
      icon: 'fa-capsules',
      description: 'Leading generics manufacturer with 500+ formulations',
      color: '#0b1a2e',
      bgColor: '#0b1a2e22'
    },
    {
      title: 'Research & Innovation',
      icon: 'fa-microscope',
      description: 'Advanced R&D labs with 200+ research scientists',
      color: '#1a4a7a',
      bgColor: '#1a4a7a22'
    },
    {
      title: 'Sustainable Solutions',
      icon: 'fa-leaf',
      description: 'Green chemistry and biosimilar product development',
      color: '#1a7a6a',
      bgColor: '#1a7a6a22'
    }
  ];

  return (
    <section id="products" className="subsidiaries-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">🏢 OUR DIVISIONS</span>
          <h2 className="section-title">
            Our Key <span>Subsidiaries</span>
          </h2>
          <p className="section-subtitle">
            Delivering exceptional value through our specialized business units.
          </p>
        </div>

        <div className="subsidiaries-grid">
          {subsidiaries.map((sub, index) => (
            <div key={sub.title} className={`sub-card animate-fade-up delay-${index + 1}`}>
              <div className="sub-image" style={{ background: sub.bgColor }}>
                <div className="image-placeholder" style={{ 
                  background: sub.color,
                  color: '#ffffff'
                }}>
                  <i className={`fas ${sub.icon}`}></i>
                  <span>{sub.title}</span>
                </div>
              </div>
              <div className="sub-content">
                <h3 style={{ color: sub.color }}>{sub.title}</h3>
                <p>{sub.description}</p>
                <a href="#" className="learn-more" style={{ color: sub.color }}>
                  Learn More <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .subsidiaries-section {
          padding: 80px 0 60px;
          background: #ffffff;
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

        .subsidiaries-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
        }

        .sub-card {
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid #e4eaf2;
          transition: 0.4s;
        }

        .sub-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(11, 26, 46, 0.08);
          border-color: #c8d6e4;
        }

        .sub-image {
          height: 200px;
          overflow: hidden;
        }

        .image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          transition: 0.3s;
        }

        .image-placeholder i {
          font-size: 3.5rem;
          margin-bottom: 12px;
          opacity: 0.9;
        }

        .image-placeholder span {
          font-size: 1rem;
          font-weight: 700;
          opacity: 0.9;
          letter-spacing: 1px;
        }

        .sub-content {
          padding: 28px 24px 32px;
          background: #ffffff;
        }

        .sub-content h3 {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .sub-content p {
          color: #5a6e8b;
          margin-bottom: 16px;
          font-size: 0.95rem;
        }

        .learn-more {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          transition: 0.3s;
          text-decoration: none;
        }

        .learn-more:hover {
          gap: 12px;
        }

        @media (max-width: 768px) {
          .subsidiaries-section {
            padding: 50px 0 40px;
          }

          .section-title {
            font-size: 1.8rem;
          }

          .subsidiaries-grid {
            grid-template-columns: 1fr;
            max-width: 400px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
};

export default Subsidiaries;