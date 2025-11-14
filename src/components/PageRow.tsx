import { Box, SxProps } from '@mui/material'
import CustomCheckbox from './CustomCheckbox'
import CustomTypography from './CustomTypography'
import { SPACING, COLORS } from '../constants/colors'
import { useRowInteraction } from '../hooks/useRowInteraction'

type PageRowProps = {
  label: string
  checked: boolean
  onToggle: () => void
}

const rowStyles: SxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  pl: `${SPACING.row.paddingLeft}px`,
  pr: `${SPACING.row.paddingRight}px`,
  py: `${SPACING.row.paddingVertical}px`,
  height: `${SPACING.row.height}px`,
  cursor: 'pointer',
  transition: 'background-color 0.15s ease',
  '&:hover': {
    backgroundColor: COLORS.background.hover,
  },
}

const PageRow = ({ label, checked, onToggle }: PageRowProps) => {
  const { isHovering, isPressed, handlers } = useRowInteraction()

  return (
    <Box onClick={onToggle} sx={rowStyles} {...handlers}>
      <CustomTypography variant="pageItem">{label}</CustomTypography>
      <CustomCheckbox
        checked={checked}
        onChange={onToggle}
        ariaLabel={`checkbox-${label}`}
        isHovering={isHovering}
        isPressed={isPressed}
      />
    </Box>
  )
}

export default PageRow
