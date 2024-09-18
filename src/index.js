import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import AxiosInterceptor from './utils/axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryDialog from 'shared/errorBoundaryDialog/ErrorBoundaryDialog';

const container = document.getElementById('root');

// initialize axios
AxiosInterceptor.initialize();

const root = createRoot(container);

root.render(
  <Provider store={store}>
    <ErrorBoundary fallback={<ErrorBoundaryDialog />}>
      <Router>
        <App />
      </Router>
    </ErrorBoundary>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
