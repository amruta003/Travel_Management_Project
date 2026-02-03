import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import "flowbite"

import { AuthModalProvider } from './context/AuthModalContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthModalProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthModalProvider>
  </BrowserRouter>
)
