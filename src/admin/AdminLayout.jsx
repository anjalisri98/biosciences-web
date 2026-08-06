import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const AdminLayout = () => {
  const { logout } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: 'fa-tachometer-alt' },
    { path: '/admin/products', label: 'Products', icon: 'fa-boxes' },
    { path: '/admin/categories', label: 'Categories', icon: 'fa-tags' },
    { path: '/admin/pages', label: 'Pages', icon: 'fa-file-alt' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
        {/* Logo Area */}
        <div className="sidebar-header">
          <div className="logo">
            <i className="fas fa-flask"></i>
            {!collapsed && <span>Crest Admin</span>}
          </div>
          <button className="collapse-btn" onClick={toggleSidebar}>
            <i className={`fas ${collapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
          </button>
        </div>

        {/* User Profile */}
        {!collapsed && (
          <div className="user-profile">
            <div className="avatar">
              <i className="fas fa-user-circle"></i>
            </div>
            <div className="user-info">
              <div className="user-name">Admin</div>
              <div className="user-role">Administrator</div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onMouseEnter={() => setHoveredItem(item.path)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <i className={`fas ${item.icon}`}></i>
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && location.pathname === item.path && (
                <span className="nav-indicator"></span>
              )}
              {collapsed && hoveredItem === item.path && (
                <div className="tooltip">{item.label}</div>
              )}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`admin-main ${collapsed ? 'expanded' : ''}`}>
        <div className="admin-header">
          <h1>
            {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
          </h1>
          <div className="admin-user">
            <i className="fas fa-user-circle"></i>
            <span>Admin</span>
          </div>
        </div>
        <Outlet />
      </main>

      <style>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background: #f0f4f8;
        }

        /* Sidebar */
        .admin-sidebar {
          width: 260px;
          background: #0b1a2e;
          color: #fff;
          padding: 0;
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          overflow-y: auto;
          transition: width 0.3s ease, transform 0.3s ease;
          z-index: 100;
          display: flex;
          flex-direction: column;
          box-shadow: 4px 0 20px rgba(0,0,0,0.1);
        }

        .admin-sidebar.collapsed {
          width: 72px;
        }

        .admin-sidebar::-webkit-scrollbar {
          width: 4px;
        }

        .admin-sidebar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
        }

        .admin-sidebar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.15);
          border-radius: 4px;
        }

        /* Sidebar Header */
        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 18px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          min-height: 72px;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.4rem;
          font-weight: 800;
          color: #fff;
          white-space: nowrap;
        }

        .logo i {
          color: #7a9bcb;
          font-size: 1.6rem;
        }

        .collapse-btn {
          background: rgba(255,255,255,0.06);
          border: none;
          color: #7a9bcb;
          width: 28px;
          height: 28px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.2s;
          font-size: 0.9rem;
        }

        .collapse-btn:hover {
          background: rgba(255,255,255,0.12);
          color: #fff;
        }

        /* User Profile */
        .user-profile {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
        }

        .avatar {
          font-size: 2.2rem;
          color: #7a9bcb;
          line-height: 1;
        }

        .user-info {
          flex: 1;
          min-width: 0;
        }

        .user-name {
          font-weight: 600;
          font-size: 0.95rem;
          color: #fff;
        }

        .user-role {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.4);
        }

        /* Navigation */
        .sidebar-nav {
          flex: 1;
          padding: 12px 10px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 10px 14px;
          border-radius: 10px;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: all 0.2s ease;
          position: relative;
          font-weight: 500;
          font-size: 0.95rem;
          white-space: nowrap;
        }

        .nav-item i {
          width: 20px;
          text-align: center;
          font-size: 1.1rem;
          flex-shrink: 0;
          transition: 0.2s;
        }

        .nav-item:hover {
          background: rgba(255,255,255,0.06);
          color: #fff;
        }

        .nav-item.active {
          background: rgba(122,155,203,0.12);
          color: #fff;
          box-shadow: inset 3px 0 0 #7a9bcb;
        }

        .nav-item.active i {
          color: #7a9bcb;
        }

        .nav-indicator {
          margin-left: auto;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #7a9bcb;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        /* Tooltip for collapsed state */
        .nav-item .tooltip {
          position: absolute;
          left: 60px;
          top: 50%;
          transform: translateY(-50%);
          background: #0b1a2e;
          color: #fff;
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 500;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          z-index: 10;
          animation: fadeIn 0.2s ease;
        }

        .nav-item .tooltip::before {
          content: '';
          position: absolute;
          left: -6px;
          top: 50%;
          transform: translateY(-50%);
          border: 6px solid transparent;
          border-right-color: #0b1a2e;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-50%) scale(0.95); }
          to { opacity: 1; transform: translateY(-50%) scale(1); }
        }

        /* Sidebar Footer */
        .sidebar-footer {
          padding: 16px 10px;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin-top: auto;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
          padding: 10px 14px;
          border-radius: 10px;
          background: none;
          border: none;
          color: rgba(255,255,255,0.4);
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: 0.2s;
          font-family: inherit;
        }

        .logout-btn:hover {
          background: rgba(255,255,255,0.06);
          color: #e74c3c;
        }

        .logout-btn i {
          width: 20px;
          text-align: center;
          font-size: 1.1rem;
        }

        /* Main Content */
        .admin-main {
          margin-left: 260px;
          flex: 1;
          padding: 28px 32px;
          transition: margin-left 0.3s ease;
        }

        .admin-main.expanded {
          margin-left: 72px;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
        }

        .admin-header h1 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #0b1a2e;
          margin: 0;
        }

        .admin-user {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #3a4e6b;
          font-weight: 500;
          background: #fff;
          padding: 6px 16px 6px 12px;
          border-radius: 40px;
          border: 1px solid #eef2f7;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }

        .admin-user i {
          font-size: 1.6rem;
          color: #7a9bcb;
        }

        /* Responsive */
        @media (max-width: 820px) {
          .admin-sidebar {
            transform: translateX(-100%);
            width: 260px;
          }

          .admin-sidebar.open {
            transform: translateX(0);
          }

          .admin-main {
            margin-left: 0;
          }

          .admin-main.expanded {
            margin-left: 0;
          }

          /* Add mobile toggle button */
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;