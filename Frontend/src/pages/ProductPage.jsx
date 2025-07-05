/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    categoryId: '',
    supplierId: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsRes, categoriesRes, suppliersRes] = await Promise.all([
          axios.get('/api/products'),
          axios.get('/api/categories'),
          axios.get('/api/suppliers')
        ]);
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
        setSuppliers(suppliersRes.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/api/products', {
        ...formData,
        categoryId: parseInt(formData.categoryId),
        supplierId: parseInt(formData.supplierId)
      });
      setProducts([...products, response.data]);
      setFormData({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        categoryId: '',
        supplierId: ''
      });
      setError('');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="section-card">
        <h2 className="section-title">Add New Product</h2>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Product Name</label>
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
              <label>Price</label>
              <input
                type="number"
                name="price"
                className="form-control"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Stock</label>
              <input
                type="number"
                name="stock"
                className="form-control"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Category</label>
              <select
                name="categoryId"
                className="form-control"
                value={formData.categoryId}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Supplier</label>
              <select
                name="supplierId"
                className="form-control"
                value={formData.supplierId}
                onChange={handleChange}
                required
              >
                <option value="">Select Supplier</option>
                {suppliers.map(supplier => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="3"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating...' : 'Add Product'}
          </button>
        </form>
      </div>
      
      <div className="section-card">
        <h2 className="section-title">Product Inventory</h2>
        
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <p>No products found. Add your first product above.</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Supplier</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>
                    <strong>{product.name}</strong>
                    {product.description && (
                      <p className="text-muted">{product.description}</p>
                    )}
                  </td>
                  <td>Rp.{product.price.toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td>{product.category?.name}</td>
                  <td>{product.supplier?.name}</td>
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

export default ProductsPage;