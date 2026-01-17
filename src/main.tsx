import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from 'react-redux'
import "@github/spark/spark"
import { Toaster } from '@/components/ui/sonner'
import { loadStorageConfig } from '@/lib/storage'
import { store } from '@/store'

import App from './App.tsx'
import { ErrorFallback } from './components/error/ErrorFallback.tsx'

import "./main.css"
import "./styles/theme.css"
import "./index.css"

loadStorageConfig()

const logErrorToConsole = (error: Error, info: { componentStack?: string }) => {
  console.error('Application Error:', error);
  if (info.componentStack) {
    console.error('Component Stack:', info.componentStack);
  }
};

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ErrorBoundary 
      FallbackComponent={ErrorFallback}
      onError={logErrorToConsole}
    >
      <App />
      <Toaster />
    </ErrorBoundary>
  </Provider>
)
