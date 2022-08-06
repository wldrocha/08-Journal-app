import { createTheme } from '@mui/material/styles'
import { orange, red, teal } from '@mui/material/colors'

export const theme = createTheme({
  palette: {
    primary: {
      main: teal.A700
    },
    secondary: {
      main: orange.A700
    },
    error: {
      main: red.A400
    }
  }
})
