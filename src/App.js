import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.css"; // Your public website CSS
import "./styles/Admin.css"; // 👈 ADD THIS LINE to import your new Admin CSS

// Import all public pages
import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import Products from "./components/Products";
import Events from "./components/Events";
import Contact from "./components/Contact";

// Import Admin pages (Create these in src/components/)
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  // 1. Add a state to track if the Admin is logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 2. If logged in, show the Admin Dashboard completely separate from the public layout
  if (isAuthenticated) {
    return <AdminDashboard onLogout={() => setIsAuthenticated(false)} />;
  }

  // 3. Otherwise, show the public routes and the Admin Login page
  return (
    <BrowserRouter>
      <Routes>
        {/* --- PUBLIC WEBSITE ROUTES --- */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="events" element={<Events />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* --- ADMIN ROUTE --- */}
        {/* The user will go to www.yoursite.com/admin to access login */}
        <Route 
          path="/admin" 
          element={<AdminLogin onLogin={() => setIsAuthenticated(true)} />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 