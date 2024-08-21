import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import './i18n.ts'; // Import the i18n configuration
import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css'; // Import the ToastContainer styles
import { ToastContainer } from 'react-toastify'; // Import ToastContainer from react-toastify

const rootElement = document.getElementById('root') as HTMLElement;

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
      <ToastContainer /> {/* Add ToastContainer here for global toast notifications */}
    </React.StrictMode>
  );
}

reportWebVitals();
