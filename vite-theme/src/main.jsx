import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';
import './index.css';
import AxiosInterceptor from './utils/AxiosInterceptor';
import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryDialog from '@/shared/errorBoundaryDialog/ErrorBoundaryDialog';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

ModuleRegistry.registerModules([AllCommunityModule]);

AxiosInterceptor.initialize();
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
