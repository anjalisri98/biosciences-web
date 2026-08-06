import React, { useState } from 'react';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    { id: 'all', label: 'All Products', icon: 'fa-th-large' },
    { id: 'pharma', label: 'Pharma Intermediates', icon: 'fa-capsules' },
    { id: 'agro', label: 'Agrochemicals', icon: 'fa-seedling' },
    { id: 'solvents', label: 'Specialty Solvents', icon: 'fa-flask' },
    { id: 'acids', label: 'Organic Acids', icon: 'fa-atom' },
    { id: 'polymers', label: 'Polymer Additives', icon: 'fa-cubes' },
    { id: 'biotech', label: 'Biotechnology', icon: 'fa-dna' },
    { id: 'industrial', label: 'Industrial Chemicals', icon: 'fa-industry' },
  ];

  const products = [
    // Pharma Intermediates
    {
      id: 1,
      name: 'API Intermediates',
      category: 'pharma',
      grade: '99.9%',
      purity: '≥ 99.5%',
      cas: 'CAS 123-45-6',
      description: 'High-purity active pharmaceutical ingredients intermediates for drug manufacturing.',
      applications: ['Tablet Formulation', 'Capsule Production', 'Injectable Drugs'],
      packaging: ['25kg Drums', '100kg Fibre Drums', '500kg IBC Totes'],
      icon: 'fa-capsules',
      color: '#1a4a7a',
      inStock: true,
    },
    {
      id: 2,
      name: 'Chiral Intermediates',
      category: 'pharma',
      grade: '99.8%',
      purity: '≥ 99.0%',
      cas: 'CAS 234-56-7',
      description: 'Enantiomerically pure chiral intermediates for stereoselective synthesis.',
      applications: ['Chiral Synthesis', 'API Manufacturing', 'Research'],
      packaging: ['1kg Bottles', '5kg Drums', '25kg Drums'],
      icon: 'fa-capsules',
      color: '#2a5a8a',
      inStock: true,
    },
    {
      id: 3,
      name: 'Peptide Building Blocks',
      category: 'pharma',
      grade: '98.5%',
      purity: '≥ 98.0%',
      cas: 'CAS 345-67-8',
      description: 'Fmoc-protected amino acids and peptide synthesis reagents.',
      applications: ['Peptide Synthesis', 'Drug Discovery', 'Bioconjugation'],
      packaging: ['100g Bottles', '500g Bottles', '1kg Bottles'],
      icon: 'fa-capsules',
      color: '#3a6a9a',
      inStock: true,
    },

    // Agrochemicals
    {
      id: 4,
      name: 'Herbicide Formulations',
      category: 'agro',
      grade: 'EC 90%',
      purity: '≥ 90.0%',
      cas: 'CAS 456-78-9',
      description: 'Broad-spectrum herbicide formulations for crop protection.',
      applications: ['Weed Control', 'Cereal Crops', 'Vegetable Farming'],
      packaging: ['5L Cans', '25L Drums', '200L Barrels'],
      icon: 'fa-seedling',
      color: '#2a7a5a',
      inStock: true,
    },
    {
      id: 5,
      name: 'Fungicide Concentrates',
      category: 'agro',
      grade: 'SC 80%',
      purity: '≥ 80.0%',
      cas: 'CAS 567-89-0',
      description: 'Suspension concentrate fungicides for disease management.',
      applications: ['Fruit Protection', 'Vegetable Crops', 'Ornamental Plants'],
      packaging: ['1L Bottles', '5L Cans', '20L Drums'],
      icon: 'fa-seedling',
      color: '#3a8a6a',
      inStock: true,
    },

    // Specialty Solvents
    {
      id: 6,
      name: 'HPLC Grade Solvents',
      category: 'solvents',
      grade: 'HPLC',
      purity: '≥ 99.9%',
      cas: 'CAS 678-90-1',
      description: 'High-performance liquid chromatography grade solvents.',
      applications: ['Analytical Chemistry', 'Pharmaceutical QC', 'Research Labs'],
      packaging: ['2.5L Bottles', '4L Bottles', '20L Drums'],
      icon: 'fa-flask',
      color: '#4a7a9a',
      inStock: true,
    },
    {
      id: 7,
      name: 'Anhydrous Solvents',
      category: 'solvents',
      grade: 'Anhydrous',
      purity: '≥ 99.8%',
      cas: 'CAS 789-01-2',
      description: 'Water-free solvents for moisture-sensitive reactions.',
      applications: ['Synthesis', 'Polymerization', 'Electrochemistry'],
      packaging: ['1L Bottles', '4L Bottles', '20L Drums'],
      icon: 'fa-flask',
      color: '#5a8aaa',
      inStock: true,
    },

    // Organic Acids
    {
      id: 8,
      name: 'Citric Acid',
      category: 'acids',
      grade: 'Food Grade',
      purity: '≥ 99.5%',
      cas: 'CAS 77-92-9',
      description: 'High-purity citric acid for food, pharmaceutical, and industrial applications.',
      applications: ['Food Preservation', 'Pharmaceuticals', 'Cosmetics'],
      packaging: ['25kg Bags', '50kg Drums', '1000kg Bulk'],
      icon: 'fa-atom',
      color: '#7a6a4a',
      inStock: true,
    },
    {
      id: 9,
      name: 'Lactic Acid',
      category: 'acids',
      grade: 'Food Grade',
      purity: '≥ 88.0%',
      cas: 'CAS 50-21-5',
      description: 'Natural lactic acid for food, pharmaceutical and cosmetic applications.',
      applications: ['Food Acidulant', 'Cosmetics', 'Biodegradable Plastics'],
      packaging: ['25kg Drums', '200kg Drums', '1000kg IBC'],
      icon: 'fa-atom',
      color: '#8a7a5a',
      inStock: true,
    },

    // Polymer Additives
    {
      id: 10,
      name: 'UV Stabilizers',
      category: 'polymers',
      grade: 'UL94',
      purity: '≥ 98.0%',
      cas: 'CAS 901-23-4',
      description: 'UV light stabilizers and absorbers for polymer protection.',
      applications: ['Plastics Manufacturing', 'Coatings', 'Automotive Parts'],
      packaging: ['25kg Drums', '50kg Drums', '500kg Super Sacks'],
      icon: 'fa-cubes',
      color: '#5a6a8a',
      inStock: true,
    },
    {
      id: 11,
      name: 'Flame Retardants',
      category: 'polymers',
      grade: 'UL94 V-0',
      purity: '≥ 99.0%',
      cas: 'CAS 012-34-5',
      description: 'Halogenated and non-halogenated flame retardant additives.',
      applications: ['Electronics', 'Construction Materials', 'Automotive'],
      packaging: ['25kg Drums', '50kg Drums', '500kg Super Sacks'],
      icon: 'fa-cubes',
      color: '#6a7a9a',
      inStock: true,
    },

    // Biotechnology
    {
      id: 12,
      name: 'Enzymes',
      category: 'biotech',
      grade: 'Bio Grade',
      purity: '≥ 95.0%',
      cas: 'CAS 123-45-6',
      description: 'Industrial enzymes for biocatalysis and biotransformation.',
      applications: ['Biocatalysis', 'Pharma Synthesis', 'Food Processing'],
      packaging: ['1kg Bottles', '5kg Drums', '25kg Drums'],
      icon: 'fa-dna',
      color: '#3a8a7a',
      inStock: true,
    },
    {
      id: 13,
      name: 'Buffers & Reagents',
      category: 'biotech',
      grade: 'Molecular Grade',
      purity: '≥ 99.0%',
      cas: 'CAS 234-56-7',
      description: 'Molecular biology grade buffers and reagents for research.',
      applications: ['Molecular Biology', 'Protein Purification', 'Cell Culture'],
      packaging: ['500g Bottles', '1kg Bottles', '5kg Drums'],
      icon: 'fa-dna',
      color: '#4a9a8a',
      inStock: true,
    },

    // Industrial Chemicals
    {
      id: 14,
      name: 'Bulk Solvents',
      category: 'industrial',
      grade: 'Tech Grade',
      purity: '≥ 99.0%',
      cas: 'CAS 345-67-8',
      description: 'Industrial grade solvents for manufacturing and processing.',
      applications: ['Industrial Cleaning', 'Paints & Coatings', 'Adhesives'],
      packaging: ['200L Drums', '1000L IBC', 'Bulk Tankers'],
      icon: 'fa-industry',
      color: '#6a6a7a',
      inStock: true,
    },
    {
      id: 15,
      name: 'Industrial Acids',
      category: 'industrial',
      grade: 'Tech Grade',
      purity: '≥ 98.0%',
      cas: 'CAS 456-78-9',
      description: 'Industrial acids for chemical processing and manufacturing.',
      applications: ['Chemical Processing', 'Metal Treatment', 'Water Treatment'],
      packaging: ['200L Drums', '1000L IBC', 'Bulk Tankers'],
      icon: 'fa-industry',
      color: '#7a6a7a',
      inStock: true,
    },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <section className="products-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <span className="page-tag">🧪 PRODUCT PORTFOLIO</span>
          <h1 className="page-title">
            Our Chemical <span>Products</span>
          </h1>
          <p className="page-subtitle">
            From research quantities to bulk export — all products meet ISO & GMP standards.
          </p>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <i className={`fas ${cat.icon}`}></i>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Count */}
        <div className="product-count">
          Showing <strong>{filteredProducts.length}</strong> products
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className={`product-card animate-fade-up delay-${Math.min(index % 4 + 1, 4)}`}
              onClick={() => setSelectedProduct(product)}
            >
              {/* Bottle Icon with Brand Tag */}
              <div className="product-bottle" style={{ background: product.color + '11' }}>
                <div className="bottle-icon" style={{ color: product.color }}>
                  <i className={`fas ${product.icon}`}></i>
                </div>
                <span className="brand-tag" style={{ background: product.color }}>
                  <i className="fas fa-certificate"></i> CREST
                </span>
                <span className="grade-badge" style={{ background: product.color + '22', color: product.color }}>
                  {product.grade}
                </span>
              </div>

              {/* Product Info */}
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>

              {/* Product Details */}
              <div className="product-details">
                <div className="detail-item">
                  <span className="detail-label">Purity</span>
                  <span className="detail-value">{product.purity}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">CAS</span>
                  <span className="detail-value">{product.cas}</span>
                </div>
              </div>

              {/* Applications */}
              <div className="product-applications">
                {product.applications.slice(0, 2).map((app, i) => (
                  <span key={i} className="app-tag">{app}</span>
                ))}
                {product.applications.length > 2 && (
                  <span className="app-tag more">+{product.applications.length - 2}</span>
                )}
              </div>

              {/* Stock Status */}
              <div className="product-footer">
                <span className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                  <i className={`fas ${product.inStock ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
                <button className="view-details-btn" style={{ borderColor: product.color, color: product.color }}>
                  View Details <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Products Message */}
        {filteredProducts.length === 0 && (
          <div className="no-products">
            <i className="fas fa-box-open"></i>
            <h3>No products found</h3>
            <p>Try selecting a different category</p>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>
              <i className="fas fa-times"></i>
            </button>

            <div className="modal-header">
              <div className="modal-bottle" style={{ background: selectedProduct.color + '11' }}>
                <i className={`fas ${selectedProduct.icon}`} style={{ color: selectedProduct.color }}></i>
              </div>
              <div className="modal-title">
                <span className="modal-grade" style={{ background: selectedProduct.color, color: '#fff' }}>
                  {selectedProduct.grade}
                </span>
                <h2>{selectedProduct.name}</h2>
                <p className="modal-category">Category: {categories.find(c => c.id === selectedProduct.category)?.label}</p>
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
                    <strong>{selectedProduct.purity}</strong>
                  </div>
                  <div className="spec-item">
                    <span>Grade</span>
                    <strong>{selectedProduct.grade}</strong>
                  </div>
                  <div className="spec-item">
                    <span>CAS Number</span>
                    <strong>{selectedProduct.cas}</strong>
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
                    {selectedProduct.applications.map((app, i) => (
                      <li key={i}><i className="fas fa-check"></i> {app}</li>
                    ))}
                  </ul>
                </div>

                <div className="spec-group">
                  <h4>Packaging Options</h4>
                  <ul className="packaging-list">
                    {selectedProduct.packaging.map((pkg, i) => (
                      <li key={i}><i className="fas fa-box"></i> {pkg}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="modal-actions">
                <button className="btn-primary">
                  <i className="fas fa-file-pdf"></i> Download Spec Sheet
                </button>
                <button className="btn-secondary">
                  <i className="fas fa-envelope"></i> Request Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .products-page {
          padding: 80px 0 60px;
          background: #ffffff;
        }

        /* Page Header */
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

        /* Category Filter */
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

        /* Product Count */
        .product-count {
          text-align: center;
          color: #5a6e8b;
          font-size: 0.95rem;
          margin-bottom: 30px;
        }

        .product-count strong {
          color: #0b1a2e;
        }

        /* Products Grid */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 30px;
        }

        .product-card {
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid #e4eaf2;
          padding: 28px 24px 24px;
          transition: 0.4s;
          cursor: pointer;
          position: relative;
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(11, 26, 46, 0.08);
          border-color: #c8d6e4;
        }

        /* Product Bottle */
        .product-bottle {
          position: relative;
          width: 100px;
          height: 100px;
          margin: 0 auto 16px;
          border-radius: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bottle-icon {
          font-size: 3rem;
        }

        .brand-tag {
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.5rem;
          font-weight: 700;
          color: #ffffff;
          padding: 2px 12px;
          border-radius: 20px;
          white-space: nowrap;
          letter-spacing: 0.5px;
        }

        .brand-tag i {
          margin-right: 4px;
          font-size: 0.4rem;
        }

        .grade-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          font-size: 0.55rem;
          font-weight: 700;
          padding: 2px 12px;
          border-radius: 20px;
          letter-spacing: 0.3px;
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
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 14px;
          padding: 12px;
          background: #f8faff;
          border-radius: 12px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .detail-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          color: #8a9eab;
          letter-spacing: 0.5px;
          font-weight: 600;
        }

        .detail-value {
          font-size: 0.85rem;
          font-weight: 600;
          color: #0b1a2e;
        }

        .product-applications {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          justify-content: center;
          margin-bottom: 16px;
        }

        .app-tag {
          font-size: 0.7rem;
          padding: 2px 12px;
          background: #e8edf5;
          color: #3a4e6b;
          border-radius: 20px;
          font-weight: 500;
        }

        .app-tag.more {
          background: #0b1a2e;
          color: #ffffff;
        }

        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 14px;
          border-top: 1px solid #eef2f7;
        }

        .stock-status {
          font-size: 0.8rem;
          font-weight: 600;
        }

        .stock-status i {
          margin-right: 4px;
        }

        .stock-status.in-stock {
          color: #2a8a5a;
        }

        .stock-status.out-of-stock {
          color: #c0392b;
        }

        .view-details-btn {
          background: transparent;
          border: 2px solid;
          padding: 6px 16px;
          border-radius: 30px;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
          font-family: inherit;
        }

        .view-details-btn:hover {
          background: #0b1a2e;
          color: #ffffff !important;
          border-color: #0b1a2e !important;
        }

        /* No Products */
        .no-products {
          text-align: center;
          padding: 60px 20px;
        }

        .no-products i {
          font-size: 3rem;
          color: #dce4ee;
          margin-bottom: 16px;
        }

        .no-products h3 {
          font-size: 1.3rem;
          color: #0b1a2e;
          margin-bottom: 4px;
        }

        .no-products p {
          color: #5a6e8b;
        }

        /* Modal */
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

        .modal-actions .btn-primary {
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
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .modal-actions .btn-primary:hover {
          background: #1a3a5a;
          transform: translateY(-2px);
        }

        .modal-actions .btn-secondary {
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
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .modal-actions .btn-secondary:hover {
          background: #0b1a2e;
          color: #ffffff;
        }

        @media (max-width: 820px) {
          .products-page { padding: 50px 0 40px; }
          .page-title { font-size: 2rem; }
          .products-grid { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }
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