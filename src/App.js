import Routes from 'routes/routes';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import ProgressAlerts from 'shared/progressAlerts/ProgressAlerts';

const App = () => {
  return (
    <>
      <ProgressAlerts />
      <CssBaseline />
      <Routes />
    </>
  );
};

export default App;
