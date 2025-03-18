import { Style } from '@/types'
import { alpha } from '@mui/material'

export const style: Style = {
  root: {
    '--border-radius': '12px',
    borderRadius: 'var(--border-radius)',
    height: 1,
    ':hover': {
      boxShadow: '4',
    },
  },
  box: {
    height: 1,
    width: 1,
  },
  contentBox: {
    p: 3,
    height: 1,
    alignItems: 'start',
    gap: { xs: 3, sm: 4 },
  },
  thumbnailBox: {
    borderRadius: 'var(--border-radius)',
    overflow: 'hidden',
    position: 'relative',
    height: 1,
    bgcolor: 'divider',
    minHeight: 250,
  },
  listItem: {
    gap: 1.5,
    flexDirection: 'row',
    overflow: 'hidden',
    color: 'primary.main',
  },
  listItemLabel: {
    color: 'inherit',
  },
  bookingButton: {
    zIndex: 0,
    border: 1,
    borderColor: (theme) => alpha(theme.palette.primary.main, 0.1),
  },
}
