// import React from "react";
// import { Link } from "react-router-dom"; // 👈 Import Link

// function Products() {
//   const productList = [
//     "Acetone", "Ethanol", "Methanol", "Toluene", "Xylene", "Hexane",
//     "Sulfuric Acid", "Hydrochloric Acid", "Sodium Hydroxide", "Hydrogen Peroxide",
//     "Polymer Resins", "Epoxy Resins", "Pigments", "Dyes", "Surfactants", "Emulsifiers",
//     "Buffer Solutions", "Stains", "Reagents", "Indicator Solutions",
//     "Catalysts", "Reactants", "Inhibitors", "Stabilizers",
//     "Benzene", "Propylene", "Ethylene", "Butadiene",
//     "Bio-Solvents", "Bio-Degradable Polymers", "Eco-Friendly Cleaners", "Water Treatment Chemicals"
//   ];

//   return (
//     <div className="page-container">
//       <div className="page-header" style={{ background: "#1A3C8F", color: "white", padding: "60px 0", textAlign: "center" }}>
//         <h1>Our Products</h1>
//         <p>High-quality chemical solutions across 30+ categories</p>
//       </div>

//       <div className="container" style={{ padding: "40px 0" }}>
//         <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
//           {/* Sidebar Categories */}
//           <aside style={{ flex: "0 0 250px", background: "#f8fafc", padding: "30px", borderRadius: "12px", height: "fit-content" }}>
//             <h4 style={{ color: "#1A3C8F", marginBottom: "20px" }}>Categories</h4>
//             <ul style={{ listStyle: "none", padding: 0 }}>
//               {["All", "Solvents", "Speciality", "Lab Chemicals", "Process", "Petrochemicals", "Green Chemicals"].map((cat, i) => (
//                 <li key={i} style={{ padding: "10px 0", borderBottom: "1px solid #eaeaea", cursor: "pointer" }}>
//                   <Link to="/products" style={{ color: "#333", textDecoration: "none" }}>{cat}</Link> {/* Fixed */}
//                 </li>
//               ))}
//             </ul>
//           </aside>

//           {/* Product Grid */}
//           <div style={{ flex: 1, minWidth: "300px" }}>
//             <p style={{ marginBottom: "20px", color: "#666" }}>Showing all 30+ products</p>
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "20px" }}>
//               {productList.map((product, idx) => (
//                 <div key={idx} style={{
//                   background: "white",
//                   padding: "20px",
//                   borderRadius: "12px",
//                   textAlign: "center",
//                   border: "1px solid #f0f0f0",
//                   boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
//                   transition: "all 0.3s ease",
//                   cursor: "pointer"
//                 }}
//                 onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(26,60,143,0.1)"; }}
//                 onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; }}
//                 >
//                   <i className="fas fa-flask" style={{ fontSize: "2rem", color: "#1A3C8F", marginBottom: "10px" }}></i>
//                   <p style={{ fontWeight: "600", fontSize: "0.9rem", margin: 0 }}>{product}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Products;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import "../styles/Admin.css"; // Importing to reuse table and modal styles

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- State for Details Modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  // --- Fetch Product List ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/dashboard/products/list');
        setProducts(response.data || []);
      } catch (err) {
        console.error("Failed to fetch products:", err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // --- Fetch Single Product Details & Open Modal ---
  const handleViewDetails = async (id) => {
    setIsDetailLoading(true);
    setIsModalOpen(true);
    try {
      const response = await api.get(`/dashboard/products/${id}`);
      setSelectedProduct(response.data);
    } catch (err) {
      alert("Failed to load product details: " + err.message);
      setIsModalOpen(false);
    } finally {
      setIsDetailLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
      
      {/* --- PAGE HEADER --- */}
      <div className="section-title">
        <p className="subtitle">OUR CATALOG</p>
        <h2>Explore Our Chemical Products</h2>
      </div>

      {/* --- LOADING STATE --- */}
      {isLoading && (
        <div style={{ textAlign: "center", padding: "60px 0", fontSize: "1.2rem", color: "#555" }}>
          <i className="fas fa-spinner fa-spin" style={{ marginRight: "10px", color: "#002D5A" }}></i>
          Loading products...
        </div>
      )}

      {/* --- EMPTY STATE --- */}
      {!isLoading && products.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#888" }}>
          <h3>No products found.</h3>
          <p>Check back later for new catalog items.</p>
        </div>
      )}

      {/* --- PRODUCTS TABLE VIEW (Matches Dashboard style) --- */}
      {!isLoading && products.length > 0 && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td><strong>{product.name}</strong></td>
                  <td>{product.category}</td>
                  <td>${product.price}</td>
                  <td>{product.stockQuantity || 0}</td>
                  <td>
                    <button 
                      className="btn-primary-admin" 
                      style={{ padding: "6px 16px", fontSize: "0.8rem" }}
                      onClick={() => handleViewDetails(product._id)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* --- DETAILS MODAL (Styled using Admin.css) --- */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>
              {isDetailLoading ? "Loading Details..." : selectedProduct?.name}
            </h3>

            {isDetailLoading ? (
              <div style={{ textAlign: "center", padding: "30px" }}>
                <i className="fas fa-spinner fa-spin fa-2x" style={{ color: "#002D5A" }}></i>
              </div>
            ) : (
              selectedProduct && (
                <div>
                  {/* Product Details Grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "20px" }}>
                    <div className="form-group"><label>Category</label><div style={{fontWeight: "500"}}>{selectedProduct.category}</div></div>
                    <div className="form-group"><label>CAS Number</label><div style={{fontWeight: "500"}}>{selectedProduct.casNumber || "N/A"}</div></div>
                    <div className="form-group"><label>Chemical Formula</label><div style={{fontWeight: "500"}}>{selectedProduct.chemicalFormula || "N/A"}</div></div>
                    <div className="form-group"><label>Molecular Weight</label><div style={{fontWeight: "500"}}>{selectedProduct.molecularWeight || "N/A"}</div></div>
                    <div className="form-group"><label>Purity</label><div style={{fontWeight: "500"}}>{selectedProduct.purity || "N/A"}</div></div>
                    <div className="form-group"><label>Appearance</label><div style={{fontWeight: "500"}}>{selectedProduct.appearance || "N/A"}</div></div>
                    <div className="form-group"><label>Price</label><div style={{fontWeight: "500", color: "#002D5A"}}>${selectedProduct.price}</div></div>
                    <div className="form-group"><label>Stock Quantity</label><div style={{fontWeight: "500"}}>{selectedProduct.stockQuantity || 0}</div></div>
                  </div>

                  {/* Description */}
                  {selectedProduct.description && (
                    <div className="form-group">
                      <label>Description</label>
                      <div style={{ lineHeight: "1.6", color: "#555" }}>{selectedProduct.description}</div>
                    </div>
                  )}
                </div>
              )
            )}

            <div className="modal-actions">
              <button type="button" className="btn-cancel" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;