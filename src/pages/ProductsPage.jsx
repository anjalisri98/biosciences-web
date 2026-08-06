import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const ProductsPage = () => {
  const { products, categories } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const openModal = (product) => {
    setSelectedProduct(product);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section className="products-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <span className="page-tag">🧪 PRODUCT PORTFOLIO</span>
          <h1 className="page-title">Our Chemical <span>Products</span></h1>
          <p className="page-subtitle">
            From research quantities to bulk export — all products meet ISO & GMP standards.
          </p>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          <button
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            <i className="fas fa-th-large"></i> All Products
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <i className={`fas ${cat.icon}`}></i> {cat.label}
            </button>
          ))}
        </div>

        {/* Product Count */}
        <div className="product-count">
          Showing <strong>{filteredProducts.length}</strong> products
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                {product.image ? (
                  <img src={product.image} alt={product.name} />
                ) : (
                  <div className="product-bottle" style={{ background: product.color + '11' }}>
                    <div className="bottle-icon" style={{ color: product.color }}>
                      <i className={`fas ${product.icon || 'fa-cube'}`}></i>
                    </div>
                  </div>
                )}
              </div>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-meta">
                <span className="grade-badge" style={{ background: product.color, color: '#fff' }}>
                  {product.grade}
                </span>
                <span className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                  <i className={`fas ${product.inStock ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <button className="view-details-btn" onClick={() => openModal(product)}>
                View Details <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          ))}
        </div>

        {/* No products */}
        {filteredProducts.length === 0 && (
          <div className="empty-state">
            <i className="fas fa-box-open"></i>
            <h3>No products found</h3>
            <p>Try adjusting your filter or search.</p>
          </div>
        )}

        {/* Product Detail Modal */}
        {selectedProduct && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>
                <i className="fas fa-times"></i>
              </button>

              <div className="modal-header">
                <div className="modal-bottle" style={{ background: selectedProduct.color + '11' }}>
                  <i className={`fas ${selectedProduct.icon || 'fa-cube'}`} style={{ color: selectedProduct.color }}></i>
                </div>
                <div className="modal-title">
                  <span className="modal-grade" style={{ background: selectedProduct.color, color: '#fff' }}>
                    {selectedProduct.grade}
                  </span>
                  <h2>{selectedProduct.name}</h2>
                  <p className="modal-category">
                    Category: {categories.find(c => c.id === selectedProduct.category)?.label || selectedProduct.category}
                  </p>
                </div>
              </div>

              <div className="modal-body">
                <div className="modal-description">
                  <h4>Description</h4>
                  <p>{selectedProduct.description}</p>
                </div>

                <div className="modal-specs">
                  <div className="spec-group">
                    <h4>Specifications</h4>
                    <div className="spec-item">
                      <span>Purity</span>
                      <strong>{selectedProduct.purity || 'N/A'}</strong>
                    </div>
                    <div className="spec-item">
                      <span>Grade</span>
                      <strong>{selectedProduct.grade}</strong>
                    </div>
                    <div className="spec-item">
                      <span>CAS Number</span>
                      <strong>{selectedProduct.cas || 'N/A'}</strong>
                    </div>
                    <div className="spec-item">
                      <span>Status</span>
                      <strong className={selectedProduct.inStock ? 'text-green' : 'text-red'}>
                        {selectedProduct.inStock ? 'In Stock' : 'Out of Stock'}
                      </strong>
                    </div>
                  </div>

                  <div className="spec-group">
                    <h4>Applications</h4>
                    <ul className="app-list">
                      {selectedProduct.applications && selectedProduct.applications.length > 0 ? (
                        selectedProduct.applications.map((app, i) => (
                          <li key={i}><i className="fas fa-check"></i> {app}</li>
                        ))
                      ) : (
                        <li>No applications listed</li>
                      )}
                    </ul>
                  </div>

                  <div className="spec-group">
                    <h4>Packaging Options</h4>
                    <ul className="packaging-list">
                      {selectedProduct.packaging && selectedProduct.packaging.length > 0 ? (
                        selectedProduct.packaging.map((pkg, i) => (
                          <li key={i}><i className="fas fa-box"></i> {pkg}</li>
                        ))
                      ) : (
                        <li>No packaging options listed</li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="modal-actions">
                  <button className="btn-primary" onClick={() => alert('Downloading spec sheet...')}>
                    <i className="fas fa-file-pdf"></i> Download Spec Sheet
                  </button>
                  <Link to="/contact" className="btn-secondary">
                    <i className="fas fa-envelope"></i> Request Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Styles */}
      <style jsx>{`
        .products-page {
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
        .category-filter {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin-bottom: 30px;
          padding: 20px;
          background: #f8faff;
          border-radius: 16px;
          border: 1px solid #e4eaf2;
        }
        .filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 30px;
          border: 1px solid #dce4ee;
          background: #ffffff;
          color: #3a4e6b;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: 0.3s;
          font-family: inherit;
        }
        .filter-btn:hover {
          border-color: #1a4a7a;
          color: #1a4a7a;
          transform: translateY(-2px);
        }
        .filter-btn.active {
          background: #0b1a2e;
          color: #ffffff;
          border-color: #0b1a2e;
        }
        .filter-btn i {
          font-size: 0.9rem;
        }
        .product-count {
          text-align: center;
          color: #5a6e8b;
          font-size: 0.95rem;
          margin-bottom: 30px;
        }
        .product-count strong {
          color: #0b1a2e;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 30px;
        }
        .product-card {
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid #e4eaf2;
          padding: 24px;
          transition: 0.4s;
          display: flex;
          flex-direction: column;
          cursor: default;
        }
        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(11, 26, 46, 0.08);
          border-color: #c8d6e4;
        }
        .product-image {
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          background: #f8faff;
          border-radius: 12px;
          overflow: hidden;
        }
        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .product-bottle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }
        .bottle-icon {
          font-size: 4rem;
        }
        .product-name {
          font-size: 1.15rem;
          font-weight: 700;
          color: #0b1a2e;
          text-align: center;
          margin-bottom: 6px;
        }
        .product-description {
          font-size: 0.9rem;
          color: #5a6e8b;
          text-align: center;
          margin-bottom: 14px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .product-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }
        .grade-badge {
          padding: 2px 14px;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.3px;
        }
        .stock-status {
          font-size: 0.8rem;
          font-weight: 600;
        }
        .stock-status.in-stock {
          color: #2a8a5a;
        }
        .stock-status.out-of-stock {
          color: #c0392b;
        }
        .view-details-btn {
          background: transparent;
          border: 2px solid #0b1a2e;
          padding: 8px 20px;
          border-radius: 30px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
          font-family: inherit;
          align-self: center;
          margin-top: auto;
          color: #0b1a2e;
        }
        .view-details-btn:hover {
          background: #0b1a2e;
          color: #ffffff;
        }
        .view-details-btn i {
          margin-left: 6px;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(11, 26, 46, 0.7);
          backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .modal-content {
          background: #ffffff;
          border-radius: 24px;
          max-width: 700px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          padding: 40px;
          position: relative;
          animation: slideUp 0.4s ease;
        }
        .modal-close {
          position: absolute;
          top: 16px;
          right: 20px;
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #5a6e8b;
          cursor: pointer;
          transition: 0.3s;
        }
        .modal-close:hover {
          color: #0b1a2e;
          transform: rotate(90deg);
        }
        .modal-header {
          display: flex;
          gap: 24px;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 24px;
          border-bottom: 1px solid #eef2f7;
        }
        .modal-bottle {
          width: 80px;
          height: 80px;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.8rem;
          flex-shrink: 0;
        }
        .modal-title h2 {
          font-size: 1.6rem;
          color: #0b1a2e;
          margin-bottom: 4px;
        }
        .modal-title .modal-category {
          color: #5a6e8b;
          font-size: 0.9rem;
        }
        .modal-grade {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 2px 14px;
          border-radius: 20px;
          color: #ffffff;
          margin-bottom: 6px;
          letter-spacing: 0.5px;
        }
        .modal-body {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .modal-description h4 {
          font-size: 1rem;
          color: #0b1a2e;
          margin-bottom: 6px;
        }
        .modal-description p {
          color: #3a4e6b;
          font-size: 0.95rem;
          line-height: 1.7;
        }
        .modal-specs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .spec-group h4 {
          font-size: 0.85rem;
          color: #0b1a2e;
          margin-bottom: 10px;
          font-weight: 600;
        }
        .spec-item {
          display: flex;
          justify-content: space-between;
          padding: 6px 0;
          border-bottom: 1px solid #f0f4fa;
          font-size: 0.9rem;
        }
        .spec-item span {
          color: #5a6e8b;
        }
        .spec-item strong {
          color: #0b1a2e;
        }
        .text-green { color: #2a8a5a; }
        .text-red { color: #c0392b; }
        .app-list, .packaging-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .app-list li, .packaging-list li {
          padding: 4px 0;
          color: #3a4e6b;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .app-list i, .packaging-list i {
          color: #1a4a7a;
          font-size: 0.7rem;
          width: 16px;
        }
        .modal-actions {
          display: flex;
          gap: 16px;
          margin-top: 8px;
          padding-top: 24px;
          border-top: 1px solid #eef2f7;
        }
        .btn-primary {
          flex: 1;
          background: #0b1a2e;
          color: #ffffff;
          padding: 12px 24px;
          border-radius: 8px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
          font-family: inherit;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
        }
        .btn-primary:hover {
          background: #1a3a5a;
          transform: translateY(-2px);
        }
        .btn-secondary {
          flex: 1;
          background: transparent;
          color: #0b1a2e;
          padding: 12px 24px;
          border-radius: 8px;
          border: 2px solid #0b1a2e;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
          font-family: inherit;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
        }
        .btn-secondary:hover {
          background: #0b1a2e;
          color: #ffffff;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
        }
        .empty-state i {
          font-size: 3rem;
          color: #dce4ee;
          margin-bottom: 16px;
        }
        .empty-state h3 {
          font-size: 1.3rem;
          color: #0b1a2e;
          margin-bottom: 4px;
        }
        .empty-state p {
          color: #5a6e8b;
        }

        /* Responsive */
        @media (max-width: 820px) {
          .products-page { padding: 100px 0 40px; }
          .page-title { font-size: 2rem; }
          .products-grid { grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); }
          .modal-specs { grid-template-columns: 1fr; }
          .modal-actions { flex-direction: column; }
          .modal-header { flex-direction: column; text-align: center; }
        }
        @media (max-width: 480px) {
          .products-grid { grid-template-columns: 1fr; }
          .category-filter { gap: 6px; }
          .filter-btn { font-size: 0.75rem; padding: 6px 14px; }
          .modal-content { padding: 24px; }
        }
      `}</style>
    </section>
  );
};

export default ProductsPage;