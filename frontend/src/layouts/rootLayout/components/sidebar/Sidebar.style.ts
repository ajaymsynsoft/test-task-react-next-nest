import { Style } from '@/types'

export const style: Style = {
  root: {
    width: `var(--sidebar-width)`,
    borderRight: 1,
    borderColor: 'dividerDark',
    height: '100vh',
    overflow: 'hidden',
    position: 'sticky',
    top: 0,
    flexShrink: 0,
    display: { xs: 'none', md: 'flex' },
  },
  logoContainer: {
    px: 2,
    height: 74,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottom: 1,
    borderColor: 'dividerDark',
  },
  menuContainer: {
    flex: 1,
    overflow: 'auto',
    px: 1.5,
    py: 2.5,
  },
  menuHeading: {
    px: 1,
    mb: 1.5,
  },
  menuList: {
    '.MuiMenuItem-root.active:not(.submenu-item)': {
      position: 'relative',
      ':before': {
        content: `''`,
        position: 'absolute',
        height: '60%',
        width: 5,
        bgcolor: 'primary.light',
        left: -12,
        top: '50%',
        transform: 'translateY(-50%)',
        borderRadius: '0 10px 10px 0',
        pointerEvents: 'none',
      },
    },
  },
  profileContainer: {
    p: 2,
    gap: 2,
    borderTop: 1,
    borderColor: 'dividerDark',
  },
  profileBox: {
    flexDirection: { xs: 'row', xl: 'column' },
    gap: 1,
    alignItems: 'center',
    textAlign: { xs: 'left', xl: 'center' },
  },
  circleSize: {
    '--size': { xs: '36px', xl: '50px' },
    width: 'var(--size)',
    height: 'var(--size)',
  },
  logoutBtn: {
    justifyContent: { xs: 'center', lg: 'space-between' },
    px: { xs: undefined, lg: 2 },
    py: { xs: undefined, lg: 0.85 },
  },
}
