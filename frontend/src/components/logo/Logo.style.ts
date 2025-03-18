import { alpha } from '@mui/material'
import { Style } from '@/types'

export const style: Style = {
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    flexDirection: 'row',
    gap: 1.5,
    alignItems: 'center',
  },
  iconBox: {
    height: 40,
    width: 40,
    background: (theme: any) => alpha(theme.palette.primary.main, 0.1),
    borderRadius: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'primary.main',
    fontWeight: 700,
    fontSize: 23,
  },
  name: {
    fontSize: 21,
    fontWeight: 700,
    color: 'text.primary',
    letterSpacing: 0.5,
    whiteSpace: 'nowrap',
  },
}
