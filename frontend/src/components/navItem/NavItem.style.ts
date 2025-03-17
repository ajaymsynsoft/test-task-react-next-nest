import { alpha } from '@mui/material'
import { Style } from '@/types'
import { NavItemProps } from './NavItem.type'

const submenuLeftAreaSize = 12

export const makeStyle = (size: NavItemProps['size'], isChildren: boolean | undefined): Style => {
  return {
    root: {
      position: 'relative',
      ...(size === 'large' && {
        borderRadius: 1,
        p: 1,
      }),
      '&.active': {
        bgcolor: (theme: any) => alpha(theme.palette.primary.main, 0.07),
        '& *': {
          color: 'primary.main',
        },
      },
      '&.submenu-item': {
        px: '13px',
      },
      '&.submenu-item:before': {
        content: `''`,
        position: 'absolute',
        width: submenuLeftAreaSize,
        height: submenuLeftAreaSize,
        right: '100%',
        bottom: 'calc(50% - 1px)',
        borderBottomLeftRadius: 8,
        border: 1,
        borderColor: 'dividerDark',
        borderWidth: '0 0 1px 1px',
      },
      '&.submenu-item:after': {
        content: `''`,
        position: 'absolute',
        height: 1,
        bgcolor: 'dividerDark',
        width: '1px',
        left: -submenuLeftAreaSize,
        bottom: `calc(50% + ${submenuLeftAreaSize - 1}px)`,
      },
    },
    itemIcon: {
      minWidth: 'unset',
      pr: 1.75,
    },
    itemText: {
      ...(size === 'large' && {
        my: (theme: any) => `${theme.spacing(0.5)} !important`,
      }),
      '& > *': {
        ...(size === 'large' && {
          fontWeight: '500 !important',
        }),
      },
    },
    childrenList: {
      py: 0.75,
      pl: `${submenuLeftAreaSize + 2}px`,
      ml: 2.1,
      overflow: 'hidden',
    },
  }
}
