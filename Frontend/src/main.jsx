import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Set axios base URL
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);