


// src/index.js
// import React from 'react';
import * as React from 'react';
import ReactDOM from 'react-dom';
import './styles.css'; // Add this line to import the CSS file
import App from './App.js';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
