import { Checkbox, Box } from '@mui/material'
import { COLORS, SPACING } from '../constants/colors'

export type CustomCheckboxProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  ariaLabel?: string
  isHovering?: boolean
  isPressed?: boolean
}

const ICON_SIZE = {
  width: '15.64px',
  height: '11.04px',
}

const TRANSITION_TIMING = {
  default: '120ms ease',
  fast: '80ms ease',
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  ariaLabel = 'checkbox',
  isHovering = false,
  isPressed = false,
}) => {
  const emptyBoxStyles = {
    width: SPACING.checkbox.size,
    height: SPACING.checkbox.size,
    border: isHovering
      ? `1.5px solid ${COLORS.checkbox.uncheckedBorderHover}`
      : `1.595px solid ${COLORS.checkbox.uncheckedBorder}`,
    borderRadius: `${SPACING.checkbox.borderRadius}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: `border-color ${TRANSITION_TIMING.default}, box-shadow ${TRANSITION_TIMING.default}`,
    position: 'relative',
    overflow: 'visible',
    boxShadow: isPressed
      ? `0 0 0 2.3px ${COLORS.checkbox.pressGlow}, 0 0 8px ${COLORS.checkbox.pressGlowOuter}`
      : isHovering
        ? 'inset 0 0 0 1px rgba(0,0,0,0.06)'
        : 'none',
  }

  const checkedBoxStyles = {
    width: SPACING.checkbox.size,
    height: SPACING.checkbox.size,
    borderRadius: `${SPACING.checkbox.borderRadius}px`,
    backgroundColor: isHovering ? COLORS.checkbox.checkedHover : COLORS.checkbox.checked,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: `background-color ${TRANSITION_TIMING.default}, box-shadow ${TRANSITION_TIMING.default}`,
    position: 'relative',
    overflow: 'visible',
    boxShadow: isPressed
      ? `0 0 0 2.3px ${COLORS.checkbox.pressGlow}, 0 0 8px ${COLORS.checkbox.pressGlowOuter}`
      : 'none',
  }

  const imageStyles = (shouldShow: boolean, isFast = false) => ({
    ...ICON_SIZE,
    opacity: shouldShow ? 1 : 0,
    transition: `opacity ${isFast ? TRANSITION_TIMING.fast : TRANSITION_TIMING.default}, transform ${isFast ? TRANSITION_TIMING.fast : TRANSITION_TIMING.default}`,
    transform: shouldShow ? 'scale(1)' : `scale(${isFast ? 0.98 : 0.95})`,
    position: 'absolute',
  })

  return (
    <Checkbox
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      inputProps={{ 'aria-label': ariaLabel }}
      disableRipple
      icon={
        <Box sx={emptyBoxStyles}>
          <Box component="img" src="/icons/hover-check.svg" alt="" sx={imageStyles(isHovering)} />
          <Box component="img" src="/icons/pressing-check.svg" alt="" sx={imageStyles(isPressed, true)} />
        </Box>
      }
      checkedIcon={
        <Box sx={checkedBoxStyles}>
          <Box component="img" src="/icons/check.svg" alt="" sx={{ ...ICON_SIZE, position: 'absolute' }} />
          <Box component="img" src="/icons/check.svg" alt="" sx={imageStyles(isPressed, true)} />
        </Box>
      }
      sx={{
        padding: 0,
        height: `${SPACING.checkbox.size}px`,
        width: `${SPACING.checkbox.size}px`,
        '& .MuiSvgIcon-root': {
          display: 'none',
        },
      }}
    />
  )
}

export default CustomCheckbox
