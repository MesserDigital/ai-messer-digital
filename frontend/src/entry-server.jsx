// Build-time renderer used by scripts/prerender.mjs (never shipped to browsers).
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

export function render() {
  return renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
