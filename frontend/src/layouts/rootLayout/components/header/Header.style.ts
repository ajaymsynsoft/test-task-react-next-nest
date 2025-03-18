import { Style } from '@/types'
import { grey } from '@mui/material/colors'

export const style: Style = {
  root: {
    borderBottom: 1,
    borderColor: 'divider',
  },
  container: {
    display: 'flex',
    gap: 3,
    minHeight: 66,
  },
  logoContainer: {
    flexFlow: 'row',
    mr: 'auto',
  },
  button: {
    py: 1,
    px: 2.5,
  },
  navItem: {
    typography: 'body1',
    px: 2,
    fontWeight: 500,
    ':hover': {
      bgcolor: grey[100],
    },
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
