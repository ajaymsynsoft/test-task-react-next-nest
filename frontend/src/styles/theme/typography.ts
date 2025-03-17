import { Theme, ThemeOptions } from '@mui/material'
import { Plus_Jakarta_Sans } from 'next/font/google'

const plusJakartaSansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export const createTypography = () => {
  return {
    fontFamily: `${plusJakartaSansFont.style.fontFamily}, system-ui, sans-serif`,
    h1: {
      fontSize: 24,
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: 20,
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: 18,
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: 17,
      fontWeight: 500,
      lineHeight: 1.2,
    },
    body1: {
      fontSize: 16,
      fontWeight: 500,
      lineHeight: 1.2,
    },
    body2: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 1.2,
    },
    button: {
      textTransform: 'unset',
      lineHeight: 1.2,
    },
  } as Theme['typography']
}

export const overridesTypography = (theme: Theme) => {
  return {
    h1: theme.unstable_sx({
      color: 'text.primary',
    }),
    h2: theme.unstable_sx({
      color: 'text.primary',
    }),
    h3: theme.unstable_sx({
      color: 'text.secondary',
    }),
    h4: theme.unstable_sx({
      color: 'text.secondary',
    }),
    body1: theme.unstable_sx({
      color: 'text.secondary',
    }),
    body2: theme.unstable_sx({
      color: 'text.secondary',
    }),
  } as ThemeOptions['typography']
}
