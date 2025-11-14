import { createTheme } from '@mui/material/styles'
import { COLORS } from './constants/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.primary.main,
      contrastText: COLORS.text.secondary,
    },
    background: {
      default: COLORS.background.card,
      paper: COLORS.background.card,
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
