import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Renderizar la aplicación raíz dentro del elemento con id 'root' en el DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> {/* Renderizar el componente principal App */}
  </React.StrictMode>
);
