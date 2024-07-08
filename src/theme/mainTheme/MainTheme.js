import Box from '@mui/material/Box';
import Header from 'theme/header/Header';
import Sidebar from 'theme/Sidebar/Sidebar';
import MainBody from './MainBody';

const MainTheme = () => {
  return (
    <Box>
      <Sidebar />
      <Header />
      <MainBody />
    </Box>
  );
};

export default MainTheme;
