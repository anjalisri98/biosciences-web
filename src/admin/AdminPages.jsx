import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminPages = () => {
  const [pages, setPages] = useState([
    {
      id: 'home',
      title: 'Home',
      status: 'published',
      lastUpdated: '2024-01-15T10:30:00',
      path: '/',
      description: 'Main landing page with hero, products, and company overview.'
    },
    {
      id: 'about',
      title: 'About Us',
      status: 'published',
      lastUpdated: '2024-01-14T14:20:00',
      path: '/about',
      description: 'Company history, mission, values, and team information.'
    },
    {
      id: 'products',
      title: 'Products',
      status: 'published',
      lastUpdated: '2024-01-16T09:15:00',
      path: '/products',
      description: 'Complete product catalog with categories and details.'
    },
    {
      id: 'contact',
      title: 'Contact',
      status: 'draft',
      lastUpdated: '2024-01-12T16:45:00',
      path: '/contact',
      description: 'Contact form, office address, and support information.'
    },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', path: '', description: '', status: 'draft' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPages = pages.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.path.includes(searchTerm.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    if (!formData.title || !formData.path) return;
    const newPage = {
      id: formData.path.replace(/^\/+|\/+$/g, '').replace(/\//g, '-') || `page-${Date.now()}`,
      title: formData.title,
      path: formData.path.startsWith('/') ? formData.path : `/${formData.path}`,
      description: formData.description,
      status: formData.status,
      lastUpdated: new Date().toISOString(),
    };
    setPages([...pages, newPage]);
    setFormData({ title: '', path: '', description: '', status: 'draft' });
    setShowAddForm(false);
    alert(`Page "${newPage.title}" created successfully!`);
  };

  const handleEdit = (page) => {
    setEditingId(page.id);
    setFormData({
      title: page.title,
      path: page.path,
      description: page.description || '',
      status: page.status,
    });
  };

  const handleUpdate = () => {
    if (!formData.title || !formData.path) return;
    setPages(pages.map(p =>
      p.id === editingId
        ? {
            ...p,
            title: formData.title,
            path: formData.path.startsWith('/') ? formData.path : `/${formData.path}`,
            description: formData.description,
            status: formData.status,
            lastUpdated: new Date().toISOString(),
          }
        : p
    ));
    setEditingId(null);
    setFormData({ title: '', path: '', description: '', status: 'draft' });
    alert('Page updated successfully!');
  };

  const handleDelete = (id) => {
    const page = pages.find(p => p.id === id);
    if (window.confirm(`Delete page "${page?.title}"? This action cannot be undone.`)) {
      setPages(pages.filter(p => p.id !== id));
      alert(`Page "${page?.title}" deleted!`);
    }
  };

  const handleToggleStatus = (id) => {
    setPages(pages.map(p =>
      p.id === id
        ? { ...p, status: p.status === 'published' ? 'draft' : 'published', lastUpdated: new Date().toISOString() }
        : p
    ));
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="admin-pages-page">
      {/* Header */}
      <div className="pages-header">
        <div>
          <h2>📄 Pages</h2>
          <p className="pages-subtitle">
            {pages.length} pages • {pages.filter(p => p.status === 'published').length} published
          </p>
        </div>
        <button className="btn-primary" onClick={() => setShowAddForm(true)}>
          <i className="fas fa-plus"></i> Add Page
        </button>
      </div>

      {/* Search */}
      <div className="pages-toolbar">
        <div className="search-wrapper">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search pages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
        <span className="result-count">{filteredPages.length} pages</span>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="page-form-card">
          <div className="form-header">
            <h3><i className="fas fa-plus-circle"></i> New Page</h3>
            <button className="close-form" onClick={() => setShowAddForm(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="form-body">
            <div className="form-group">
              <label>Page Title <span className="required">*</span></label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Our Story"
              />
            </div>
            <div className="form-group">
              <label>URL Path <span className="required">*</span></label>
              <input
                type="text"
                value={formData.path}
                onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                placeholder="e.g., /story or /about-us"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the page"
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="form-actions">
              <button className="btn-primary" onClick={handleAdd}>
                <i className="fas fa-check"></i> Create Page
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
        <div className="page-form-card edit">
          <div className="form-header">
            <h3><i className="fas fa-edit"></i> Edit Page</h3>
            <button className="close-form" onClick={() => { setEditingId(null); setFormData({ title: '', path: '', description: '', status: 'draft' }); }}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="form-body">
            <div className="form-group">
              <label>Page Title <span className="required">*</span></label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>URL Path <span className="required">*</span></label>
              <input
                type="text"
                value={formData.path}
                onChange={(e) => setFormData({ ...formData, path: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="form-actions">
              <button className="btn-primary" onClick={handleUpdate}>
                <i className="fas fa-save"></i> Update Page
              </button>
              <button className="btn-cancel" onClick={() => { setEditingId(null); setFormData({ title: '', path: '', description: '', status: 'draft' }); }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pages Table */}
      {filteredPages.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-file-alt"></i>
          <h3>No pages found</h3>
          <p>Try adjusting your search or create a new page.</p>
        </div>
      ) : (
        <div className="pages-table-wrapper">
          <table className="pages-table">
            <thead>
              <tr>
                <th>Page</th>
                <th>Path</th>
                <th>Status</th>
                <th>Last Updated</th>
                <th className="actions-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPages.map((page) => (
                <tr key={page.id}>
                  <td>
                    <div className="page-info">
                      <div className="page-icon">
                        <i className={`fas ${page.id === 'home' ? 'fa-home' :
                                       page.id === 'about' ? 'fa-info-circle' :
                                       page.id === 'products' ? 'fa-boxes' :
                                       page.id === 'contact' ? 'fa-envelope' :
                                       'fa-file-alt'}`}></i>
                      </div>
                      <div>
                        <div className="page-title">{page.title}</div>
                        {page.description && (
                          <div className="page-description">{page.description}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="path-col">
                    <code>{page.path}</code>
                  </td>
                  <td>
                    <button
                      className={`status-badge ${page.status}`}
                      onClick={() => handleToggleStatus(page.id)}
                    >
                      <i className={`fas ${page.status === 'published' ? 'fa-check-circle' : 'fa-pen-fancy'}`}></i>
                      {page.status === 'published' ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="date-col">
                    <span className="date-time">{formatDate(page.lastUpdated)}</span>
                  </td>
                  <td className="actions-col">
                    <Link to={page.path} target="_blank" className="action-btn view">
                      <i className="fas fa-eye"></i>
                    </Link>
                    <button className="action-btn edit" onClick={() => handleEdit(page)}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="action-btn delete" onClick={() => handleDelete(page.id)}>
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        .admin-pages-page {
          padding: 8px 0;
        }

        .pages-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          margin-bottom: 24px;
          gap: 12px;
        }

        .pages-header h2 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #0b1a2e;
          margin: 0;
        }

        .pages-subtitle {
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
          text-decoration: none;
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
        .pages-toolbar {
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
        .page-form-card {
          background: #fff;
          border-radius: 12px;
          border: 1px solid #eef2f7;
          margin-bottom: 24px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
          animation: slideDown 0.3s ease;
        }

        .page-form-card.edit {
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

        .form-group input,
        .form-group select {
          padding: 8px 12px;
          border-radius: 8px;
          border: 1.5px solid #dce4ee;
          font-family: inherit;
          font-size: 0.95rem;
          transition: 0.2s;
          background: #fff;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #1a4a7a;
          box-shadow: 0 0 0 3px rgba(26,74,122,0.08);
        }

        .form-actions {
          grid-column: 1 / -1;
          display: flex;
          gap: 12px;
          padding-top: 8px;
          border-top: 1px solid #f0f4fa;
        }

        /* Table */
        .pages-table-wrapper {
          background: #fff;
          border-radius: 12px;
          border: 1px solid #eef2f7;
          overflow: auto;
        }

        .pages-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95rem;
        }

        .pages-table thead {
          background: #f8faff;
        }

        .pages-table th {
          padding: 12px 16px;
          text-align: left;
          font-weight: 600;
          color: #0b1a2e;
          border-bottom: 1px solid #eef2f7;
        }

        .pages-table td {
          padding: 12px 16px;
          border-bottom: 1px solid #f0f4fa;
          vertical-align: middle;
        }

        .pages-table tbody tr:hover {
          background: #f8faff;
        }

        .page-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .page-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: #e8edf5;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a4a7a;
          flex-shrink: 0;
        }

        .page-title {
          font-weight: 600;
          color: #0b1a2e;
        }

        .page-description {
          font-size: 0.8rem;
          color: #5a6e8b;
        }

        .path-col code {
          background: #f0f4fa;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.85rem;
          color: #1a4a7a;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: 0.2s;
          font-family: inherit;
        }

        .status-badge.published {
          background: #e6f4f0;
          color: #2a9d8f;
        }

        .status-badge.published:hover {
          background: #c5e8e0;
        }

        .status-badge.draft {
          background: #f0f0f0;
          color: #5a6e8b;
        }

        .status-badge.draft:hover {
          background: #e0e0e0;
        }

        .date-col {
          white-space: nowrap;
        }

        .date-time {
          font-size: 0.85rem;
          color: #5a6e8b;
        }

        .actions-col {
          white-space: nowrap;
          text-align: right;
          width: 120px;
        }

        .action-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px 8px;
          font-size: 0.95rem;
          transition: 0.2s;
          border-radius: 4px;
        }

        .action-btn.view {
          color: #1a4a7a;
        }

        .action-btn.view:hover {
          background: #e8edf5;
        }

        .action-btn.edit {
          color: #2a9d8f;
        }

        .action-btn.edit:hover {
          background: #e6f4f0;
        }

        .action-btn.delete {
          color: #c0392b;
        }

        .action-btn.delete:hover {
          background: #fde8e5;
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
        @media (max-width: 820px) {
          .pages-table th,
          .pages-table td {
            padding: 8px 10px;
            font-size: 0.85rem;
          }

          .actions-col {
            width: 90px;
          }
        }

        @media (max-width: 640px) {
          .pages-header {
            flex-direction: column;
            align-items: stretch;
          }

          .pages-header .btn-primary {
            width: 100%;
            justify-content: center;
          }

          .pages-toolbar {
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

          .pages-table {
            font-size: 0.8rem;
          }

          .pages-table th,
          .pages-table td {
            padding: 6px 8px;
          }

          .page-description {
            display: none;
          }

          .date-col {
            display: none;
          }

          .actions-col {
            width: 70px;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminPages;