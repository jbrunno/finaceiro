import React from 'react';
import ReactDOM from 'react-dom/client';
import './apm';
import './hotjar';
import App from './App';

const element = document.getElementById('root');
if (element === null)
  throw new Error('Está faltando um elemento "root" no index.html');

const root = ReactDOM.createRoot(element);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
