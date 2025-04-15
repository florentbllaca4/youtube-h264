import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';  // Shtoni CSS-in tuaj, siç kërkohet për Tailwind, etj.
import App from './App';  // Ose cilado komponent që keni për aplikacionin tuaj


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
