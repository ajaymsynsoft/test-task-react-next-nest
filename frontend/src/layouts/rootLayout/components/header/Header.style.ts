import { Style } from '@/types'
import { HEADER_HEIGHT } from '@/layouts/rootLayout/RootLayout.config'

export const style: Style = {
  root: {
    borderBottom: 1,
    borderColor: 'divider',
    mb: 'var(--header-bottom-margin)',
    overflow: 'hidden',
  },
  container: {
    display: 'flex',
    gap: 3,
    height: HEADER_HEIGHT,
  },
  logoContainer: {
    mr: 'auto',
    flexFlow: 'row',
    alignItems: 'center',
  },
  button: {
    py: 1,
    px: 2.5,
  },
  profileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 1,
    '.MuiAvatar-root': {
      outline: '4px solid transparent',
      transition: 'outline-color 0.3s ease',
    },
    ':hover': {
      '.MuiAvatar-root': {
        outlineColor: 'action.hover',
      },
    },
  },
  profileName: {
    fontWeight: 500,
    color: 'text.primary',
    ml: 1,
    mr: 0.25,
    overflow: 'hidden',
    maxWidth: 225,
  },
  divider: {
    height: 20,
    alignSelf: 'center',
    borderColor: 'dividerDark',
  },
  avatar: {
    height: { xs: 45, sm: 35 },
    width: { xs: 45, sm: 35 },
  },
}
