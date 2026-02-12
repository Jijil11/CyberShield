

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { SecurityProvider } from "./Context/SecurityContext";
import './index.css';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';


createRoot(document.getElementById('root')).render(
    <SecurityProvider>
    <App />
    </SecurityProvider>
)

