import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'Kategori Produk',
      description: 'Kelola kategori produk Anda',
      icon: '📋',
      path: '/categories'
    },
    {
      title: 'Daftar Produk',
      description: 'Kelola inventaris produk',
      icon: '📦',
      path: '/products'
    },
    {
      title: 'Supplier',
      description: 'Kelola data supplier',
      icon: '🏭',
      path: '/suppliers'
    },
    {
      title: 'Transaksi',
      description: 'Kelola transaksi penjualan',
      icon: '💰',
      path: '/transactions'
    }
  ];

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Selamat Datang di Aplikasi E-Commerce</h1>
        <p>Kelola toko online Anda dengan mudah</p>
      </header>
      
      <div className="menu-grid">
        {menuItems.map((item, index) => (
          <div 
            key={index} 
            className="menu-card"
            onClick={() => navigate(item.path)}
          >
            <div className="menu-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <button className="nav-button">
              Buka Menu
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;