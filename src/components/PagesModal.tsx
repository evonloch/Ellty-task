import React, { useState, useEffect } from 'react'
import {
  Dialog,
  Box,
  Checkbox,
  Button,
  Divider,
  Typography,
} from '@mui/material'

export type PageItem = {
  id: string
  label: string
}

export type PagesModalProps = {
  open: boolean
  onClose: () => void
  pages?: PageItem[]
  initialSelected?: string[]
  onDone?: (selectedIds: string[]) => void
  title?: string
}

/**
 * PagesModal
 * A reusable modal that matches the design: "All pages" header with checkbox,
 * a list of page items with checkboxes on the right, and a golden Done button.
 * Accessible and keyboard-friendly.
 */
const PagesModal: React.FC<PagesModalProps> = ({
  open,
  onClose,
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
    onClose()
  }

  const allSelected = pages.length > 0 && selected.size === pages.length
  const handleToggleAll = () => {
    if (allSelected) setSelected(new Set())
    else setSelected(new Set(pages.map((p) => p.id)))
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="pages-modal-title"
      PaperProps={{
        sx: {
          width: 460,
          maxWidth: '90vw',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
        },
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
        }}
        id="pages-modal-title"
        
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

        {/* Checkbox with hover check image and a press-state image */}
        <Checkbox
            checked={allSelected}
            onChange={handleToggleAll}
            inputProps={{ 'aria-label': 'select all pages' }}
            disableRipple           
            // custom empty icon that contains hover-image and pressed-image
            icon={
                <Box
                    className="emptyIcon"
                    sx={{
                        width: 23,
                        height: 23,
                        border: '1.595px solid #e7e1e1cc',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'border-color 120ms ease, background-color 120ms ease, transform 120ms ease, box-shadow 120ms ease',
                        position: 'relative',
                        overflow: 'visible', // allow outer glow
                        boxShadow: 'none', // no glow by default
                    }}
                >
                    {/* Image that appears on hover (default opacity 0) */}
                    <Box
                        component="img"
                        src="/icons/hover-check.svg"
                        alt=""
                        className="hoverImg"
                        sx={{
                            width: '15.64px',
                            height: '11.04px',
                            opacity: 0,
                            transition: 'opacity 120ms ease, transform 120ms ease',
                            transform: 'scale(0.95)',
                            position: 'absolute',
                        }}
                    />
                    {/* Image that appears when pressing (mouse down / active or keyboard focus+press) */}
                    <Box
                        component="img"
                        src="/icons/pressing-check.svg"
                        alt=""
                        className="pressedImg"
                        sx={{
                            width: '15.64px',
                            height: '11.04px',
                            opacity: 0,
                            transition: 'opacity 80ms ease, transform 80ms ease',
                            transform: 'scale(0.98)',
                            position: 'absolute',
                        }}
                    />
                </Box>
            }
            // custom checked icon (when actually selected) with pressed state image
            checkedIcon={
                <Box
                    className="checkedIcon"
                    sx={{
                        width: 23,
                        height: 23,
                        borderRadius: '6px',
                        backgroundColor: '#2469F6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 120ms ease, transform 120ms ease, box-shadow 120ms ease',
                        position: 'relative',
                        overflow: 'visible',
                        boxShadow: 'none', // no glow by default
                    }}
                >
                    <Box
                        component="img"
                        src="/icons/check.svg"
                        alt=""
                        className="checkedImg"
                        sx={{ 
                          width: '15.64px',
                          height: '11.04px',
                          position: 'absolute',
                        }}
                    />
                    <Box
                        component="img"
                        src="/icons/check.svg"
                        alt=""
                        className="checkedPressedImg"
                        sx={{ 
                          width: '15.64px',
                          height: '11.04px',
                          position: 'absolute',
                        }}
                    />
                </Box>
            }
            sx={{
                padding: 0,
                height: '23px',
                width: '23px',
                '& .MuiSvgIcon-root': {
                    fontSize: 22,
                },
                // show the hover image only when hovering the checkbox root and tweak visuals
                '&:hover': {
                    '.hoverImg': { opacity: 1, transform: 'scale(1)' },
                    '.emptyIcon': {
                        border: '1.5px solid #bdbdbd',
                        borderRadius: '6px',
                        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)',
                        transform: 'translateZ(0)',
                    },
                },
                // pressed state (mouse down) — show pressed images and slightly tweak icons
                '&:active': {
                  '.pressedImg': { opacity: 1, transform: 'scale(1)' },
                  '.checkedPressedImg': { opacity: 1, transform: 'scale(1)' },
                  '.emptyIcon': {
                    transform: 'scale(1)',
                    border: '1.5px solid #bdbdbd',
                    // tight, compact blue glow matching the expected design
                    boxShadow: '0 0 0 2.3px rgba(147, 170, 228, 0.25), 0 0 8px rgba(147, 170, 228, 0.35)',
                    // boxShadow: '0 0 0 3px #eaf0fe #eaf0fe'
                  },
                  '.checkedIcon': {
                    transform: 'scale(1)',
                    boxShadow: '0 0 0 2.3px rgba(147, 170, 228, 0.25), 0 0 8px rgba(147, 170, 228, 0.35)',
                  },
                },
                // also show pressed image when the control has keyboard focus and user triggers (focus-visible helps keyboard)
                '&.Mui-focusVisible': {
                    '.pressedImg': { opacity: 1, transform: 'scale(1)' },
                    '.checkedPressedImg': { opacity: 1, transform: 'scale(1)' },
                    '.emptyIcon': {
                        boxShadow: '0 0 0 2.3px rgba(147, 170, 228, 0.25), 0 0 8px rgba(147, 170, 228, 0.35)',
                    },
                    '.checkedIcon': {
                         boxShadow: '0 0 0 2.3px rgba(147, 170, 228, 0.25), 0 0 8px rgba(147, 170, 228, 0.35)',
                    },
                },
                // when checked + hover, change checked background color
                '&.Mui-checked:hover': {
                    '.checkedIcon': {
                        backgroundColor: '#5087F8',
                        transform: 'scale(1)',
                    },
                    '.hoverImg' : { opacity: 1, transform: 'scale(1)'} 
                },
                // when checked + active (press), change checked pressed visuals
                '&.Mui-checked:active': {
                    '.checkedIcon': {
                        backgroundColor: '#2469F6', 
                        transform: 'scale(1)',
                    },
                    '.checkedPressedImg': { opacity: 1, transform: 'scale(1)' },
                    '.hoverImg': { opacity: 1, transform: 'scale(1)' }
                },
            }}
        />
    </Box>

      <Divider sx={{ borderColor: '#f0f0f0' }} />

      {/* Page items list */}
      <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
        {pages.map((p) => {
          const checked = selected.has(p.id)
          return (
            <Box key={p.id}>
              <Box
                onClick={() => handleToggle(p.id)}
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
                <Checkbox
                  checked={checked}
                  onChange={() => handleToggle(p.id)}
                  inputProps={{ 'aria-labelledby': `checkbox-list-label-${p.id}` }}
                  sx={{
                    padding: 0,
                    height: '23px',
                    width: '23px',
                    border: '1.6px solid #e7e1e1cc',
                    borderRadius: '6px',
                    color: '#FFFFFF',
                    '&.Mui-checked': { color: '#9e9e9e' },
                    '& .MuiSvgIcon-root': {
                    fontSize: 22,
                    },
            }}
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
    </Dialog>
  )
}

export default PagesModal
