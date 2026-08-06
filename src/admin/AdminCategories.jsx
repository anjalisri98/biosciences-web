import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';

const AdminCategories = () => {
  const { categories, products } = useAdmin();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ id: '', label: '', icon: 'fa-tag' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Pre-defined icon options
  const iconOptions = [
    'fa-capsules', 'fa-seedling', 'fa-flask', 'fa-atom',
    'fa-cubes', 'fa-dna', 'fa-industry', 'fa-tag',
    'fa-pills', 'fa-syringe', 'fa-microscope', 'fa-vial'
  ];

  // Get product count for category
  const getProductCount = (catId) => {
    return products.filter(p => p.category === catId).length;
  };

  // Get category color (based on id)
  const getCategoryColor = (id) => {
    const colors = {
      pharma: '#1a4a7a',
      agro: '#2a7a5a',
      solvents: '#4a7a9a',
      acids: '#7a6a4a',
      polymers: '#5a6a8a',
      biotech: '#3a8a7a',
      industrial: '#6a6a7a'
    };
    return colors[id] || '#1a4a7a';
  };

  // Filter categories
  const filteredCategories = categories.filter(cat =>
    cat.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers
  const handleAdd = () => {
    if (!formData.id || !formData.label) return;
    const newCategory = {
      id: formData.id.toLowerCase().replace(/\s+/g, '-'),
      label: formData.label,
      icon: formData.icon || 'fa-tag'
    };
    // In a real app, you'd use a context method
    // For now, we'll simulate by using the existing categories
    alert(`Category "${newCategory.label}" added successfully! (Simulated)`);
    setFormData({ id: '', label: '', icon: 'fa-tag' });
    setShowAddForm(false);
  };

  const handleEdit = (cat) => {
    setEditingId(cat.id);
    setFormData({ id: cat.id, label: cat.label, icon: cat.icon || 'fa-tag' });
  };

  const handleUpdate = () => {
    if (!formData.label) return;
    alert(`Category "${formData.label}" updated successfully! (Simulated)`);
    setEditingId(null);
    setFormData({ id: '', label: '', icon: 'fa-tag' });
  };

  const handleDelete = (id) => {
    const cat = categories.find(c => c.id === id);
    const count = getProductCount(id);
    if (count > 0) {
      if (!window.confirm(`Category "${cat?.label}" has ${count} product(s). Deleting it will remove the category from all products. Continue?`)) {
        return;
      }
    } else {
      if (!window.confirm(`Delete category "${cat?.label}"?`)) return;
    }
    alert(`Category "${cat?.label}" deleted successfully! (Simulated)`);
  };

  return (
    <div className="admin-categories-page">
      {/* Header */}
      <div className="categories-header">
        <div>
          <h2>🏷️ Categories</h2>
          <p className="categories-subtitle">
            {categories.length} categories • {products.length} products
          </p>
        </div>
        <button className="btn-primary" onClick={() => setShowAddForm(true)}>
          <i className="fas fa-plus"></i> Add Category
        </button>
      </div>

      {/* Search */}
      <div className="categories-toolbar">
        <div className="search-wrapper">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
        <span className="result-count">{filteredCategories.length} categories</span>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="category-form-card">
          <div className="form-header">
            <h3><i className="fas fa-plus-circle"></i> New Category</h3>
            <button className="close-form" onClick={() => setShowAddForm(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="form-body">
            <div className="form-group">
              <label>Category ID <span className="required">*</span></label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                placeholder="e.g., pharma-intermediates"
              />
            </div>
            <div className="form-group">
              <label>Display Name <span className="required">*</span></label>
              <input
                type="text"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                placeholder="e.g., Pharma Intermediates"
              />
            </div>
            <div className="form-group">
              <label>Icon</label>
              <div className="icon-picker">
                {iconOptions.map((icon) => (
                  <button
                    key={icon}
                    className={`icon-option ${formData.icon === icon ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, icon })}
                  >
                    <i className={`fas ${icon}`}></i>
                  </button>
                ))}
              </div>
            </div>
            <div className="form-actions">
              <button className="btn-primary" onClick={handleAdd}>
                <i className="fas fa-check"></i> Add Category
              </button>
              <button className="btn-cancel" onClick={() => setShowAddForm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Form */}
      {editingId && (
        <div className="category-form-card edit">
          <div className="form-header">
            <h3><i className="fas fa-edit"></i> Edit Category</h3>
            <button className="close-form" onClick={() => { setEditingId(null); setFormData({ id: '', label: '', icon: 'fa-tag' }); }}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="form-body">
            <div className="form-group">
              <label>ID</label>
              <input type="text" value={formData.id} disabled className="disabled" />
            </div>
            <div className="form-group">
              <label>Display Name <span className="required">*</span></label>
              <input
                type="text"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                placeholder="Display name"
              />
            </div>
            <div className="form-group">
              <label>Icon</label>
              <div className="icon-picker">
                {iconOptions.map((icon) => (
                  <button
                    key={icon}
                    className={`icon-option ${formData.icon === icon ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, icon })}
                  >
                    <i className={`fas ${icon}`}></i>
                  </button>
                ))}
              </div>
            </div>
            <div className="form-actions">
              <button className="btn-primary" onClick={handleUpdate}>
                <i className="fas fa-save"></i> Update Category
              </button>
              <button className="btn-cancel" onClick={() => { setEditingId(null); setFormData({ id: '', label: '', icon: 'fa-tag' }); }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Categories Grid */}
      {filteredCategories.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-tags"></i>
          <h3>No categories found</h3>
          <p>Try adjusting your search or add a new category.</p>
        </div>
      ) : (
        <div className="categories-grid">
          {filteredCategories.map((cat) => {
            const count = getProductCount(cat.id);
            const color = getCategoryColor(cat.id);
            return (
              <div key={cat.id} className="category-card" style={{ borderLeftColor: color }}>
                <div className="category-icon" style={{ background: `${color}22`, color }}>
                  <i className={`fas ${cat.icon || 'fa-tag'}`}></i>
                </div>
                <div className="category-info">
                  <h4>{cat.label}</h4>
                  <div className="category-meta">
                    <span className="category-id">{cat.id}</span>
                    <span className="category-count">{count} product{count !== 1 ? 's' : ''}</span>
                  </div>
                </div>
                <div className="category-actions">
                  <button className="action-btn edit" onClick={() => handleEdit(cat)}>
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="action-btn delete" onClick={() => handleDelete(cat.id)}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        .admin-categories-page {
          padding: 8px 0;
        }

        .categories-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          margin-bottom: 24px;
          gap: 12px;
        }

        .categories-header h2 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #0b1a2e;
          margin: 0;
        }

        .categories-subtitle {
          color: #5a6e8b;
          margin: 4px 0 0;
          font-size: 0.95rem;
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
        }

        .btn-primary:hover {
          background: #1a3a5a;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(11,26,46,0.15);
        }

        .btn-cancel {
          background: transparent;
          border: 1.5px solid #dce4ee;
          color: #3a4e6b;
          padding: 8px 20px;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: 0.2s;
          font-family: inherit;
        }

        .btn-cancel:hover {
          background: #f0f4fa;
        }

        /* Toolbar */
        .categories-toolbar {
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

        .result-count {
          color: #5a6e8b;
          font-size: 0.9rem;
          white-space: nowrap;
        }

        /* Form Card */
        .category-form-card {
          background: #fff;
          border-radius: 12px;
          border: 1px solid #eef2f7;
          margin-bottom: 24px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
          animation: slideDown 0.3s ease;
        }

        .category-form-card.edit {
          border-color: #1a4a7a;
          box-shadow: 0 4px 20px rgba(26,74,122,0.08);
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 20px;
          background: #f8faff;
          border-bottom: 1px solid #eef2f7;
        }

        .form-header h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #0b1a2e;
          margin: 0;
        }

        .form-header h3 i {
          color: #1a4a7a;
          margin-right: 8px;
        }

        .close-form {
          background: none;
          border: none;
          color: #5a6e8b;
          cursor: pointer;
          font-size: 1.2rem;
          padding: 0 4px;
        }

        .close-form:hover {
          color: #0b1a2e;
        }

        .form-body {
          padding: 20px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-body .form-group:last-child {
          grid-column: 1 / -1;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .form-group label {
          font-weight: 600;
          font-size: 0.9rem;
          color: #0b1a2e;
        }

        .form-group label .required {
          color: #c0392b;
        }

        .form-group input {
          padding: 8px 12px;
          border-radius: 8px;
          border: 1.5px solid #dce4ee;
          font-family: inherit;
          font-size: 0.95rem;
          transition: 0.2s;
          background: #fff;
        }

        .form-group input:focus {
          outline: none;
          border-color: #1a4a7a;
          box-shadow: 0 0 0 3px rgba(26,74,122,0.08);
        }

        .form-group input.disabled {
          background: #f0f4fa;
          color: #5a6e8b;
          cursor: not-allowed;
        }

        .form-actions {
          grid-column: 1 / -1;
          display: flex;
          gap: 12px;
          padding-top: 8px;
          border-top: 1px solid #f0f4fa;
        }

        /* Icon Picker */
        .icon-picker {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .icon-option {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1.5px solid #dce4ee;
          background: #fff;
          cursor: pointer;
          transition: 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          color: #3a4e6b;
        }

        .icon-option:hover {
          border-color: #1a4a7a;
          background: #f0f4fa;
        }

        .icon-option.active {
          border-color: #1a4a7a;
          background: #1a4a7a;
          color: #fff;
        }

        /* Categories Grid */
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }

        .category-card {
          background: #fff;
          border-radius: 12px;
          border: 1px solid #eef2f7;
          border-left: 4px solid;
          padding: 16px 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          transition: 0.2s;
        }

        .category-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.04);
        }

        .category-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          flex-shrink: 0;
        }

        .category-info {
          flex: 1;
          min-width: 0;
        }

        .category-info h4 {
          font-size: 1rem;
          font-weight: 600;
          color: #0b1a2e;
          margin: 0;
        }

        .category-meta {
          display: flex;
          gap: 12px;
          margin-top: 2px;
          font-size: 0.75rem;
        }

        .category-id {
          color: #8a9eab;
          font-family: monospace;
        }

        .category-count {
          color: #1a4a7a;
          font-weight: 500;
        }

        .category-actions {
          display: flex;
          gap: 4px;
          flex-shrink: 0;
        }

        .action-btn {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          transition: 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
        }

        .action-btn.edit {
          background: #e8edf5;
          color: #1a4a7a;
        }

        .action-btn.edit:hover {
          background: #1a4a7a;
          color: #fff;
        }

        .action-btn.delete {
          background: #fde8e5;
          color: #c0392b;
        }

        .action-btn.delete:hover {
          background: #c0392b;
          color: #fff;
        }

        /* Empty State */
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
        }

        /* Responsive */
        @media (max-width: 640px) {
          .categories-header {
            flex-direction: column;
            align-items: stretch;
          }

          .categories-header .btn-primary {
            width: 100%;
            justify-content: center;
          }

          .categories-toolbar {
            flex-direction: column;
            align-items: stretch;
          }

          .search-wrapper {
            min-width: auto;
          }

          .form-body {
            grid-template-columns: 1fr;
          }

          .form-actions {
            flex-direction: column;
          }

          .categories-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminCategories;