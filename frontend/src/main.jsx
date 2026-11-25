import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/messer-brand.css';
import './index.css';

const container = document.getElementById('root');
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// The production page is prerendered at build time, so attach to the existing
// HTML. The dev server ships an empty root and renders from scratch.
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app);
} else {
  ReactDOM.createRoot(container).render(app);
}
