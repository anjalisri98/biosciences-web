import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const AdminProducts = () => {
  const { products, deleteProduct, categories } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) return;
    if (window.confirm(`Delete ${selectedProducts.length} products?`)) {
      selectedProducts.forEach(id => deleteProduct(id));
      setSelectedProducts([]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  // Filter products
  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = filterCategory === 'all' || p.category === filterCategory;
    return matchSearch && matchCategory;
  });

  // Get category label
  const getCategoryLabel = (catId) => {
    const cat = categories.find(c => c.id === catId);
    return cat ? cat.label : catId;
  };

  // Get category icon
  const getCategoryIcon = (catId) => {
    const cat = categories.find(c => c.id === catId);
    return cat ? cat.icon : 'fa-tag';
  };

  return (
    <div className="admin-products-page">
      {/* Header with actions */}
      <div className="products-header">
        <div>
          <h2>📦 Products</h2>
          <p className="products-subtitle">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            {filterCategory !== 'all' && ` in ${getCategoryLabel(filterCategory)}`}
          </p>
        </div>
        <div className="products-actions">
          <Link to="/admin/products/new" className="btn-primary">
            <i className="fas fa-plus"></i> Add Product
          </Link>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="products-toolbar">
        <div className="toolbar-left">
          <div className="search-wrapper">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm('')}>
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
          <div className="filter-wrapper">
            <i className="fas fa-filter"></i>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="toolbar-right">
          <div className="view-toggle">
            <button
              className={viewMode === 'table' ? 'active' : ''}
              onClick={() => setViewMode('table')}
              title="Table view"
            >
              <i className="fas fa-table"></i>
            </button>
            <button
              className={viewMode === 'card' ? 'active' : ''}
              onClick={() => setViewMode('card')}
              title="Card view"
            >
              <i className="fas fa-th-large"></i>
            </button>
          </div>
          {selectedProducts.length > 0 && (
            <button className="btn-bulk-delete" onClick={handleBulkDelete}>
              <i className="fas fa-trash-alt"></i> Delete Selected ({selectedProducts.length})
            </button>
          )}
        </div>
      </div>

      {/* Products Display */}
      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-box-open"></i>
          <h3>No products found</h3>
          <p>Try adjusting your search or filter, or add a new product.</p>
          <Link to="/admin/products/new" className="btn-primary">
            <i className="fas fa-plus"></i> Add Product
          </Link>
        </div>
      ) : viewMode === 'table' ? (
        /* Table View */
        <div className="products-table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th className="checkbox-col">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Grade</th>
                <th>Stock</th>
                <th className="actions-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr key={p.id} className={selectedProducts.includes(p.id) ? 'selected' : ''}>
                  <td className="checkbox-col">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(p.id)}
                      onChange={() => toggleSelect(p.id)}
                    />
                  </td>
                  <td className="image-col">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="product-thumb" />
                    ) : (
                      <div className="thumb-placeholder" style={{ background: p.color || '#1a4a7a' }}>
                        <i className={`fas ${p.icon || 'fa-cube'}`}></i>
                      </div>
                    )}
                  </td>
                  <td className="name-col">{p.name}</td>
                  <td>
                    <span className="category-badge">
                      <i className={`fas ${getCategoryIcon(p.category)}`}></i>
                      {getCategoryLabel(p.category)}
                    </span>
                  </td>
                  <td>{p.grade}</td>
                  <td>
                    <span className={`stock-badge ${p.inStock ? 'in-stock' : 'out-of-stock'}`}>
                      <i className={`fas ${p.inStock ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                      {p.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="actions-col">
                    <Link to={`/admin/products/edit/${p.id}`} className="action-btn edit-btn">
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button className="action-btn delete-btn" onClick={() => handleDelete(p.id)}>
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Card View */
        <div className="products-grid-view">
          {filteredProducts.map((p) => (
            <div key={p.id} className="product-card" style={{ borderTop: `4px solid ${p.color || '#1a4a7a'}` }}>
              <div className="product-card-image">
                {p.image ? (
                  <img src={p.image} alt={p.name} />
                ) : (
                  <div className="card-placeholder" style={{ background: p.color || '#1a4a7a' }}>
                    <i className={`fas ${p.icon || 'fa-cube'}`}></i>
                  </div>
                )}
                <div className="product-card-stock">
                  <span className={`stock-badge ${p.inStock ? 'in-stock' : 'out-of-stock'}`}>
                    {p.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
              <div className="product-card-body">
                <h4>{p.name}</h4>
                <div className="product-card-meta">
                  <span className="category-badge">
                    <i className={`fas ${getCategoryIcon(p.category)}`}></i>
                    {getCategoryLabel(p.category)}
                  </span>
                  <span className="grade-badge">{p.grade}</span>
                </div>
                <p className="product-card-desc">{p.description?.substring(0, 80)}...</p>
                <div className="product-card-actions">
                  <Link to={`/admin/products/edit/${p.id}`} className="edit-btn">
                    <i className="fas fa-edit"></i> Edit
                  </Link>
                  <button className="delete-btn" onClick={() => handleDelete(p.id)}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .admin-products-page {
          padding: 8px 0;
        }

        .products-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          margin-bottom: 24px;
          gap: 12px;
        }

        .products-header h2 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #0b1a2e;
          margin: 0;
        }

        .products-subtitle {
          color: #5a6e8b;
          margin: 4px 0 0;
          font-size: 0.95rem;
        }

        .products-actions {
          display: flex;
          gap: 12px;
        }

        .btn-primary {
          background: #0b1a2e;
          color: #fff;
          border: none;
          padding: 8px 20px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
          font-family: inherit;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
        }

        .btn-primary:hover {
          background: #1a3a5a;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(11,26,46,0.15);
        }

        /* Toolbar */
        .products-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 24px;
          background: #fff;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid #eef2f7;
        }

        .toolbar-left {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          flex: 1;
        }

        .search-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
          min-width: 200px;
        }

        .search-wrapper i.fa-search {
          position: absolute;
          left: 12px;
          color: #8a9eab;
        }

        .search-wrapper input {
          width: 100%;
          padding: 8px 12px 8px 36px;
          border-radius: 8px;
          border: 1.5px solid #dce4ee;
          font-family: inherit;
          font-size: 0.95rem;
          transition: 0.2s;
          background: #fff;
        }

        .search-wrapper input:focus {
          outline: none;
          border-color: #1a4a7a;
          box-shadow: 0 0 0 3px rgba(26,74,122,0.08);
        }

        .clear-search {
          position: absolute;
          right: 8px;
          background: none;
          border: none;
          color: #8a9eab;
          cursor: pointer;
          padding: 4px;
        }

        .filter-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .filter-wrapper i.fa-filter {
          position: absolute;
          left: 12px;
          color: #8a9eab;
        }

        .filter-wrapper select {
          padding: 8px 12px 8px 36px;
          border-radius: 8px;
          border: 1.5px solid #dce4ee;
          font-family: inherit;
          font-size: 0.95rem;
          background: #fff;
          appearance: none;
          cursor: pointer;
          min-width: 150px;
        }

        .filter-wrapper select:focus {
          outline: none;
          border-color: #1a4a7a;
          box-shadow: 0 0 0 3px rgba(26,74,122,0.08);
        }

        .toolbar-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .view-toggle {
          display: flex;
          border-radius: 8px;
          overflow: hidden;
          border: 1.5px solid #dce4ee;
        }

        .view-toggle button {
          background: #fff;
          border: none;
          padding: 6px 12px;
          cursor: pointer;
          color: #5a6e8b;
          transition: 0.2s;
          font-family: inherit;
        }

        .view-toggle button.active {
          background: #0b1a2e;
          color: #fff;
        }

        .view-toggle button:hover:not(.active) {
          background: #f0f4fa;
        }

        .btn-bulk-delete {
          background: #c0392b;
          color: #fff;
          border: none;
          padding: 6px 14px;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: 0.2s;
          font-family: inherit;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .btn-bulk-delete:hover {
          background: #a93226;
        }

        /* Table */
        .products-table-wrapper {
          background: #fff;
          border-radius: 12px;
          border: 1px solid #eef2f7;
          overflow: auto;
        }

        .products-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95rem;
        }

        .products-table thead {
          background: #f8faff;
        }

        .products-table th {
          padding: 12px 16px;
          text-align: left;
          font-weight: 600;
          color: #0b1a2e;
          border-bottom: 1px solid #eef2f7;
          white-space: nowrap;
        }

        .products-table td {
          padding: 12px 16px;
          border-bottom: 1px solid #f0f4fa;
          vertical-align: middle;
        }

        .products-table tbody tr:hover {
          background: #f8faff;
        }

        .products-table tbody tr.selected {
          background: #eaf0f8;
        }

        .checkbox-col {
          width: 40px;
          text-align: center;
        }

        .checkbox-col input[type="checkbox"] {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        .image-col {
          width: 60px;
        }

        .product-thumb {
          width: 44px;
          height: 44px;
          object-fit: cover;
          border-radius: 8px;
        }

        .thumb-placeholder {
          width: 44px;
          height: 44px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 1.2rem;
        }

        .category-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 2px 10px;
          border-radius: 20px;
          background: #e8edf5;
          font-size: 0.8rem;
          color: #0b1a2e;
          white-space: nowrap;
        }

        .category-badge i {
          font-size: 0.7rem;
        }

        .stock-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 2px 10px;
          border-radius: 20px;
        }

        .stock-badge.in-stock {
          color: #2a9d8f;
          background: #e6f4f0;
        }

        .stock-badge.out-of-stock {
          color: #c0392b;
          background: #fde8e5;
        }

        .actions-col {
          width: 80px;
          text-align: right;
          white-space: nowrap;
        }

        .action-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px 8px;
          font-size: 1rem;
          transition: 0.2s;
          border-radius: 4px;
        }

        .action-btn.edit-btn {
          color: #1a4a7a;
        }

        .action-btn.edit-btn:hover {
          background: #e8edf5;
        }

        .action-btn.delete-btn {
          color: #c0392b;
        }

        .action-btn.delete-btn:hover {
          background: #fde8e5;
        }

        /* Card View */
        .products-grid-view {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 24px;
        }

        .product-card {
          background: #fff;
          border-radius: 12px;
          border: 1px solid #eef2f7;
          overflow: hidden;
          transition: 0.2s;
          display: flex;
          flex-direction: column;
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.04);
        }

        .product-card-image {
          position: relative;
          height: 160px;
          background: #f8faff;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .product-card-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 8px;
        }

        .card-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 3rem;
        }

        .product-card-stock {
          position: absolute;
          top: 8px;
          right: 8px;
        }

        .product-card-stock .stock-badge {
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(4px);
        }

        .product-card-body {
          padding: 16px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .product-card-body h4 {
          font-size: 1rem;
          font-weight: 600;
          color: #0b1a2e;
          margin: 0 0 8px;
        }

        .product-card-meta {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }

        .grade-badge {
          display: inline-flex;
          align-items: center;
          padding: 2px 10px;
          border-radius: 20px;
          background: #eef2f7;
          font-size: 0.75rem;
          color: #3a4e6b;
        }

        .product-card-desc {
          font-size: 0.85rem;
          color: #5a6e8b;
          margin: 0 0 12px;
          flex: 1;
        }

        .product-card-actions {
          display: flex;
          gap: 8px;
          justify-content: flex-end;
          border-top: 1px solid #f0f4fa;
          padding-top: 12px;
        }

        .product-card-actions .edit-btn {
          background: #1a4a7a;
          color: #fff;
          border: none;
          padding: 6px 16px;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: 0.2s;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-family: inherit;
        }

        .product-card-actions .edit-btn:hover {
          background: #0f2f4f;
        }

        .product-card-actions .delete-btn {
          background: transparent;
          border: none;
          color: #c0392b;
          cursor: pointer;
          font-size: 1.1rem;
          padding: 0 8px;
          transition: 0.2s;
        }

        .product-card-actions .delete-btn:hover {
          color: #a93226;
        }

        /* Empty state */
        .empty-state {
          text-align: center;
          padding: 60px 20px;
          background: #fff;
          border-radius: 12px;
          border: 1px solid #eef2f7;
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
          margin-bottom: 20px;
        }

        /* Responsive */
        @media (max-width: 820px) {
          .products-toolbar {
            flex-direction: column;
            align-items: stretch;
          }

          .toolbar-left {
            flex-direction: column;
            align-items: stretch;
          }

          .search-wrapper {
            min-width: auto;
          }

          .filter-wrapper select {
            width: 100%;
          }

          .toolbar-right {
            justify-content: space-between;
          }

          .products-table th,
          .products-table td {
            padding: 8px 10px;
            font-size: 0.85rem;
          }

          .products-grid-view {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          }
        }

        @media (max-width: 640px) {
          .products-header {
            flex-direction: column;
            align-items: stretch;
          }

          .products-actions {
            justify-content: stretch;
          }

          .products-actions .btn-primary {
            width: 100%;
            justify-content: center;
          }

          .products-table .hide-mobile {
            display: none;
          }

          .products-grid-view {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminProducts;