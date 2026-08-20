import React, { useState, useEffect } from "react";
import { api } from "../api";

function Downloads() {
  const [catalogues, setCatalogues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch catalogues from backend
  useEffect(() => {
    const fetchCatalogues = async () => {
      try {
        const response = await api.get('/dashboard/catalogues/list');
        setCatalogues(response.data || []);
      } catch (err) {
        console.error("Failed to fetch catalogues:", err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCatalogues();
  }, []);

  // Filter based on search term
  const filteredCatalogues = catalogues.filter((item) =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.productCategory?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
      
      {/* --- PAGE HEADER --- */}
      <div className="section-title">
        <p className="subtitle">DOWNLOADS</p>
        <h2>Product Catalogues & Resources</h2>
      </div>

      {/* --- SEARCH BAR --- */}
      <div style={{ maxWidth: "500px", margin: "0 auto 40px auto" }}>
        <div className="search-box" style={{ maxWidth: "100%" }}>
          <input 
            type="text" 
            placeholder="Search by catalogue name or category..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button disabled>
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>

      {/* --- LOADING STATE --- */}
      {isLoading && (
        <div style={{ textAlign: "center", padding: "60px 0", fontSize: "1.2rem", color: "#555" }}>
          <i className="fas fa-spinner fa-spin" style={{ marginRight: "10px", color: "#002D5A" }}></i>
          Loading catalogues...
        </div>
      )}

      {/* --- EMPTY STATE --- */}
      {!isLoading && catalogues.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#888" }}>
          <i className="fas fa-file-pdf" style={{ fontSize: "3rem", color: "#ddd", marginBottom: "20px", display: "block" }}></i>
          <h3>No catalogues available yet.</h3>
          <p>Please check back later for new resources.</p>
        </div>
      )}

      {/* --- EMPTY SEARCH STATE --- */}
      {!isLoading && catalogues.length > 0 && filteredCatalogues.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#888" }}>
          <h4>No catalogues found matching "<strong>{searchTerm}</strong>"</h4>
        </div>
      )}

      {/* --- CATALOGUES GRID --- */}
      {!isLoading && filteredCatalogues.length > 0 && (
        <div className="product-grid">
          {filteredCatalogues.map((catalogue) => (
            <div className="product-card" key={catalogue._id}>
              {/* PDF Icon */}
              <div className="icon-wrapper" style={{ background: "#fff0e6", color: "#dc3545" }}>
                <i className="fas fa-file-pdf" style={{ fontSize: "2rem" }}></i>
              </div>
              
              <h3>{catalogue.title}</h3>
              <p style={{ fontSize: "0.85rem", color: "#002D5A", fontWeight: "600", marginBottom: "5px" }}>
                {catalogue.productCategory || "General"}
              </p>
              <p>{catalogue.description || "Download our comprehensive product catalogue."}</p>
              
              {/* Download Button */}
              <a 
                href={catalogue.fileUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary"
                style={{ fontSize: "0.85rem", padding: "10px 25px", marginTop: "10px", display: "inline-flex", gap: "8px" }}
              >
                <i className="fas fa-download"></i> Download PDF
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Downloads;