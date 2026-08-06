import React from 'react';

const Testimonial = () => {
  return (
    <section className="testimonial-section">
      <div className="container">
        <div className="testimonial-card animate-fade-up">
          <i className="fas fa-quote-left quote-icon"></i>
          <blockquote>
            "Crest Bioscientific has been our trusted partner for over 8 years. Their attention to detail, 
            quality control, and commitment to excellence is unmatched in the industry. They consistently 
            deliver on time and exceed our expectations."
          </blockquote>
          <div className="testimonial-author">
            <div className="author-avatar">
              <i className="fas fa-user-circle"></i>
            </div>
            <div className="author-info">
              <strong>Dr. Rajesh Kumar</strong>
              <span>VP Operations, Global Pharma Inc.</span>
            </div>
          </div>
          <div className="testimonial-rating">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <span>4.9/5 · 200+ reviews</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .testimonial-section {
          padding: 60px 0;
          background: #f8faff;
        }

        .testimonial-card {
          max-width: 800px;
          margin: 0 auto;
          background: #ffffff;
          padding: 48px 56px;
          border-radius: 24px;
          border: 1px solid #e4eaf2;
          text-align: center;
          position: relative;
        }

        .quote-icon {
          font-size: 3rem;
          color: #1a4a7a;
          opacity: 0.08;
          position: absolute;
          top: 24px;
          left: 32px;
        }

        blockquote {
          font-size: 1.3rem;
          font-weight: 500;
          color: #0b1a2e;
          line-height: 1.7;
          margin-bottom: 24px;
          font-style: italic;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 16px;
        }

        .author-avatar i {
          font-size: 3rem;
          color: #7a9bcb;
        }

        .author-info {
          text-align: left;
        }

        .author-info strong {
          display: block;
          color: #0b1a2e;
          font-size: 1.05rem;
        }

        .author-info span {
          color: #5a6e8b;
          font-size: 0.9rem;
        }

        .testimonial-rating {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .testimonial-rating i {
          color: #f5a623;
          font-size: 1.1rem;
        }

        .testimonial-rating span {
          color: #5a6e8b;
          font-size: 0.9rem;
          margin-left: 8px;
        }

        @media (max-width: 768px) {
          .testimonial-card {
            padding: 32px 24px;
          }

          blockquote {
            font-size: 1.1rem;
          }

          .quote-icon {
            display: none;
          }

          .testimonial-author {
            flex-direction: column;
            text-align: center;
          }

          .author-info {
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonial;