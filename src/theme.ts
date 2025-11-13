import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#FDD835', // yellow/golden
      contrastText: '#000',
    },
    background: {
      default: '#ffffff',
      paper: '#fff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
})

export default theme
