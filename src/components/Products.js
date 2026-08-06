import React from "react";
import { Link } from "react-router-dom"; // 👈 Import Link

function Products() {
  const productList = [
    "Acetone", "Ethanol", "Methanol", "Toluene", "Xylene", "Hexane",
    "Sulfuric Acid", "Hydrochloric Acid", "Sodium Hydroxide", "Hydrogen Peroxide",
    "Polymer Resins", "Epoxy Resins", "Pigments", "Dyes", "Surfactants", "Emulsifiers",
    "Buffer Solutions", "Stains", "Reagents", "Indicator Solutions",
    "Catalysts", "Reactants", "Inhibitors", "Stabilizers",
    "Benzene", "Propylene", "Ethylene", "Butadiene",
    "Bio-Solvents", "Bio-Degradable Polymers", "Eco-Friendly Cleaners", "Water Treatment Chemicals"
  ];

  return (
    <div className="page-container">
      <div className="page-header" style={{ background: "#1A3C8F", color: "white", padding: "60px 0", textAlign: "center" }}>
        <h1>Our Products</h1>
        <p>High-quality chemical solutions across 30+ categories</p>
      </div>

      <div className="container" style={{ padding: "40px 0" }}>
        <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
          {/* Sidebar Categories */}
          <aside style={{ flex: "0 0 250px", background: "#f8fafc", padding: "30px", borderRadius: "12px", height: "fit-content" }}>
            <h4 style={{ color: "#1A3C8F", marginBottom: "20px" }}>Categories</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {["All", "Solvents", "Speciality", "Lab Chemicals", "Process", "Petrochemicals", "Green Chemicals"].map((cat, i) => (
                <li key={i} style={{ padding: "10px 0", borderBottom: "1px solid #eaeaea", cursor: "pointer" }}>
                  <Link to="/products" style={{ color: "#333", textDecoration: "none" }}>{cat}</Link> {/* Fixed */}
                </li>
              ))}
            </ul>
          </aside>

          {/* Product Grid */}
          <div style={{ flex: 1, minWidth: "300px" }}>
            <p style={{ marginBottom: "20px", color: "#666" }}>Showing all 30+ products</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "20px" }}>
              {productList.map((product, idx) => (
                <div key={idx} style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "12px",
                  textAlign: "center",
                  border: "1px solid #f0f0f0",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  transition: "all 0.3s ease",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(26,60,143,0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; }}
                >
                  <i className="fas fa-flask" style={{ fontSize: "2rem", color: "#1A3C8F", marginBottom: "10px" }}></i>
                  <p style={{ fontWeight: "600", fontSize: "0.9rem", margin: 0 }}>{product}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;