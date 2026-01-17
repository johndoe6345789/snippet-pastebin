import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from "react-error-boundary";
import "@github/spark/spark"
import { Toaster } from '@/components/ui/sonner'

import App from './App.tsx'
import { ErrorFallback } from './ErrorFallback.tsx'

import "./main.css"
import "./styles/theme.css"
import "./index.css"

const logErrorToConsole = (error: Error, info: { componentStack?: string }) => {
  console.error('Application Error:', error);
  if (info.componentStack) {
    console.error('Component Stack:', info.componentStack);
  }
};

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary 
    FallbackComponent={ErrorFallback}
    onError={logErrorToConsole}
  >
    <App />
    <Toaster />
   </ErrorBoundary>
)
