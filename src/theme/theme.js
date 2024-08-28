import { createTheme } from '@mui/material/styles';
// import { GRADIENT_COLOR } from 'utils/constants';

const theme = createTheme({
  //   components: {
  //     MuiButton: {
  //       styleOverrides: {
  //         root: {
  //           textTransform: 'none',
  //           '&.Mui-disabled': {
  //             background: 'rgba(0, 0, 0, 0.12)'
  //           }
  //         },
  //         contained: {
  //           background: GRADIENT_COLOR
  //         },
  //         outlined: {
  //           background: 'transparent', // Ensures outlined buttons do not get the gradient
  //           borderColor: GRADIENT_COLOR // Apply the gradient color to the border if needed
  //         }
  //       }
  //     },
  //     MuiTypography: {
  //       styleOverrides: {
  //         root: {
  //           background: GRADIENT_COLOR,
  //           WebkitBackgroundClip: 'text',
  //           WebkitTextFillColor: 'transparent',
  //           // Optional: Add these lines if you want it to work in Firefox as well
  //           MozBackgroundClip: 'text',
  //           MozTextFillColor: 'transparent'
  //         }
  //       }
  //     }
  //   },
  palette: {
    primary: { main: '#1976d2', light: '#9b8acc' },
    secondary: { main: '#f50057' }
    // Add more custom colors as needed
  }
});

export default theme;
