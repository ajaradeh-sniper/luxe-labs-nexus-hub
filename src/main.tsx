import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/ThemeProvider'
import { AuthProvider } from '@/contexts/AuthContext'
import { RoleSwitchingProvider } from '@/contexts/RoleSwitchingContext'
import { RealTimeProvider } from '@/components/realtime/RealTimeProvider'
import './index.css'
import './i18n/config'
import App from './App'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="system" storageKey="luxury-labs-theme">
            <AuthProvider>
              <RoleSwitchingProvider>
                <RealTimeProvider>
                  <App />
                  <Toaster />
                </RealTimeProvider>
              </RoleSwitchingProvider>
            </AuthProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
