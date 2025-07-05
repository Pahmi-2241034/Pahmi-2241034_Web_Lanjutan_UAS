/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TransactionPage.css';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productId: '',
    quantity: 1,
    customerName: '',
    customerEmail: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [transactionsRes, productsRes] = await Promise.all([
          axios.get('/api/transactions'),
          axios.get('/api/products')
        ]);
        setTransactions(transactionsRes.data);
        setProducts(productsRes.data);
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
      [name]: name === 'quantity' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/api/transactions', {
        ...formData,
        productId: parseInt(formData.productId)
      });
      setTransactions([...transactions, response.data]);
      setFormData({
        productId: '',
        quantity: 1,
        customerName: '',
        customerEmail: ''
      });
      setError('');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to create transaction');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <span style={{ 
          backgroundColor: 'rgba(40, 167, 69, 0.1)',
          color: '#28a745',
          padding: '3px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '600'
        }}>Completed</span>;
      case 'pending':
        return <span style={{ 
          backgroundColor: 'rgba(255, 193, 7, 0.1)',
          color: '#ffc107',
          padding: '3px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '600'
        }}>Pending</span>;
      case 'cancelled':
        return <span style={{ 
          backgroundColor: 'rgba(220, 53, 69, 0.1)',
          color: '#dc3545',
          padding: '3px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '600'
        }}>Cancelled</span>;
      default:
        return <span style={{ 
          backgroundColor: 'rgba(0, 170, 238, 0.1)',
          color: '#00aaee',
          padding: '3px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '600'
        }}>{status}</span>;
    }
  };

  return (
    <>
      <div className="section-card">
        <h2 className="section-title">Create New Transaction</h2>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Product</label>
              <select
                name="productId"
                className="form-control"
                value={formData.productId}
                onChange={handleChange}
                required
              >
                <option value="">Select Product</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name} (Stock: {product.stock})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                className="form-control"
                min="1"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Customer Name</label>
              <input
                type="text"
                name="customerName"
                className="form-control"
                value={formData.customerName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Customer Email</label>
              <input
                type="email"
                name="customerEmail"
                className="form-control"
                value={formData.customerEmail}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Processing...' : 'Create Transaction'}
          </button>
        </form>
      </div>
      
      <div className="section-card">
        <h2 className="section-title">Transaction History</h2>
        
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : transactions.length === 0 ? (
          <div className="empty-state">
            <p>No transactions found. Create your first transaction above.</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>#{transaction.id}</td>
                  <td>
                    {transaction.product?.name || 'N/A'}
                    <div className="text-muted">Qty: {transaction.quantity}</div>
                  </td>
                  <td>
                    {transaction.customerName}
                    <div className="text-muted">{transaction.customerEmail}</div>
                  </td>
                  <td>Rp.{transaction.totalPrice?.toFixed(2) || '0.00'}</td>
                  <td>{getStatusBadge(transaction.status)}</td>
                  <td>
                    {new Date(transaction.createdAt).toLocaleDateString()}
                    <div className="text-muted">
                      {new Date(transaction.createdAt).toLocaleTimeString()}
                    </div>
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

export default TransactionsPage;