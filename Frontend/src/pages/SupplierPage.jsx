/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SupplierPage.css';
const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/suppliers');
        setSuppliers(response.data);
      } catch (err) {
        setError('Failed to fetch suppliers');
      } finally {
        setLoading(false);
      }
    };
    fetchSuppliers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/api/suppliers', formData);
      setSuppliers([...suppliers, response.data]);
      setFormData({
        name: '',
        address: '',
        phone: '',
        email: ''
      });
      setError('');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to create supplier');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="section-card">
        <h2 className="section-title">Add New Supplier</h2>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Supplier Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Address</label>
              <textarea
                name="address"
                className="form-control"
                rows="2"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating...' : 'Add Supplier'}
          </button>
        </form>
      </div>
      
      <div className="section-card">
        <h2 className="section-title">Supplier Directory</h2>
        
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : suppliers.length === 0 ? (
          <div className="empty-state">
            <p>No suppliers found. Add your first supplier above.</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map(supplier => (
                <tr key={supplier.id}>
                  <td>
                    <strong>{supplier.name}</strong>
                    <div className="text-muted">{supplier.email}</div>
                  </td>
                  <td>{supplier.phone || '-'}</td>
                  <td>{supplier.address || '-'}</td>
                  <td>
                    <button className="btn btn-primary">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default SuppliersPage;