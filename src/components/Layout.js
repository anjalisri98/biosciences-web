// import React, { useState } from "react";
// import { Link, Outlet } from "react-router-dom";

// function Layout() {
//   // 1. Add state to toggle mobile menu
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <div className="App">
//       {/* --- NAVBAR --- */}
//       <nav className="navbar container">
//         <div className="logo">
//           <img
//             src="/logo_cb.png"
//             alt="Logo"
//             style={{ height: "40px", marginRight: "10px" }}
//           />
//           <span
//             style={{ color: "#002D5A", fontWeight: "bold", fontSize: "1.4rem" }}
//           >
//             CREST
//           </span>
//           <span
//             style={{
//               color: "#0AA5AD",
//               fontWeight: "normal",
//               fontSize: "1.4rem",
//               fontWeight: "bold",
//             }}
//           >
//             &nbsp;BIOSCIENTIFIC
//           </span>
//         </div>

//         {/* 2. Add the mobile hamburger button */}
//         {/* <button
//           className="menu-toggle-btn"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
//         </button> */}

//         {/* 3. Conditionally add 'open' class to the links */}
//         <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
//           <li>
//             <Link to="/" onClick={() => setIsMenuOpen(false)}>
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link to="/about" onClick={() => setIsMenuOpen(false)}>
//               About Us
//             </Link>
//           </li>
//           <li>
//             <Link to="/products" onClick={() => setIsMenuOpen(false)}>
//               Products ▾
//             </Link>
//           </li>
//           <li>
//             <Link to="/downloads" onClick={() => setIsMenuOpen(false)}>
//               Downloads
//             </Link>
//           </li>
//           <li>
//             <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
//               Contact Us
//             </Link>
//           </li>
//           {/* <li className="search-icon">
//             <i className="fas fa-search"></i>
//           </li> */}
//           <li>
//             {/* <Link
//               to="/inquiry"
//               className="btn-primary"
//               style={{ padding: "10px 20px" }}
//             >
//               INQUIRY NOW
//             </Link> */}
//           </li>
//         </ul>
//       </nav>

//       {/* 4. Where actual page content (Home, About, etc.) gets loaded */}
//       <Outlet />

//       {/* --- FOOTER --- */}
//       <footer>
//         <div className="container">
//           <div className="footer-grid">
//             <div className="footer-col">
//               <div
//                 className="logo"
//                 style={{ color: "white", marginBottom: "15px" }}
//               >
//                 {/* <img
//                   src="/logo_cb.png"
//                   alt="Logo"
//                   style={{ height: "25px", marginRight: "10px" }}
//                 /> */}
//                 CREST&nbsp;
//                 <span style={{ fontWeight: "normal" }}>BIOSCIENTIFIC</span>
//               </div>
//               <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
//                 Delivering high performance chemicals worldwide.
//               </p>
//             </div>
//             <div className="footer-col">
//               <h4>Quick Links</h4>
//               <ul>
//                 <li>
//                   <Link to="/">Home</Link>
//                 </li>
//                 <li>
//                   <Link to="/about">About Us</Link>
//                 </li>
//                 <li>
//                   <Link to="/contact">Contact</Link>
//                 </li>
//               </ul>
//             </div>
//             <div className="footer-col">
//               <h4>Contact Us</h4>
//               <ul>
//                 <li>
//                   <i className="fas fa-map-marker-alt"></i> 123, Industrial
//                   Area, Mumbai
//                 </li>
//                 <li>
//                   <i className="fas fa-phone"></i> +91 98765 43210
//                 </li>
//                 <li>
//                   <i className="fas fa-envelope"></i> info@namechemicals.com
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default Layout;
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false); // For mobile dropdown

  return (
    <div className="App">
      {/* --- NAVBAR --- */}
      <nav className="navbar container">
        <div className="logo">
          <img src="/logo_cb.png" alt="Logo" style={{ height: "40px", marginRight: "10px" }} />
          <span style={{ color: "#002D5A", fontWeight: "bold", fontSize: "1.4rem" }}>CREST</span>
          <span style={{ color: "#0AA5AD", fontWeight: "normal", fontSize: "1.4rem", fontWeight: "bold" }}>&nbsp;BIOSCIENTIFIC</span>
        </div>

        {/* Hamburger Button - Visible only on mobile due to CSS */}
        <button className="menu-toggle-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </button>

        {/* Nav Links */}
        <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link></li>

          {/* --- PRODUCTS DROPDOWN --- */}
          <li className={`dropdown-li ${isProductsOpen ? 'open' : ''}`}>
            <span className="dropdown-trigger" onClick={() => setIsProductsOpen(!isProductsOpen)}>
              Products <i className="fas fa-chevron-down"></i>
            </span>
            <ul className="dropdown-menu">
              <li>
                <Link to="/products" onClick={() => { setIsMenuOpen(false); setIsProductsOpen(false); }}>
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=Laboratory Chemicals" onClick={() => { setIsMenuOpen(false); setIsProductsOpen(false); }}>
                  Laboratory Chemicals
                </Link>
              </li>
              <li>
                <Link to="/products?category=Laboratory Glasswares" onClick={() => { setIsMenuOpen(false); setIsProductsOpen(false); }}>
                  Laboratory Glasswares
                </Link>
              </li>
            </ul>
          </li>

          <li><Link to="/downloads" onClick={() => setIsMenuOpen(false)}>Downloads</Link></li>
          <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</Link></li>
        </ul>
      </nav>

      {/* --- PAGE CONTENT --- */}
      <Outlet />

      {/* --- FOOTER --- */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="logo" style={{ color: "white", marginBottom: "15px" }}>
                CREST&nbsp;<span style={{ fontWeight: "normal" }}>BIOSCIENTIFIC</span>
              </div>
              <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>Delivering high performance chemicals worldwide.</p>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact Us</h4>
              <ul>
                <li><i className="fas fa-map-marker-alt"></i> 123, Industrial Area, Mumbai</li>
                <li><i className="fas fa-phone"></i> +91 98765 43210</li>
                <li><i className="fas fa-envelope"></i> info@namechemicals.com</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;