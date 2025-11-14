import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Divider,
} from '@mui/material'
import CustomCheckbox from './CustomCheckbox'
import CustomTypography from './CustomTypography'

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
          width: '370px',
          maxWidth: '90vw',
          borderRadius: '6px',
          border: '1px solid #EEEEEE',
          boxShadow: '0px 8px 15px 0px #1414141F, 0px 0px 4px 0px #1414141A',
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          height: 'auto',
          py: '10px'
        }}
      >
      {/* Header with "All pages" and checkbox - FIXED, NOT SCROLLABLE */}
    <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pl: "22px",
            pr: "15px",
            py: "8px",
            height: "42px",
            cursor: 'pointer',
            transition: 'background-color 0.15s ease',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.01)',
            },
            flexShrink: 0, // prevent shrinking
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
        <CustomTypography variant="header">
            {title}
        </CustomTypography>

        {/* Header checkbox: All pages */}
        <CustomCheckbox
          checked={allSelected}
          onChange={handleToggleAll}
          ariaLabel="select all pages"
          isHovering={headerIsHovering}
          isPressed={headerIsPressed}
        />
    </Box>

      <Divider
        sx={{
          mx: '15px',
          my: '10px',
          borderColor: '#e6e5e5ff',
          borderBottomWidth: '0.7px',
        }}
      />

      {/* Page items list - ONLY THIS IS SCROLLABLE */}
      <Box
        sx={{
          height: '160px',
          overflowY: 'auto',
          flex: '1 1 auto',
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
                  pl: "22px",
                  pr: "15px",
                  py: "8px",
                  height: "42px",
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.01)',
                  },
                }}
              >
                <CustomTypography variant="pageItem">
                  {p.label}
                </CustomTypography>
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
              {/* <Divider sx={{ borderColor: '#f0f0f0' }} /> */}
            </Box>
          )
        })}
      </Box>

      <Divider
        sx={{
          mx: '15px',
          my: '10px',
          borderColor: '#e6e5e5ff',
          borderBottomWidth: '0.7px',
        }}
      />

      {/* Done button - FIXED, NOT SCROLLABLE */}
      <Box sx={{ px: '15px', pt: "10px", pb: "10px", flexShrink: 0 }}>
      

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
