import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.css"; 
import "./styles/Admin.css"; 

// Import all public pages
import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import Products from "./components/Products";
import Events from "./components/Events";
import Contact from "./components/Contact";

// 👈 ADD THIS IMPORT: The new standalone Submit Event page
import SubmitEvent from "./components/SubmitEvent"; 

// Import Admin pages
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (isAuthenticated) {
    return <AdminDashboard onLogout={() => setIsAuthenticated(false)} />;
  }

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
          
          {/* 👈 ADD THIS ROUTE HERE */}
          <Route path="submit-event" element={<SubmitEvent />} />
        </Route>

        {/* --- ADMIN ROUTE --- */}
        <Route 
          path="/admin" 
          element={<AdminLogin onLogin={() => setIsAuthenticated(true)} />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;