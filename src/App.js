import Routes from 'routes/routes';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
// import ProgressAlerts from 'shared/progressAlerts/ProgressAlerts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // If a user leaves your application and returns and the query data is stale, TanStack Query automatically requests fresh data for you in the background, to disable this globally do following. we can also disable/enable this in every request
      refetchOnWindowFocus: false // default: true
    }
  }
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ProgressAlerts /> */}
      <CssBaseline />
      <Routes />
    </QueryClientProvider>
  );
};

export default App;
