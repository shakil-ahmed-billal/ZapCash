import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import './index.css'
import AuthProvider from './providers/AuthProvider'
import router from './router/router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
      <Toaster />
    </AuthProvider>
  </StrictMode>,
)
