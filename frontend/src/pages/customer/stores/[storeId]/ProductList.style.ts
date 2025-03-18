import { Style } from '@/types/Style.type'

export const style: Style = {
  bannerBox: {
    borderRadius: 1.5,
    overflow: 'hidden',
  },
  bookingCard: {
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: 24,
    p: { xs: 0, sm: 1 },
  },
  bookingCardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2.5,
  },
  priceContainer: {
    typography: 'h2',
    flexFlow: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  listItem: {
    gap: 2,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    '.icon': {
      color: 'text.secondary',
      fontSize: 21,
    },
  },
}
