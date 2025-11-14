import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import PagesModal, { PageItem } from './components/PagesModal'
import theme from './theme'

const DEMO_PAGES: PageItem[] = [
  { id: 'p1', label: 'Page 1' },
  { id: 'p2', label: 'Page 2' },
  { id: 'p3', label: 'Page 3' },
  { id: 'p4', label: 'Page 4' },
  { id: 'p5', label: 'Page 5' },
  { id: 'p6', label: 'Page 6' },
]

const App = () => {
  const handleDone = (selected: string[]) => {
    if (selected.length > 0) {
      alert(`Selected pages: ${selected.join(', ')}`)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PagesModal
        pages={DEMO_PAGES}
        initialSelected={[]}
        onDone={handleDone}
      />
    </ThemeProvider>
  )
}

export default App

