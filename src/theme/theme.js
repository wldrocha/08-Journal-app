import { createTheme } from '@mui/material/styles'
import { lightGreen, red, teal } from '@mui/material/colors'

export const theme = createTheme({
  palette: {
    primary: {
      main: teal.A700
    },
    secondary: {
      main: lightGreen.A200
    },
    error: {
      main: red.A400
    }
  }
})
