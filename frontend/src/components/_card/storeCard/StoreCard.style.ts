import { Style } from '@/types'

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
    alignItems: 'start',
    flexFlow: 'column',
    p: 2.5,
    gap: 2,
  },
}
