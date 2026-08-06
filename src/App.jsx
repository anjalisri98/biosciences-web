import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminProvider, useAdmin } from './context/AdminContext';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminProducts from './admin/AdminProducts';
import AdminProductForm from './admin/AdminProductForm';
import AdminCategories from './admin/AdminCategories';
import AdminPages from './admin/AdminPages';

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAdmin();
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<><Navbar /><HomePage /><Footer /></>} />
      <Route path="/products" element={<><Navbar /><ProductsPage /><Footer /></>} />
      <Route path="/about" element={<><Navbar /><AboutPage /><Footer /></>} />
      <Route path="/contact" element={<><Navbar /><ContactPage /><Footer /></>} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/new" element={<AdminProductForm />} />
        <Route path="products/edit/:id" element={<AdminProductForm />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="pages" element={<AdminPages />} />
      </Route>
    </Routes>
  );
};

const App = () => {
  return (
    <AdminProvider>
      <AppRoutes />
    </AdminProvider>
  );
};

export default App;