import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './store/AppContext'
import { ToastProvider } from './store/ToastContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </ToastProvider>
  </StrictMode>,
)
