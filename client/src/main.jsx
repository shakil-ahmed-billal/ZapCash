import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import './index.css'
import AuthProvider from './providers/AuthProvider'
import router from './router/router'

// Create a client
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
