import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import App from './App.tsx'

import { ThemeProvider, createTheme } from '@mui/material'

// customization of MateriaUI components using brandsfetch detected colors and fonts on immudb website
const immudbTheme = createTheme({
  typography: {
    fontFamily: 'Helvetica, sans-serif',
    h1: { fontFamily: 'Monserrat, sans-serif' },
    h2: { fontFamily: 'Monserrat, sans-serif' },
    h3: { fontFamily: 'Monserrat, sans-serif' },
    h4: { fontFamily: 'Monserrat, sans-serif' },
    h5: { fontFamily: 'Monserrat, sans-serif' }
  },
  palette: {
    primary: { main: '#FDBF2C' },
    secondary: { main: '#351D75' },
    info: { main: '#7B79C4' }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <>
    <CssBaseline />
    <ThemeProvider theme={immudbTheme}>
      <App />
    </ThemeProvider>
  </>

  // </React.StrictMode>
)
