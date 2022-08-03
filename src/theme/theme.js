import { createTheme } from '@mui/material/styles';
import { lightGreen, red, cyan } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: cyan.A400,
    },
    secondary: {
      main: lightGreen.A200,
    },
    error: {
      main: red.A400,
    },
  },
});
