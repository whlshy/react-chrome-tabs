import React from 'react'
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
import Demo from './components/Demo.js'

root.render(
  <Demo />
)