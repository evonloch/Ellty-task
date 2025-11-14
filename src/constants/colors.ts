export const COLORS = {
  primary: {
    main: '#FFCE22',
    hover: '#FFD84D',
    active: '#FFCE22',
  },
  checkbox: {
    checked: '#2469F6',
    checkedHover: '#5087F8',
    uncheckedBorder: '#e1e1e1',
    uncheckedBorderHover: '#bdbdbd',
    pressGlow: 'rgba(147, 170, 228, 0.25)',
    pressGlowOuter: 'rgba(147, 170, 228, 0.35)',
  },
  text: {
    primary: '#1F2128',
    secondary: '#000',
  },
  divider: '#e6e5e5',
  border: '#EEEEEE',
  background: {
    page: '#f5f5f5',
    card: '#fff',
    hover: 'rgba(0, 0, 0, 0.01)',
  },
  shadow: {
    card: '0px 8px 15px 0px #1414141F, 0px 0px 4px 0px #1414141A',
  },
} as const

export const TYPOGRAPHY = {
  fontFamily: '"Montserrat", monospace',
  fontWeight: {
    regular: 400,
    medium: 500,
  },
  fontSize: {
    small: '14px',
    medium: '16px',
  },
  lineHeight: 1.3,
  letterSpacing: '0px',
} as const

export const SPACING = {
  checkbox: {
    size: 23,
    borderRadius: 6,
  },
  row: {
    height: 42,
    paddingLeft: 22,
    paddingRight: 15,
    paddingVertical: 8,
  },
  card: {
    width: 370,
    borderRadius: 6,
    padding: 10,
  },
  button: {
    height: 40,
    borderRadius: 4,
  },
  divider: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  scrollArea: {
    height: 160,
  },
} as const
