import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserSignupPage from './components/log-signup/UserSignupPage';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserSignupPage />
  </React.StrictMode>
);
