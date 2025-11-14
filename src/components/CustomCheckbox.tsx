import React from 'react'
import { Checkbox, Box } from '@mui/material'

export type CustomCheckboxProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  ariaLabel?: string
  isHovering?: boolean
  isPressed?: boolean
}

/**
 * CustomCheckbox
 * A reusable checkbox component with custom styling:
 * - Empty state: light border box (23×23px, 6px border-radius)
 * - Checked state: blue box (#2469F6) with white checkmark
 * - Hover: border changes to #bdbdbd, subtle inset glow
 * - Press: blue glow ring (2.3px spread, 8px blur) on both states
 * - All images load from /icons/ folder
 * 
 * Can receive hover/press states from parent for row-level interactions
 */
const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  ariaLabel = 'checkbox',
  isHovering = false,
  isPressed = false,
}) => {
  return (
    <Checkbox
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      inputProps={{ 'aria-label': ariaLabel }}
      disableRipple
      // custom empty icon (unchecked state)
      icon={
        <Box
          sx={{
            width: 23,
            height: 23,
            border: isHovering ? '1.5px solid #bdbdbd' : '1.595px solid #e1e1e1',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'border-color 120ms ease, box-shadow 120ms ease',
            position: 'relative',
            overflow: 'visible',
            boxShadow: isPressed
              ? '0 0 0 2.3px rgba(147, 170, 228, 0.25), 0 0 8px rgba(147, 170, 228, 0.35)'
              : isHovering
                ? 'inset 0 0 0 1px rgba(0,0,0,0.06)'
                : 'none',
          }}
        >
          {/* Image that appears on hover */}
          <Box
            component="img"
            src="/icons/hover-check.svg"
            alt=""
            sx={{
              width: '15.64px',
              height: '11.04px',
              opacity: isHovering ? 1 : 0,
              transition: 'opacity 120ms ease, transform 120ms ease',
              transform: isHovering ? 'scale(1)' : 'scale(0.95)',
              position: 'absolute',
            }}
          />
          {/* Image that appears when pressing */}
          <Box
            component="img"
            src="/icons/pressing-check.svg"
            alt=""
            sx={{
              width: '15.64px',
              height: '11.04px',
              opacity: isPressed ? 1 : 0,
              transition: 'opacity 80ms ease, transform 80ms ease',
              transform: isPressed ? 'scale(1)' : 'scale(0.98)',
              position: 'absolute',
            }}
          />
        </Box>
      }
      // custom checked icon (checked state)
      checkedIcon={
        <Box
          sx={{
            width: 23,
            height: 23,
            borderRadius: '6px',
            backgroundColor: isHovering ? '#5087F8' : '#2469F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 120ms ease, box-shadow 120ms ease',
            position: 'relative',
            overflow: 'visible',
            boxShadow: isPressed
              ? '0 0 0 2.3px rgba(147, 170, 228, 0.25), 0 0 8px rgba(147, 170, 228, 0.35)'
              : 'none',
          }}
        >
          <Box
            component="img"
            src="/icons/check.svg"
            alt=""
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
            sx={{
              width: '15.64px',
              height: '11.04px',
              opacity: isPressed ? 1 : 0,
              transition: 'opacity 80ms ease, transform 80ms ease',
              transform: isPressed ? 'scale(1)' : 'scale(0.98)',
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
          display: 'none',
        },
      }}
    />
  )
}

export default CustomCheckbox
