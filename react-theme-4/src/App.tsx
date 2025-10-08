import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import ToastAlert from '@/components/ui/ToastAlert';
import { useAppSelector } from './store/hooks';
import Routes from './routes/routes';

const ThemeWrapper = () => {
  const theme = useAppSelector(state => state.ui.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <>
      <Routes />
      <ToastAlert />
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
