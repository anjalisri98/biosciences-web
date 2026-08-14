// 
import React, { useState, useEffect } from "react";
import { api } from "../api"; // Make sure this path is correct!
import "../styles/Admin.css"; // Ensure your CSS is imported

function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("products");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add"); // 'add' or 'edit'
  const [currentItem, setCurrentItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- Live Data States ---
  const [products, setProducts] = useState([]);
  const [packagings, setPackagings] = useState([]);
  const [catalogues, setCatalogues] = useState([]);
  const [events, setEvents] = useState([]);
  const [enquiries, setEnquiries] = useState([]);

  // --- 1. Fetch Data when Active Tab Changes ---
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let endpoint = "";
        let setter = null;

        switch (activeTab) {
          case "products":
            endpoint = "/dashboard/products/list";
            setter = setProducts;
            break;
          case "packaging":
            endpoint = "/dashboard/packagings/list";
            setter = setPackagings;
            break;
          case "catalogue":
            endpoint = "/dashboard/catalogues";
            setter = setCatalogues;
            break;
          case "events":
            endpoint = "/dashboard/events/list";
            setter = setEvents;
            break;
          case "enquiries":
            endpoint = "/dashboard/enquiries";
            setter = setEnquiries;
            break;
          default:
            break;
        }

        if (endpoint && setter) {
          const res = await api.get(endpoint);
          setter(res.data); // Assuming response has { success: true, data: [...] }
        }
      } catch (err) {
        alert("Failed to fetch data: " + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  // --- 2. Modal & Save Logic (Handles both Text and File Uploads) ---
  const openAddModal = () => {
    setModalType("add");
    setCurrentItem(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setModalType("edit");
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleSave = async (e, formData, fileInput) => {
    e.preventDefault();
    try {
      let finalPayload = { ...formData };
      let setter = null;

      // 1. If a file was selected, upload it first to MinIO
      if (fileInput && fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const fileFormData = new FormData();
        fileFormData.append("file", file);

        // Determine folder based on tab
        let folder = "general-uploads";
        if (activeTab === "catalogues") folder = "catalogues";
        else if (activeTab === "events") folder = "events";
        else if (activeTab === "packaging") folder = "packaging";

        fileFormData.append("folder", folder);

        // Call the Upload API
        const uploadRes = await api.post("/uploads", fileFormData, true);
        const fileUrl = uploadRes.data.url;

        // Append the URL to the final payload based on feature
        if (activeTab === "catalogues") finalPayload.fileUrl = fileUrl;
        else if (activeTab === "events" || activeTab === "packaging") finalPayload.imageUrl = fileUrl;
      }

      // 2. Determine endpoint and setter
      let endpoint = "";
      switch (activeTab) {
        case "products": endpoint = "/dashboard/products"; setter = setProducts; break;
        case "packaging": endpoint = "/dashboard/packagings"; setter = setPackagings; break;
        case "catalogue": endpoint = "/dashboard/catalogues"; setter = setCatalogues; break;
        case "events": endpoint = "/dashboard/events"; setter = setEvents; break;
        case "enquiries": endpoint = "/dashboard/enquiries"; setter = setEnquiries; break;
        default: return;
      }

      // 3. Call Add or Update API
      let res;
      if (modalType === "add") {
        res = await api.post(endpoint, finalPayload);
        setter((prev) => [...prev, res.data]); // Append new item to state
      } else {
        res = await api.put(`${endpoint}/${currentItem._id}`, finalPayload);
        setter((prev) => prev.map((item) => (item._id === res.data._id ? res.data : item))); // Update in state
      }

      setIsModalOpen(false);
    } catch (err) {
      alert("Failed to save item: " + err.message);
    }
  };

  // --- 3. Delete Logic ---
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      let endpoint = "";
      let setter = null;
      switch (activeTab) {
        case "products": endpoint = "/dashboard/products"; setter = setProducts; break;
        case "packaging": endpoint = "/dashboard/packagings"; setter = setPackagings; break;
        case "catalogue": endpoint = "/dashboard/catalogues"; setter = setCatalogues; break;
        case "events": endpoint = "/dashboard/events"; setter = setEvents; break;
        case "enquiries": endpoint = "/dashboard/enquiries"; setter = setEnquiries; break;
        default: return;
      }
      await api.delete(`${endpoint}/${id}`);
      setter((prev) => prev.filter((item) => item._id !== id)); // Remove from UI
    } catch (err) {
      alert("Failed to delete: " + err.message);
    }
  };

  // --- 4. Render Content Helper ---
  const renderContent = () => {
    if (isLoading) {
      return <div style={{ textAlign: "center", padding: "40px" }}>Loading data...</div>;
    }

    // Common Modal Logic Render
    const renderModal = (title, fields, extraFields = null) => (
      <Modal
        title={title}
        onSave={(e, data, fileInput) => handleSave(e, data, fileInput)}
        onClose={() => setIsModalOpen(false)}
      >
        {fields.map((field) => (
          <div className="form-group" key={field.name}>
            <label>{field.label}</label>
            <input
              type={field.type || "text"}
              placeholder={field.placeholder || ""}
              defaultValue={currentItem ? currentItem[field.name] || "" : ""}
              data-field={field.name}
              required={field.required}
            />
          </div>
        ))}
        {extraFields}
        <div className="form-group">
          <label>Upload File (Optional)</label>
          <input type="file" id="modalFileInput" />
        </div>
      </Modal>
    );

    // 1. Products
    if (activeTab === "products") {
      return (
        <div>
          <button className="btn-primary-admin" onClick={openAddModal}>+ Add Product</button>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td>{p.name}</td><td>{p.category}</td><td>${p.price}</td><td>{p.stockQuantity}</td>
                    <td className="actions">
                      <button className="btn-edit" onClick={() => openEditModal(p)}><i className="fas fa-edit"></i></button>
                      <button className="btn-delete" onClick={() => handleDelete(p._id)}><i className="fas fa-trash"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isModalOpen &&
            renderModal(modalType === "add" ? "Add Product" : "Edit Product", [
              { name: "name", label: "Product Name", required: true },
              { name: "category", label: "Category", required: true },
              { name: "price", label: "Price", type: "number", required: true },
              { name: "stockQuantity", label: "Stock Quantity", type: "number" },
              { name: "description", label: "Description" },
            ])}
        </div>
      );
    }

    // 2. Packaging
    if (activeTab === "packaging") {
      return (
        <div>
          <button className="btn-primary-admin" onClick={openAddModal}>+ Add Packaging</button>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Image</th><th>Name</th><th>Type</th><th>Capacity</th><th>Actions</th></tr></thead>
              <tbody>
                {packagings.map((p) => (
                  <tr key={p._id}>
                    <td><img src={p.imageUrl || "/placeholder.png"} alt="Pack" className="table-img" /></td>
                    <td>{p.name}</td><td>{p.type}</td><td>{p.capacity}</td>
                    <td className="actions">
                      <button className="btn-edit" onClick={() => openEditModal(p)}><i className="fas fa-edit"></i></button>
                      <button className="btn-delete" onClick={() => handleDelete(p._id)}><i className="fas fa-trash"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isModalOpen &&
            renderModal(modalType === "add" ? "Add Packaging" : "Edit Packaging", [
              { name: "name", label: "Packaging Name", required: true },
              { name: "type", label: "Type (e.g. Drum, Vial)", required: true },
              { name: "capacity", label: "Capacity", required: true },
              { name: "material", label: "Material" },
            ])}
        </div>
      );
    }

    // 3. Catalogue
    if (activeTab === "catalogue") {
      return (
        <div>
          <button className="btn-primary-admin" onClick={openAddModal}>+ Add Catalogue</button>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Title</th><th>Category</th><th>File URL</th><th>Actions</th></tr></thead>
              <tbody>
                {catalogues.map((c) => (
                  <tr key={c._id}>
                    <td>{c.title}</td><td>{c.productCategory}</td>
                    <td><a href={c.fileUrl} target="_blank" rel="noreferrer">View PDF</a></td>
                    <td className="actions">
                      <button className="btn-edit" onClick={() => openEditModal(c)}><i className="fas fa-edit"></i></button>
                      <button className="btn-delete" onClick={() => handleDelete(c._id)}><i className="fas fa-trash"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isModalOpen &&
            renderModal(modalType === "add" ? "Add Catalogue" : "Edit Catalogue", [
              { name: "title", label: "Catalogue Title", required: true },
              { name: "productCategory", label: "Product Category" },
              { name: "description", label: "Description" },
            ])}
        </div>
      );
    }

    // 4. Events
    if (activeTab === "events") {
      return (
        <div>
          <button className="btn-primary-admin" onClick={openAddModal}>+ Add Event</button>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Image</th><th>Title</th><th>Date</th><th>Location</th><th>Actions</th></tr></thead>
              <tbody>
                {events.map((e) => (
                  <tr key={e._id}>
                    <td><img src={e.imageUrl || "/placeholder.png"} alt="Event" className="table-img" /></td>
                    <td>{e.title}</td>
                    <td>{new Date(e.eventDate).toLocaleDateString()}</td>
                    <td>{e.location}</td>
                    <td className="actions">
                      <button className="btn-edit" onClick={() => openEditModal(e)}><i className="fas fa-edit"></i></button>
                      <button className="btn-delete" onClick={() => handleDelete(e._id)}><i className="fas fa-trash"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isModalOpen &&
            renderModal(modalType === "add" ? "Add Event" : "Edit Event", [
              { name: "title", label: "Event Title", required: true },
              { name: "eventDate", label: "Event Date", type: "date", required: true },
              { name: "location", label: "Location", required: true },
              { name: "description", label: "Description" },
            ])}
        </div>
      );
    }

    // 5. Enquiries
    if (activeTab === "enquiries") {
      return (
        <div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Email</th><th>Message</th><th>Status</th><th>Updated By</th><th>Actions</th></tr></thead>
              <tbody>
                {enquiries.map((e) => (
                  <tr key={e._id}>
                    <td><strong>{e.name}</strong></td><td>{e.email}</td>
                    <td>{e.message?.substring(0, 30)}...</td>
                    <td style={{ color: e.status === "New" ? "#ff4d4f" : e.status === "In Review" ? "#faad14" : "#52c41a", fontWeight: "bold" }}>
                      {e.status}
                    </td>
                    <td>{e.updatedBy}</td>
                    <td className="actions">
                      <button className="btn-edit" onClick={() => openEditModal(e)}><i className="fas fa-pen"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isModalOpen &&
            <Modal
              title="Update Enquiry"
              onSave={(e, data) => handleSave(e, data, null)}
              onClose={() => setIsModalOpen(false)}
            >
              <div className="form-group">
                <label>Update Status</label>
                <select defaultValue={currentItem?.status || "New"} data-field="status">
                  <option value="New">New</option>
                  <option value="Read">Mark as Read</option>
                  <option value="In Review">In Review</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="form-group">
                <label>Assign To / Update By</label>
                <input type="text" placeholder="e.g. Sales Team" defaultValue={currentItem?.updatedBy || ""} data-field="updatedBy" />
              </div>
            </Modal>
          }
        </div>
      );
    }
  };

  return (
    <div className="admin-layout">
      {/* --- SIDEBAR --- */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="admin-logo"><i className="fas fa-cube"></i> CREST Admin</div>
        <ul className="admin-menu">
          {['products', 'packaging', 'catalogue', 'events', 'enquiries'].map(tab => (
            <li key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => { setActiveTab(tab); setIsSidebarOpen(false); }}>
              <i className={`fas fa-${tab === 'products' ? 'box' : tab === 'packaging' ? 'box-open' : tab === 'catalogue' ? 'file-pdf' : tab === 'events' ? 'calendar-alt' : 'envelope'}`}></i>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </li>
          ))}
        </ul>
      </aside>

      {/* --- MAIN AREA --- */}
      <main className="admin-main">
        <header className="admin-header">
          <div><button className="menu-toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}><i className="fas fa-bars"></i></button></div>
          <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management</h2>
          <div className="admin-user">
            <span><i className="fas fa-user-circle"></i> Admin</span>
            <button onClick={onLogout}>Logout</button>
          </div>
        </header>
        <div className="admin-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

// --- Reusable Modal Component ---
function Modal({ title, children, onSave, onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {};
    const formElements = e.target.elements;
    // Extract text inputs
    for (let el of formElements) {
      if (el.dataset.field) formData[el.dataset.field] = el.value;
    }
    // Get the file input
    const fileInput = document.getElementById("modalFileInput");
    onSave(e, formData, fileInput);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{title}</h3>
        <form onSubmit={handleSubmit}>
          {children}
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-save">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminDashboard;