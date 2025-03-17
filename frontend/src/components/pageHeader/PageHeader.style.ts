import { Style } from '@/types'

export const style: Style = {
  root: {
    justifyContent: 'center',
    my: { xs: 2, md: 3 },
    '& ~ *': {
      position: 'relative',
      zIndex: 1,
    },
  },
  heading: {
    fontWeight: 700,
  },
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1.5,
    flexWrap: 'wrap',
  },
  actionContainer: {
    ml: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1.5,
  },
}
