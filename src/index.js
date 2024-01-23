import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//엄격 모드 해제 <React.StrictMode></React.StrictMode>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
