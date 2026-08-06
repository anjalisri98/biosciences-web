import React, { useState } from 'react';
import '../styles/Admin.css';

// --- Mock Initial Data ---
const initialProducts = [
  { id: 1, name: 'Industrial Solvent', category: 'Solvents', price: '$15.00' },
  { id: 2, name: 'Lab Grade Chemical', category: 'Lab Chemicals', price: '$25.50' },
];
const initialPackagings = [
  { id: 1, name: 'Plastic Drum 200L', type: 'Barrel', img: 'https://via.placeholder.com/50' },
];
const initialCatalogues = [
  { id: 1, name: 'Chemicals Catalog 2024', file: 'catalog_2024.pdf' },
];
const initialEvents = [
  { id: 1, name: 'ICC Annual Conference', date: '2024-11-26', location: 'Greater Noida', img: 'https://via.placeholder.com/50' },
];
const initialEnquiries = [
  { id: 1, name: 'John Doe', email: 'john@example.com', message: 'Interested in bulk order', status: 'New', assignedTo: 'Sales Team' },
];

function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('products');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [currentItem, setCurrentItem] = useState(null);

  // --- State Management ---
  const [products, setProducts] = useState(initialProducts);
  const [packagings, setPackagings] = useState(initialPackagings);
  const [catalogues, setCatalogues] = useState(initialCatalogues);
  const [events, setEvents] = useState(initialEvents);
  const [enquiries, setEnquiries] = useState(initialEnquiries);

  // --- Common Operations: Delete ---
  const handleDelete = (setState, state, id) => {
    if(window.confirm('Are you sure you want to delete this item?')) {
      setState(state.filter(item => item.id !== id));
    }
  };

  // --- Common Operations: Save (Add/Edit) ---
  const handleSave = (e, setState, state, formData) => {
    e.preventDefault();
    if(modalType === 'add') {
      setState([...state, { id: Date.now(), ...formData }]);
    } else if (modalType === 'edit') {
      setState(state.map(item => item.id === currentItem.id ? { ...item, ...formData } : item));
    }
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  // --- Open Add/Edit Modal ---
  const openAddModal = () => { setModalType('add'); setCurrentItem(null); setIsModalOpen(true); };
  const openEditModal = (item) => { setModalType('edit'); setCurrentItem(item); setIsModalOpen(true); };

  // --- Render Tab Content ---
  const renderContent = () => {
    // 1. PRODUCTS TAB
    if (activeTab === 'products') {
      return (
        <div>
          <button className="btn-primary-admin" onClick={openAddModal}>+ Add Product</button>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>ID</th><th>Name</th><th>Category</th><th>Price</th><th>Actions</th></tr></thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id}>
                    <td>{p.id}</td><td>{p.name}</td><td>{p.category}</td><td>{p.price}</td>
                    <td className="actions">
                      <button className="btn-edit" onClick={() => openEditModal(p)}><i className="fas fa-edit"></i></button>
                      <button className="btn-delete" onClick={() => handleDelete(setProducts, products, p.id)}><i className="fas fa-trash"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isModalOpen && activeTab === 'products' && (
            <Modal title={modalType === 'add' ? 'Add Product' : 'Edit Product'} onSave={(e, data) => handleSave(e, setProducts, products, data)} onClose={() => setIsModalOpen(false)}>
              <input type="text" placeholder="Product Name" defaultValue={currentItem?.name || ''} data-field="name" required />
              <input type="text" placeholder="Category" defaultValue={currentItem?.category || ''} data-field="category" required />
              <input type="text" placeholder="Price" defaultValue={currentItem?.price || ''} data-field="price" required />
            </Modal>
          )}
        </div>
      );
    }

    // 2. PACKAGING TAB
    if (activeTab === 'packaging') {
      return (
        <div>
          <button className="btn-primary-admin" onClick={openAddModal}>+ Add Packaging</button>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Image</th><th>Name</th><th>Type</th><th>Actions</th></tr></thead>
              <tbody>
                {packagings.map(p => (
                  <tr key={p.id}>
                    <td><img src={p.img} alt="Pack" className="table-img" /></td>
                    <td>{p.name}</td><td>{p.type}</td>
                    <td className="actions">
                      <button className="btn-edit" onClick={() => openEditModal(p)}><i className="fas fa-edit"></i></button>
                      <button className="btn-delete" onClick={() => handleDelete(setPackagings, packagings, p.id)}><i className="fas fa-trash"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isModalOpen && activeTab === 'packaging' && (
            <Modal title={modalType === 'add' ? 'Add Packaging' : 'Edit Packaging'} onSave={(e, data) => handleSave(e, setPackagings, packagings, data)} onClose={() => setIsModalOpen(false)}>
              <input type="text" placeholder="Packaging Name" defaultValue={currentItem?.name || ''} data-field="name" required />
              <input type="text" placeholder="Type (e.g. Barrel)" defaultValue={currentItem?.type || ''} data-field="type" required />
              <input type="text" placeholder="Image URL" defaultValue={currentItem?.img || ''} data-field="img" />
            </Modal>
          )}
        </div>
      );
    }

    // 3. CATALOGUE TAB
    if (activeTab === 'catalogue') {
      return (
        <div>
          <button className="btn-primary-admin" onClick={openAddModal}>+ Add Catalogue</button>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Name</th><th>File Name</th><th>Actions</th></tr></thead>
              <tbody>
                {catalogues.map(c => (
                  <tr key={c.id}>
                    <td>{c.name}</td><td>{c.file}</td>
                    <td className="actions">
                      <button className="btn-edit" onClick={() => openEditModal(c)}><i className="fas fa-edit"></i></button>
                      <button className="btn-delete" onClick={() => handleDelete(setCatalogues, catalogues, c.id)}><i className="fas fa-trash"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isModalOpen && activeTab === 'catalogue' && (
            <Modal title={modalType === 'add' ? 'Add Catalogue' : 'Edit Catalogue'} onSave={(e, data) => handleSave(e, setCatalogues, catalogues, data)} onClose={() => setIsModalOpen(false)}>
              <input type="text" placeholder="Catalogue Name" defaultValue={currentItem?.name || ''} data-field="name" required />
              <input type="text" placeholder="PDF File Name" defaultValue={currentItem?.file || ''} data-field="file" required />
            </Modal>
          )}
        </div>
      );
    }

    // 4. EVENTS TAB
    if (activeTab === 'events') {
      return (
        <div>
          <button className="btn-primary-admin" onClick={openAddModal}>+ Add Event</button>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Image</th><th>Title</th><th>Date</th><th>Location</th><th>Actions</th></tr></thead>
              <tbody>
                {events.map(e => (
                  <tr key={e.id}>
                    <td><img src={e.img} alt="Event" className="table-img" /></td>
                    <td>{e.name}</td><td>{e.date}</td><td>{e.location}</td>
                    <td className="actions">
                      <button className="btn-edit" onClick={() => openEditModal(e)}><i className="fas fa-edit"></i></button>
                      <button className="btn-delete" onClick={() => handleDelete(setEvents, events, e.id)}><i className="fas fa-trash"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isModalOpen && activeTab === 'events' && (
            <Modal title={modalType === 'add' ? 'Add Event' : 'Edit Event'} onSave={(e, data) => handleSave(e, setEvents, events, data)} onClose={() => setIsModalOpen(false)}>
              <input type="text" placeholder="Event Title" defaultValue={currentItem?.name || ''} data-field="name" required />
              <input type="date" defaultValue={currentItem?.date || ''} data-field="date" required />
              <input type="text" placeholder="Location" defaultValue={currentItem?.location || ''} data-field="location" required />
              <input type="text" placeholder="Image URL" defaultValue={currentItem?.img || ''} data-field="img" />
            </Modal>
          )}
        </div>
      );
    }

    // 5. ENQUIRY TAB
    if (activeTab === 'enquiries') {
      return (
        <div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Email</th><th>Message</th><th>Status</th><th>Assigned To</th><th>Actions</th></tr></thead>
              <tbody>
                {enquiries.map(e => (
                  <tr key={e.id}>
                    <td><strong>{e.name}</strong></td><td>{e.email}</td><td>{e.message.substring(0, 30)}...</td>
                    <td><span style={{color: e.status === 'New' ? '#ff4d4f' : e.status === 'In Review' ? '#faad14' : '#52c41a', fontWeight: 'bold'}}>{e.status}</span></td>
                    <td>{e.assignedTo}</td>
                    <td className="actions">
                      <button className="btn-edit" onClick={() => openEditModal(e)}><i className="fas fa-pen"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isModalOpen && activeTab === 'enquiries' && (
            <Modal title="Update Enquiry" onSave={(e, data) => handleSave(e, setEnquiries, enquiries, data)} onClose={() => setIsModalOpen(false)}>
              <div className="form-group">
                <label>Update Status</label>
                <select defaultValue={currentItem?.status || 'New'} data-field="status">
                  <option value="New">New</option>
                  <option value="Read">Mark as Read</option>
                  <option value="In Review">In Review</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="form-group">
                <label>Assign To / Update By</label>
                <input type="text" placeholder="e.g. Sales Team" defaultValue={currentItem?.assignedTo || ''} data-field="assignedTo" />
              </div>
            </Modal>
          )}
        </div>
      );
    }
  };

  return (
    <div className="admin-layout">
      {/* --- SIDEBAR --- */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="admin-logo"><i className="fas fa-cube"></i> AdminPanel</div>
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
          <div><button className="menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}><i className="fas fa-bars"></i></button></div>
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
    for(let el of formElements) {
      if(el.dataset.field) formData[el.dataset.field] = el.value;
    }
    onSave(e, formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{title}</h3>
        <form onSubmit={handleSubmit}>
          {React.Children.map(children, child => {
            if(child.type === 'input' || child.type === 'select') {
              return <div className="form-group">{child}</div>;
            }
            if(child.type === 'div' && child.props.className === 'form-group') {
              return child;
            }
            return null;
          })}
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