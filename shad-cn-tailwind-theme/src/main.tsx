import { createRoot } from 'react-dom/client';
import './index.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import AxiosInterceptor from './lib/axios.ts';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

// Register all Community features for ag-grid
ModuleRegistry.registerModules([AllCommunityModule]);

AxiosInterceptor.initialize();

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
