import React, { createContext, useState, useContext, useEffect } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([
    { id: 'pharma', label: 'Pharma Intermediates', icon: 'fa-capsules' },
    { id: 'agro', label: 'Agrochemicals', icon: 'fa-seedling' },
    { id: 'solvents', label: 'Specialty Solvents', icon: 'fa-flask' },
    { id: 'acids', label: 'Organic Acids', icon: 'fa-atom' },
    { id: 'polymers', label: 'Polymer Additives', icon: 'fa-cubes' },
    { id: 'biotech', label: 'Biotechnology', icon: 'fa-dna' },
    { id: 'industrial', label: 'Industrial Chemicals', icon: 'fa-industry' },
  ]);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedProducts = localStorage.getItem('admin_products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      // Seed with default products from your existing data
      // Default product with new fields
const defaultProducts = [
  {
    id: 1,
    name: 'API Intermediates',
    category: 'pharma',
    grade: '99.9%',
    purity: '≥ 99.5%',
    cas: 'CAS 123-45-6',
    description: 'High-purity active pharmaceutical ingredients intermediates...',
    applications: ['Tablet Formulation', 'Capsule Production', 'Injectable Drugs'],
    packaging: ['25kg Drums', '100kg Fibre Drums', '500kg IBC Totes'],
    icon: 'fa-capsules',
    color: '#1a4a7a',
    inStock: true,
    image: '', // will store base64 or URL
    cataloguePdf: '', // base64 or URL
    msdsPdf: '', // base64 or URL
  }
];
      setProducts(defaultProducts);
      localStorage.setItem('admin_products', JSON.stringify(defaultProducts));
    }

    // Check if admin is logged in
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('admin_products', JSON.stringify(products));
    }
  }, [products]);

  const login = (username, password) => {
    // Hardcoded credentials for demo
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  // Product CRUD
  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now() };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      categories,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);