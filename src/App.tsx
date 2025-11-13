import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import PagesModal, { PageItem } from './components/PagesModal'
import theme from './theme'

const demoPages: PageItem[] = [
  { id: 'p1', label: 'Page 1' },
  { id: 'p2', label: 'Page 2' },
  { id: 'p3', label: 'Page 3' },
  { id: 'p4', label: 'Page 4' },
  { id: 'p5', label: 'Page 5' },
  { id: 'p6', label: 'Page 6' },
]

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PagesModal
        pages={demoPages}
        initialSelected={[]}
        onDone={(selected) => {
          console.log('Done selected:', selected)
        }}
      />
    </ThemeProvider>
  )
}
