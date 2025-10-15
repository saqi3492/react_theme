import { BrowserRouter } from 'react-router-dom';
import ProgressAlerts from './components/layout/loader/ProgressAlerts';
import Routes from './routes/routes';
kkk








const ThemeWrapper = () => {
  return (
    <>
      <Routes />
      <ProgressAlerts />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ThemeWrapper />
    </BrowserRouter>
  );
};

export default App;
