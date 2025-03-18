import { EventDTO } from '@/dto'
import { BookingDTO } from '@/dto/Booking.dto'

export type EventCardProps = {
  data: EventDTO
}

export type EventCardDashboardProps = {
  data: NonNullable<BookingDTO['event']>
}
