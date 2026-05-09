import { createTheme, type Theme } from '@mui/material/styles'

export const buildTheme = (mode: 'light' | 'dark'): Theme =>
  createTheme({
    palette: {
      mode,
      primary: { main: '#1976d2' },
      secondary: { main: '#dc004e' },
    },
    typography: {
      fontFamily: ['Roboto', 'sans-serif'].join(','),
    },
  })
