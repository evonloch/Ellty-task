import { Typography, TypographyProps } from '@mui/material'
import { TYPOGRAPHY, COLORS } from '../constants/colors'

export interface CustomTypographyProps extends Omit<TypographyProps, 'variant'> {
  variant?: 'header' | 'pageItem' | 'button'
  children: React.ReactNode
}
export const baseStyle = {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.fontWeight.regular,
    fontStyle: 'normal',
    lineHeight: TYPOGRAPHY.lineHeight,
    letterSpacing: TYPOGRAPHY.letterSpacing,
    verticalAlign: 'middle',
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.fontSize.small,
  } as const
  
const CustomTypography: React.FC<CustomTypographyProps> = ({
  variant = 'pageItem',
  children,
  sx = {},
  ...props
}) => {
  

  const variantStyles = {
    header: {
      ...baseStyle,
      fontSize: TYPOGRAPHY.fontSize.small,
    },
    pageItem: {
      ...baseStyle,
      fontSize: TYPOGRAPHY.fontSize.small,
    },
    button: {
      ...baseStyle,
      fontSize: TYPOGRAPHY.fontSize.small,
    },
  }

  return (
    <Typography
      sx={{
        ...variantStyles[variant],
        ...(typeof sx === 'object' ? sx : {}),
      }}
      {...props}
    >
      {children}
    </Typography>
  )
}

export default CustomTypography
