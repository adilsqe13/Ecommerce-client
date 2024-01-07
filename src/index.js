import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ToastState from './CONTEXT/State/ToastState';
import ProductState from './CONTEXT/State/ProductState';
import ProfileState from './CONTEXT/State/ProfileState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ToastState>
    <ProfileState>
      <ProductState>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ProductState>
      </ProfileState>
  </ToastState>
);

reportWebVitals();
