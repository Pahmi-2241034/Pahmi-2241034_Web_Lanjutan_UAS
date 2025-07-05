import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoryPage';
import ProductsPage from './pages/ProductPage';
import SuppliersPage from './pages/SupplierPage';
import TransactionsPage from './pages/TransactionPage';
import './App.css';

const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav>
      <ul className="nav-menu">
        <li className="nav-item">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Beranda
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/categories" 
            className={`nav-link ${location.pathname.includes('categories') ? 'active' : ''}`}
          >
            Kategori
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/products" 
            className={`nav-link ${location.pathname.includes('products') ? 'active' : ''}`}
          >
            Produk
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/suppliers" 
            className={`nav-link ${location.pathname.includes('suppliers') ? 'active' : ''}`}
          >
            Supplier
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/transactions" 
            className={`nav-link ${location.pathname.includes('transactions') ? 'active' : ''}`}
          >
            Transaksi
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <div className="page-container">
        <header className="app-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ color: 'var(--primary-color)' }}>E-Commerce Admin</h1>
            <Navigation />
          </div>
        </header>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/suppliers" element={<SuppliersPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;