import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, categories } = useAdmin();
  const fileInputRef = useRef(null);
  const catalogueInputRef = useRef(null);
  const msdsInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'pharma',
    grade: '',
    purity: '',
    cas: '',
    description: '',
    applications: [],
    packaging: [],
    icon: 'fa-capsules',
    color: '#1a4a7a',
    inStock: true,
    image: '',
    cataloguePdf: '',
    msdsPdf: '',
  });

  const [appInput, setAppInput] = useState('');
  const [pkgInput, setPkgInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('');
  const [catalogueFileName, setCatalogueFileName] = useState('');
  const [msdsFileName, setMsdsFileName] = useState('');

  useEffect(() => {
    if (id) {
      const product = products.find(p => p.id === parseInt(id));
      if (product) {
        setFormData(product);
        if (product.image) setImagePreview(product.image);
        if (product.cataloguePdf) setCatalogueFileName('Catalogue.pdf');
        if (product.msdsPdf) setMsdsFileName('MSDS.pdf');
      }
    }
  }, [id, products]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    // Clear error for this field
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({ ...formData, [field]: event.target.result });
        if (field === 'image') setImagePreview(event.target.result);
        if (field === 'cataloguePdf') setCatalogueFileName(file.name);
        if (field === 'msdsPdf') setMsdsFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = (field) => {
    setFormData({ ...formData, [field]: '' });
    if (field === 'image') setImagePreview('');
    if (field === 'cataloguePdf') setCatalogueFileName('');
    if (field === 'msdsPdf') setMsdsFileName('');
    if (field === 'image' && fileInputRef.current) fileInputRef.current.value = '';
    if (field === 'cataloguePdf' && catalogueInputRef.current) catalogueInputRef.current.value = '';
    if (field === 'msdsPdf' && msdsInputRef.current) msdsInputRef.current.value = '';
  };

  const addApplication = () => {
    if (appInput.trim()) {
      setFormData({
        ...formData,
        applications: [...formData.applications, appInput.trim()],
      });
      setAppInput('');
    }
  };

  const removeApplication = (index) => {
    setFormData({
      ...formData,
      applications: formData.applications.filter((_, i) => i !== index),
    });
  };

  const addPackaging = () => {
    if (pkgInput.trim()) {
      setFormData({
        ...formData,
        packaging: [...formData.packaging, pkgInput.trim()],
      });
      setPkgInput('');
    }
  };

  const removePackaging = (index) => {
    setFormData({
      ...formData,
      packaging: formData.packaging.filter((_, i) => i !== index),
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.grade.trim()) newErrors.grade = 'Grade is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate async save
    setTimeout(() => {
      if (id) {
        updateProduct(parseInt(id), formData);
      } else {
        addProduct(formData);
      }
      setLoading(false);
      navigate('/admin/products');
    }, 500);
  };

  // Get category icon
  const getCategoryIcon = (catId) => {
    const cat = categories.find(c => c.id === catId);
    return cat ? cat.icon : 'fa-tag';
  };

  return (
    <div className="product-form-wrapper">
      <div className="form-header">
        <div>
          <h2>{id ? '✏️ Edit Product' : '➕ Add New Product'}</h2>
          <p className="form-subtitle">
            {id ? 'Update the product details below.' : 'Fill in the details to create a new product.'}
          </p>
        </div>
        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={() => navigate('/admin/products')}>
            <i className="fas fa-times"></i> Cancel
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        {/* Two-column layout for main fields */}
        <div className="form-grid">
          {/* Left Column */}
          <div className="form-column">
            {/* Product Name */}
            <div className="form-group">
              <label htmlFor="name">Product Name <span className="required">*</span></label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., API Intermediates"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <div className="field-error">{errors.name}</div>}
            </div>

            {/* Category */}
            <div className="form-group">
              <label htmlFor="category">Category <span className="required">*</span></label>
              <div className="select-wrapper">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={errors.category ? 'error' : ''}
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      <i className={`fas ${cat.icon}`}></i> {cat.label}
                    </option>
                  ))}
                </select>
                <i className="fas fa-chevron-down select-arrow"></i>
              </div>
              {errors.category && <div className="field-error">{errors.category}</div>}
            </div>

            {/* Grade & Purity */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="grade">Grade <span className="required">*</span></label>
                <input
                  type="text"
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  placeholder="e.g., 99.9%, HPLC"
                  className={errors.grade ? 'error' : ''}
                />
                {errors.grade && <div className="field-error">{errors.grade}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="purity">Purity</label>
                <input
                  type="text"
                  id="purity"
                  name="purity"
                  value={formData.purity}
                  onChange={handleChange}
                  placeholder="e.g., ≥ 99.5%"
                />
              </div>
            </div>

            {/* CAS & Icon */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cas">CAS Number</label>
                <input
                  type="text"
                  id="cas"
                  name="cas"
                  value={formData.cas}
                  onChange={handleChange}
                  placeholder="e.g., CAS 123-45-6"
                />
              </div>
              <div className="form-group">
                <label htmlFor="icon">Icon (Font Awesome)</label>
                <input
                  type="text"
                  id="icon"
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  placeholder="fa-capsules"
                />
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="description">Description <span className="required">*</span></label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe the product in detail..."
                className={errors.description ? 'error' : ''}
              />
              {errors.description && <div className="field-error">{errors.description}</div>}
            </div>
          </div>

          {/* Right Column */}
          <div className="form-column">
            {/* Applications */}
            <div className="form-group">
              <label>Applications</label>
              <div className="tag-input-wrapper">
                <input
                  type="text"
                  value={appInput}
                  onChange={(e) => setAppInput(e.target.value)}
                  placeholder="Add application"
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addApplication())}
                />
                <button type="button" onClick={addApplication} className="tag-add-btn">
                  <i className="fas fa-plus"></i>
                </button>
              </div>
              <div className="tags-container">
                {formData.applications.map((app, index) => (
                  <span key={index} className="tag">
                    {app}
                    <button type="button" onClick={() => removeApplication(index)} className="tag-remove">
                      <i className="fas fa-times"></i>
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Packaging */}
            <div className="form-group">
              <label>Packaging Options</label>
              <div className="tag-input-wrapper">
                <input
                  type="text"
                  value={pkgInput}
                  onChange={(e) => setPkgInput(e.target.value)}
                  placeholder="Add packaging option"
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addPackaging())}
                />
                <button type="button" onClick={addPackaging} className="tag-add-btn">
                  <i className="fas fa-plus"></i>
                </button>
              </div>
              <div className="tags-container">
                {formData.packaging.map((pkg, index) => (
                  <span key={index} className="tag packaging">
                    <i className="fas fa-box"></i> {pkg}
                    <button type="button" onClick={() => removePackaging(index)} className="tag-remove">
                      <i className="fas fa-times"></i>
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Color & Stock */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="color">Color (hex)</label>
                <div className="color-picker-wrapper">
                  <input
                    type="color"
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    placeholder="#1a4a7a"
                  />
                </div>
              </div>
              <div className="form-group stock-toggle">
                <label htmlFor="inStock">In Stock</label>
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    id="inStock"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleChange}
                  />
                  <span className="toggle-slider"></span>
                </div>
                <span className="stock-label">{formData.inStock ? 'In Stock' : 'Out of Stock'}</span>
              </div>
            </div>

            {/* File Uploads */}
            <div className="file-uploads">
              {/* Product Image */}
              <div className="file-upload-group">
                <label>Product Image</label>
                <div className="file-drop-zone" onClick={() => fileInputRef.current?.click()}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'image')}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                  />
                  {imagePreview ? (
                    <div className="file-preview">
                      <img src={imagePreview} alt="Product preview" />
                      <button type="button" className="remove-file" onClick={(e) => { e.stopPropagation(); removeFile('image'); }}>
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ) : (
                    <div className="file-placeholder">
                      <i className="fas fa-image"></i>
                      <span>Click to upload image</span>
                      <small>PNG, JPG, GIF up to 2MB</small>
                    </div>
                  )}
                </div>
              </div>

              {/* Catalogue PDF */}
              <div className="file-upload-group small">
                <label>Catalogue PDF</label>
                <div className="file-drop-zone pdf" onClick={() => catalogueInputRef.current?.click()}>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, 'cataloguePdf')}
                    ref={catalogueInputRef}
                    style={{ display: 'none' }}
                  />
                  {catalogueFileName ? (
                    <div className="file-preview pdf-preview">
                      <i className="fas fa-file-pdf"></i>
                      <span>{catalogueFileName}</span>
                      <button type="button" className="remove-file" onClick={(e) => { e.stopPropagation(); removeFile('cataloguePdf'); }}>
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ) : (
                    <div className="file-placeholder">
                      <i className="fas fa-file-pdf"></i>
                      <span>Upload Catalogue</span>
                      <small>PDF only</small>
                    </div>
                  )}
                </div>
              </div>

              {/* MSDS PDF */}
              <div className="file-upload-group small">
                <label>MSDS PDF</label>
                <div className="file-drop-zone pdf" onClick={() => msdsInputRef.current?.click()}>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, 'msdsPdf')}
                    ref={msdsInputRef}
                    style={{ display: 'none' }}
                  />
                  {msdsFileName ? (
                    <div className="file-preview pdf-preview">
                      <i className="fas fa-file-pdf"></i>
                      <span>{msdsFileName}</span>
                      <button type="button" className="remove-file" onClick={(e) => { e.stopPropagation(); removeFile('msdsPdf'); }}>
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ) : (
                    <div className="file-placeholder">
                      <i className="fas fa-file-pdf"></i>
                      <span>Upload MSDS</span>
                      <small>PDF only</small>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="form-submit">
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? (
              <><i className="fas fa-spinner fa-spin"></i> Saving...</>
            ) : (
              <><i className="fas fa-save"></i> {id ? 'Update Product' : 'Create Product'}</>
            )}
          </button>
          <button type="button" className="btn-cancel" onClick={() => navigate('/admin/products')}>
            Cancel
          </button>
        </div>
      </form>

      <style>{`
        .product-form-wrapper {
          padding: 8px 0;
        }

        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          margin-bottom: 28px;
          gap: 12px;
        }

        .form-header h2 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #0b1a2e;
          margin: 0;
        }

        .form-subtitle {
          color: #5a6e8b;
          margin: 4px 0 0;
          font-size: 0.95rem;
        }

        .form-actions {
          display: flex;
          gap: 12px;
        }

        .btn-cancel {
          background: transparent;
          border: 1.5px solid #dce4ee;
          color: #3a4e6b;
          padding: 8px 20px;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: 0.2s;
          font-family: inherit;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .btn-cancel:hover {
          background: #f0f4fa;
          border-color: #b0c0d0;
        }

        /* Form Layout */
        .product-form {
          background: #fff;
          border-radius: 16px;
          border: 1px solid #eef2f7;
          padding: 32px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        .form-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .form-group label {
          font-weight: 600;
          font-size: 0.9rem;
          color: #0b1a2e;
        }

        .form-group label .required {
          color: #c0392b;
          margin-left: 2px;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          padding: 10px 14px;
          border-radius: 8px;
          border: 1.5px solid #dce4ee;
          font-family: inherit;
          font-size: 0.95rem;
          transition: 0.2s;
          background: #fff;
          width: 100%;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: #1a4a7a;
          box-shadow: 0 0 0 3px rgba(26,74,122,0.08);
        }

        .form-group input.error,
        .form-group textarea.error,
        .form-group select.error {
          border-color: #c0392b;
        }

        .field-error {
          font-size: 0.8rem;
          color: #c0392b;
          margin-top: 2px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        /* Select wrapper */
        .select-wrapper {
          position: relative;
        }

        .select-wrapper select {
          appearance: none;
          padding-right: 36px;
          background: #fff;
        }

        .select-arrow {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #5a6e8b;
          pointer-events: none;
        }

        /* Tag Input */
        .tag-input-wrapper {
          display: flex;
          gap: 8px;
        }

        .tag-input-wrapper input {
          flex: 1;
          padding: 8px 12px;
          border-radius: 8px;
          border: 1.5px solid #dce4ee;
          font-family: inherit;
          font-size: 0.9rem;
          transition: 0.2s;
        }

        .tag-input-wrapper input:focus {
          outline: none;
          border-color: #1a4a7a;
          box-shadow: 0 0 0 3px rgba(26,74,122,0.08);
        }

        .tag-add-btn {
          padding: 8px 14px;
          background: #0b1a2e;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.2s;
          font-family: inherit;
        }

        .tag-add-btn:hover {
          background: #1a3a5a;
        }

        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
        }

        .tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #e8edf5;
          padding: 4px 10px 4px 14px;
          border-radius: 20px;
          font-size: 0.85rem;
          color: #0b1a2e;
        }

        .tag.packaging {
          background: #e6f0f5;
        }

        .tag-remove {
          background: none;
          border: none;
          color: #5a6e8b;
          cursor: pointer;
          font-size: 0.7rem;
          padding: 0 2px;
        }

        .tag-remove:hover {
          color: #c0392b;
        }

        /* Color Picker */
        .color-picker-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .color-picker-wrapper input[type="color"] {
          width: 44px;
          height: 44px;
          padding: 2px;
          border-radius: 8px;
          border: 1.5px solid #dce4ee;
          cursor: pointer;
          background: #fff;
        }

        .color-picker-wrapper input[type="text"] {
          flex: 1;
          padding: 10px 14px;
          border-radius: 8px;
          border: 1.5px solid #dce4ee;
          font-family: inherit;
          font-size: 0.95rem;
        }

        .color-picker-wrapper input[type="text"]:focus {
          outline: none;
          border-color: #1a4a7a;
          box-shadow: 0 0 0 3px rgba(26,74,122,0.08);
        }

        /* Stock Toggle */
        .stock-toggle {
          flex-direction: row;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .stock-toggle label {
          margin: 0;
        }

        .toggle-switch {
          position: relative;
          width: 48px;
          height: 26px;
          flex-shrink: 0;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          inset: 0;
          background: #dce4ee;
          border-radius: 26px;
          transition: 0.3s;
        }

        .toggle-slider::before {
          content: '';
          position: absolute;
          height: 20px;
          width: 20px;
          left: 3px;
          bottom: 3px;
          background: #fff;
          border-radius: 50%;
          transition: 0.3s;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
        }

        .toggle-switch input:checked + .toggle-slider {
          background: #1a4a7a;
        }

        .toggle-switch input:checked + .toggle-slider::before {
          transform: translateX(22px);
        }

        .stock-label {
          font-weight: 500;
          font-size: 0.9rem;
          color: #0b1a2e;
        }

        /* File Uploads */
        .file-uploads {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .file-upload-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .file-upload-group label {
          font-weight: 600;
          font-size: 0.9rem;
          color: #0b1a2e;
        }

        .file-drop-zone {
          border: 2px dashed #dce4ee;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          cursor: pointer;
          transition: 0.2s;
          background: #f8faff;
          min-height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .file-drop-zone:hover {
          border-color: #1a4a7a;
          background: #f0f4fa;
        }

        .file-drop-zone.pdf {
          min-height: 60px;
        }

        .file-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          color: #5a6e8b;
        }

        .file-placeholder i {
          font-size: 1.8rem;
          color: #b0c0d0;
        }

        .file-placeholder span {
          font-weight: 500;
        }

        .file-placeholder small {
          font-size: 0.7rem;
          color: #8a9eab;
        }

        .file-preview {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          justify-content: center;
          position: relative;
        }

        .file-preview img {
          max-height: 80px;
          max-width: 80px;
          border-radius: 8px;
          object-fit: contain;
        }

        .file-preview.pdf-preview {
          gap: 8px;
        }

        .file-preview.pdf-preview i {
          font-size: 2rem;
          color: #c0392b;
        }

        .file-preview.pdf-preview span {
          font-weight: 500;
          color: #0b1a2e;
          font-size: 0.9rem;
        }

        .remove-file {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #c0392b;
          border: none;
          color: #fff;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 0.7rem;
          transition: 0.2s;
        }

        .remove-file:hover {
          transform: scale(1.1);
        }

        /* Submit */
        .form-submit {
          display: flex;
          gap: 16px;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid #eef2f7;
        }

        .btn-submit {
          background: #0b1a2e;
          color: #fff;
          border: none;
          padding: 12px 32px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
          font-family: inherit;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn-submit:hover:not(:disabled) {
          background: #1a3a5a;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(11,26,46,0.15);
        }

        .btn-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .form-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .product-form {
            padding: 24px;
          }
        }

        @media (max-width: 640px) {
          .form-header {
            flex-direction: column;
            align-items: stretch;
          }

          .form-actions {
            justify-content: stretch;
          }

          .form-actions .btn-cancel {
            flex: 1;
            justify-content: center;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .form-submit {
            flex-direction: column;
          }

          .form-submit .btn-submit,
          .form-submit .btn-cancel {
            width: 100%;
            justify-content: center;
          }

          .product-form {
            padding: 16px;
          }

          .file-uploads .file-drop-zone {
            min-height: 60px;
            padding: 12px;
          }
        }

        @media (max-width: 480px) {
          .form-header h2 {
            font-size: 1.4rem;
          }

          .color-picker-wrapper {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminProductForm;