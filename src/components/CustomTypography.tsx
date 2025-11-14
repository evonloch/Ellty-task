import React from 'react'
import { Typography, TypographyProps } from '@mui/material'

export interface CustomTypographyProps extends Omit<TypographyProps, 'variant'> {
  variant?: 'header' | 'pageItem' | 'button'
  children: React.ReactNode
}

/**
 * CustomTypography
 * Centralized typography component with predefined styles
 */
const CustomTypography: React.FC<CustomTypographyProps> = ({
  variant = 'pageItem',
  children,
  sx = {},
  ...props
}) => {
  const baseStyle = {
    fontFamily: '"Montserrat", monospace',
    fontWeight: 400,
    fontStyle: 'normal',
    lineHeight: 1.3,
    letterSpacing: '0px',
    verticalAlign: 'middle' as const,
    color: '#1F2128',
  }

  const variantStyles = {
    header: {
      ...baseStyle,
      fontSize: '14px',
    },
    pageItem: {
      ...baseStyle,
      fontSize: '14px',
    },
    button: {
      ...baseStyle,
        fontSize: '14px',
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
