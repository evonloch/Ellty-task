import React, { useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, Container, Button } from '@mui/material'
import PagesModal, { PageItem } from './components/PagesModal'
import theme from './theme'

const demoPages: PageItem[] = [
  { id: 'p1', label: 'Page 1' },
  { id: 'p2', label: 'Page 2' },
  { id: 'p3', label: 'Page 3' },
  { id: 'p4', label: 'Page 4' },
]

export default function App() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>([])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ pt: 6 }}>
        <Button variant="contained" onClick={() => setOpen(true)} sx={{ backgroundColor: '#FDD835', color: '#000' }}>
          Open Pages Modal
        </Button>

        <PagesModal
          open={open}
          onClose={() => setOpen(false)}
          pages={demoPages}
          initialSelected={selected}
          onDone={(s) => {
            setSelected(s)
            console.log('Done selected', s)
          }}
        />
      </Container>
    </ThemeProvider>
  )
}
