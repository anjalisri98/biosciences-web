import React from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const AdminDashboard = () => {
  const { products, categories } = useAdmin();

  // Stats calculations
  const totalProducts = products.length;
  const totalCategories = categories.length;
  const inStock = products.filter(p => p.inStock).length;
  const outOfStock = products.filter(p => !p.inStock).length;
  const recentProducts = products.slice(-5).reverse();

  // Quick stats array
  const stats = [
    {
      label: 'Total Products',
      value: totalProducts,
      icon: 'fa-boxes',
      color: '#4a6fa5',
      bg: 'rgba(74, 111, 165, 0.12)',
      change: '+12%',
      trend: 'up',
    },
    {
      label: 'Categories',
      value: totalCategories,
      icon: 'fa-tags',
      color: '#2a9d8f',
      bg: 'rgba(42, 157, 143, 0.12)',
      change: '+2',
      trend: 'up',
    },
    {
      label: 'In Stock',
      value: inStock,
      icon: 'fa-check-circle',
      color: '#2a8a5a',
      bg: 'rgba(42, 138, 90, 0.12)',
      change: `${Math.round((inStock / (totalProducts || 1)) * 100)}%`,
      trend: 'up',
    },
    {
      label: 'Out of Stock',
      value: outOfStock,
      icon: 'fa-times-circle',
      color: '#c0392b',
      bg: 'rgba(192, 57, 43, 0.12)',
      change: `${Math.round((outOfStock / (totalProducts || 1)) * 100)}%`,
      trend: 'down',
    },
  ];

  // Quick actions
  const quickActions = [
    { label: 'Add Product', icon: 'fa-plus-circle', path: '/admin/products/new', color: '#1a4a7a' },
    { label: 'View Products', icon: 'fa-eye', path: '/admin/products', color: '#2a9d8f' },
    { label: 'Manage Categories', icon: 'fa-tags', path: '/admin/categories', color: '#e9c46a' },
    { label: 'Edit Pages', icon: 'fa-file-alt', path: '/admin/pages', color: '#f4a261' },
  ];

  // Activity feed (mock data)
  const activities = [
    { type: 'product', message: 'New product "API Intermediates" added', time: '2 hours ago', icon: 'fa-plus', color: '#2a9d8f' },
    { type: 'product', message: 'Product "Herbicide" updated', time: '5 hours ago', icon: 'fa-edit', color: '#e9c46a' },
    { type: 'category', message: 'Category "Biotechnology" added', time: '1 day ago', icon: 'fa-tag', color: '#4a6fa5' },
    { type: 'product', message: 'Product "HPLC Solvents" stock updated', time: '2 days ago', icon: 'fa-sync', color: '#f4a261' },
  ];

  return (
    <div className="dashboard">
      {/* Welcome Header */}
      <div className="dashboard-header">
        <div>
          <h2>👋 Welcome back, Admin</h2>
          <p className="dashboard-subtitle">
            Here's what's happening with your store today.
          </p>
        </div>
        <div className="dashboard-actions">
          <button className="btn-outline" onClick={() => window.location.reload()}>
            <i className="fas fa-sync-alt"></i> Refresh
          </button>
          <Link to="/admin/products/new" className="btn-primary">
            <i className="fas fa-plus"></i> New Product
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card" style={{ borderLeft: `4px solid ${stat.color}` }}>
            <div className="stat-left">
              <div className="stat-icon" style={{ background: stat.bg, color: stat.color }}>
                <i className={`fas ${stat.icon}`}></i>
              </div>
              <div className="stat-info">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
            <div className="stat-right">
              <span className={`stat-change ${stat.trend}`}>
                <i className={`fas fa-arrow-${stat.trend === 'up' ? 'up' : 'down'}`}></i>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="dashboard-grid">
        {/* Left: Quick Actions + Activity */}
        <div className="dashboard-left">
          {/* Quick Actions */}
          <div className="card">
            <div className="card-header">
              <h3><i className="fas fa-bolt"></i> Quick Actions</h3>
            </div>
            <div className="quick-actions-grid">
              {quickActions.map((action) => (
                <Link key={action.label} to={action.path} className="quick-action" style={{ borderColor: action.color }}>
                  <div className="qa-icon" style={{ background: `${action.color}22`, color: action.color }}>
                    <i className={`fas ${action.icon}`}></i>
                  </div>
                  <span>{action.label}</span>
                  <i className="fas fa-chevron-right qa-arrow" style={{ color: action.color }}></i>
                </Link>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="card">
            <div className="card-header">
              <h3><i className="fas fa-clock"></i> Recent Activity</h3>
              <button className="view-all">View All <i className="fas fa-arrow-right"></i></button>
            </div>
            <div className="activity-feed">
              {activities.map((act, idx) => (
                <div key={idx} className="activity-item">
                  <div className="activity-icon" style={{ background: `${act.color}22`, color: act.color }}>
                    <i className={`fas ${act.icon}`}></i>
                  </div>
                  <div className="activity-content">
                    <p>{act.message}</p>
                    <span className="activity-time">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Recent Products */}
        <div className="dashboard-right">
          <div className="card">
            <div className="card-header">
              <h3><i className="fas fa-list"></i> Recent Products</h3>
              <Link to="/admin/products" className="view-all">View All <i className="fas fa-arrow-right"></i></Link>
            </div>
            <div className="recent-products">
              {recentProducts.length === 0 ? (
                <div className="empty-state">
                  <i className="fas fa-box-open"></i>
                  <p>No products yet. Start by adding your first product!</p>
                  <Link to="/admin/products/new" className="btn-primary">Add Product</Link>
                </div>
              ) : (
                recentProducts.map((p) => (
                  <div key={p.id} className="recent-product">
                    <div className="rp-info">
                      <div className="rp-avatar" style={{ background: p.color || '#1a4a7a' }}>
                        {p.image ? (
                          <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                        ) : (
                          <i className={`fas ${p.icon || 'fa-cube'}`}></i>
                        )}
                      </div>
                      <div className="rp-details">
                        <div className="rp-name">{p.name}</div>
                        <div className="rp-meta">
                          <span className="rp-grade">{p.grade}</span>
                          <span className={`rp-stock ${p.inStock ? 'in' : 'out'}`}>
                            {p.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link to={`/admin/products/edit/${p.id}`} className="rp-edit">
                      <i className="fas fa-edit"></i>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Stats Chart (simple bar) */}
          <div className="card">
            <div className="card-header">
              <h3><i className="fas fa-chart-bar"></i> Stock Overview</h3>
            </div>
            <div className="stock-chart">
              <div className="chart-bar">
                <div className="bar-label">In Stock</div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${(inStock / (totalProducts || 1)) * 100}%`, background: '#2a9d8f' }}></div>
                </div>
                <div className="bar-value">{inStock}</div>
              </div>
              <div className="chart-bar">
                <div className="bar-label">Out of Stock</div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${(outOfStock / (totalProducts || 1)) * 100}%`, background: '#c0392b' }}></div>
                </div>
                <div className="bar-value">{outOfStock}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Dashboard Layout */
        .dashboard {
          padding: 8px 0;
        }

        /* Header */
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 28px;
          gap: 16px;
        }

        .dashboard-header h2 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #0b1a2e;
          margin: 0;
        }

        .dashboard-subtitle {
          color: #5a6e8b;
          margin: 4px 0 0;
          font-size: 0.95rem;
        }

        .dashboard-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-outline {
          background: transparent;
          border: 1.5px solid #dce4ee;
          color: #3a4e6b;
          padding: 8px 18px;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: 0.2s;
          font-family: inherit;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
        }

        .btn-outline:hover {
          background: #f0f4fa;
          border-color: #b0c0d0;
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

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 28px;
        }

        .stat-card {
          background: #fff;
          border-radius: 16px;
          padding: 18px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
          border: 1px solid #eef2f7;
          transition: 0.2s;
        }

        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.04);
        }

        .stat-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: #0b1a2e;
          line-height: 1.2;
        }

        .stat-label {
          font-size: 0.85rem;
          color: #5a6e8b;
          font-weight: 500;
        }

        .stat-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .stat-change {
          font-size: 0.8rem;
          font-weight: 600;
          padding: 2px 10px;
          border-radius: 20px;
          background: #f0f4fa;
        }

        .stat-change.up {
          color: #2a9d8f;
          background: #e6f4f0;
        }

        .stat-change.down {
          color: #c0392b;
          background: #fde8e5;
        }

        .stat-change i {
          margin-right: 4px;
        }

        /* Dashboard Grid */
        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .dashboard-left,
        .dashboard-right {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Cards */
        .card {
          background: #fff;
          border-radius: 16px;
          border: 1px solid #eef2f7;
          padding: 20px 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .card-header h3 {
          font-size: 1.05rem;
          font-weight: 600;
          color: #0b1a2e;
          margin: 0;
        }

        .card-header h3 i {
          color: #1a4a7a;
          margin-right: 8px;
        }

        .view-all {
          font-size: 0.8rem;
          color: #1a4a7a;
          font-weight: 500;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: 0.2s;
        }

        .view-all:hover {
          color: #0b1a2e;
          gap: 8px;
        }

        /* Quick Actions */
        .quick-actions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .quick-action {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: #f8faff;
          border-radius: 12px;
          border-left: 3px solid;
          text-decoration: none;
          transition: 0.2s;
          color: #0b1a2e;
        }

        .quick-action:hover {
          background: #eef2f7;
          transform: translateX(4px);
        }

        .qa-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }

        .quick-action span {
          flex: 1;
          font-weight: 500;
          font-size: 0.9rem;
        }

        .qa-arrow {
          font-size: 0.7rem;
          opacity: 0.6;
        }

        /* Activity Feed */
        .activity-feed {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 8px 0;
          border-bottom: 1px solid #f0f4fa;
        }

        .activity-item:last-child {
          border-bottom: none;
        }

        .activity-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .activity-content {
          flex: 1;
        }

        .activity-content p {
          margin: 0;
          font-size: 0.9rem;
          color: #1d2e44;
        }

        .activity-time {
          font-size: 0.75rem;
          color: #8a9eab;
        }

        /* Recent Products */
        .recent-products {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .recent-product {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #f0f4fa;
        }

        .recent-product:last-child {
          border-bottom: none;
        }

        .rp-info {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .rp-avatar {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 1.2rem;
          flex-shrink: 0;
          overflow: hidden;
        }

        .rp-details {
          display: flex;
          flex-direction: column;
        }

        .rp-name {
          font-weight: 600;
          color: #0b1a2e;
          font-size: 0.95rem;
        }

        .rp-meta {
          display: flex;
          gap: 8px;
          align-items: center;
          margin-top: 2px;
        }

        .rp-grade {
          font-size: 0.7rem;
          padding: 1px 10px;
          background: #eef2f7;
          border-radius: 20px;
          color: #3a4e6b;
          font-weight: 500;
        }

        .rp-stock {
          font-size: 0.7rem;
          font-weight: 600;
        }

        .rp-stock.in {
          color: #2a9d8f;
        }

        .rp-stock.out {
          color: #c0392b;
        }

        .rp-edit {
          color: #5a6e8b;
          transition: 0.2s;
          font-size: 0.9rem;
        }

        .rp-edit:hover {
          color: #0b1a2e;
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 30px 10px;
        }

        .empty-state i {
          font-size: 2.5rem;
          color: #dce4ee;
          margin-bottom: 12px;
        }

        .empty-state p {
          color: #5a6e8b;
          margin-bottom: 16px;
        }

        /* Stock Chart */
        .stock-chart {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .chart-bar {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .bar-label {
          font-size: 0.85rem;
          color: #3a4e6b;
          width: 80px;
          font-weight: 500;
          flex-shrink: 0;
        }

        .bar-track {
          flex: 1;
          height: 8px;
          background: #eef2f7;
          border-radius: 10px;
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          border-radius: 10px;
          transition: width 0.6s ease;
        }

        .bar-value {
          font-size: 0.85rem;
          font-weight: 600;
          color: #0b1a2e;
          width: 40px;
          text-align: right;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .dashboard-header {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }

          .dashboard-actions {
            justify-content: stretch;
          }

          .dashboard-actions .btn-primary,
          .dashboard-actions .btn-outline {
            flex: 1;
            justify-content: center;
          }

          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }

          .quick-actions-grid {
            grid-template-columns: 1fr;
          }

          .stat-card {
            padding: 14px 16px;
          }

          .stat-value {
            font-size: 1.4rem;
          }

          .card {
            padding: 16px 18px;
          }

          .dashboard-header h2 {
            font-size: 1.4rem;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .chart-bar {
            flex-wrap: wrap;
          }

          .bar-label {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;