import ErrorBoundaryDialog from '@/shared/errorBoundaryDialog/ErrorBoundaryDialog';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Register all Community features
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import store from './store/store';
import AxiosInterceptor from './utils/AxiosInterceptor';
ModuleRegistry.registerModules([AllCommunityModule]);

// initialize axios
AxiosInterceptor.initialize();
// Initialize React Query Client
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={<ErrorBoundaryDialog />}>
        <Router>
          <App />
        </Router>
      </ErrorBoundary>
    </QueryClientProvider>
  </Provider>
);
