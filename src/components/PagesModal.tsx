import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Divider,
  Typography,
} from '@mui/material'
import CustomCheckbox from './CustomCheckbox'

export type PageItem = {
  id: string
  label: string
}

export type PagesModalProps = {
  pages?: PageItem[]
  initialSelected?: string[]
  onDone?: (selectedIds: string[]) => void
  title?: string
}

/**
 * PagesModal (now a full-page component)
 * Displays a pages list with checkboxes and a Done button on a full-width page layout.
 * Accessible and keyboard-friendly.
 */
const PagesModal: React.FC<PagesModalProps> = ({
  pages = [],
  initialSelected = [],
  onDone,
  title = 'All pages',
}) => {
  const [selected, setSelected] = useState<Set<string>>(new Set(initialSelected))

  useEffect(() => {
    setSelected(new Set(initialSelected))
  }, [initialSelected, open])

  const handleToggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleDone = () => {
    onDone?.(Array.from(selected))
  }

  const allSelected = pages.length > 0 && selected.size === pages.length
  const handleToggleAll = () => {
    if (allSelected) setSelected(new Set())
    else setSelected(new Set(pages.map((p) => p.id)))
  }

  // Header row hover/press states
  const [headerIsHovering, setHeaderIsHovering] = React.useState(false)
  const [headerIsPressed, setHeaderIsPressed] = React.useState(false)

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Box
        sx={{
          width: 460,
          maxWidth: '90vw',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
          backgroundColor: '#fff',
        }}
      >
      {/* Header with "All pages" and checkbox */}
    <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            py: 2.5,
            minHeight: '64px',
            cursor: 'pointer',
            transition: 'background-color 0.15s ease',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.01)',
            },
        }}
        id="pages-modal-title"
        onMouseEnter={() => setHeaderIsHovering(true)}
        onMouseLeave={() => {
          setHeaderIsHovering(false)
          setHeaderIsPressed(false)
        }}
        onMouseDown={() => setHeaderIsPressed(true)}
        onMouseUp={() => setHeaderIsPressed(false)}
        onClick={() => handleToggleAll()}
    >
        <Typography
            sx={{
                fontSize: '16px',
                fontWeight: 400,
                color: '#000',
                letterSpacing: '-0.01em',
            }}
        >
            {title}
        </Typography>

        {/* Header checkbox: All pages */}
        <CustomCheckbox
          checked={allSelected}
          onChange={handleToggleAll}
          ariaLabel="select all pages"
          isHovering={headerIsHovering}
          isPressed={headerIsPressed}
        />
    </Box>

      <Divider sx={{ borderColor: '#f0f0f0' }} />

      {/* Page items list - scrollable without visible scrollbar */}
      <Box
        sx={{
          maxHeight: '384px', // height for ~6 items (64px per item)
          overflowY: 'auto',
          /* Hide scrollbar for Webkit browsers (Chrome, Safari, Edge) */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          /* Hide scrollbar for Firefox */
          scrollbarWidth: 'none',
          /* Hide scrollbar for IE and Edge (legacy) */
          msOverflowStyle: 'none',
        }}
      >
        {pages.map((p) => {
          const checked = selected.has(p.id)
          const [rowIsHovering, setRowIsHovering] = React.useState(false)
          const [rowIsPressed, setRowIsPressed] = React.useState(false)

          return (
            <Box key={p.id}>
              <Box
                onClick={() => handleToggle(p.id)}
                onMouseEnter={() => setRowIsHovering(true)}
                onMouseLeave={() => {
                  setRowIsHovering(false)
                  setRowIsPressed(false)
                }}
                onMouseDown={() => setRowIsPressed(true)}
                onMouseUp={() => setRowIsPressed(false)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 3,
                  py: 2.5,
                  minHeight: '64px',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.01)',
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: 400,
                    color: '#000',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {p.label}
                </Typography>
                <CustomCheckbox
                  checked={checked}
                  onChange={(isChecked) => {
                    if (isChecked) setSelected(prev => new Set([...prev, p.id]))
                    else setSelected(prev => {
                      const next = new Set(prev)
                      next.delete(p.id)
                      return next
                    })
                  }}
                  ariaLabel={`checkbox-list-label-${p.id}`}
                  isHovering={rowIsHovering}
                  isPressed={rowIsPressed}
                />
              </Box>
              <Divider sx={{ borderColor: '#f0f0f0' }} />
            </Box>
          )
        })}
      </Box>

      {/* Done button */}
      <Box sx={{ px: '20px', pt: '20px', pb: '20px' }}>
        <Button
          variant="contained"
          onClick={handleDone}
          fullWidth
          aria-label="Done"
          sx={{
            height: '40px',
            backgroundColor: '#FFCE22',
            color: '#000',
            fontSize: '16px',
            fontWeight: 500,
            px: '20px',
            py: '10px',
            textTransform: 'none',
            borderRadius: '4px',
            boxShadow: 'none',
            transition: 'background-color 0ms',
            '&:hover': {
              backgroundColor: '#FFD84D',
              boxShadow: 'none',
            },
            '&:active': {
              backgroundColor: '#FFCE22',
              boxShadow: 'none',
            },
          }}
        >
          Done
        </Button>
      </Box>
      </Box>
    </Box>
  )
}

export default PagesModal
