import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'

// Initialize dark mode before render
const savedDarkMode = localStorage.getItem('darkMode') === 'true';
if (savedDarkMode) {
  document.documentElement.classList.add('dark');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster/>
    </BrowserRouter>
  </StrictMode>,
)