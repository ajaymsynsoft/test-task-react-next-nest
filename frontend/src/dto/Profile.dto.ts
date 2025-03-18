import { TRoles } from '@/types'

export type ProfileDTO = {
  id: number
  name: string
  phone: string
  email: string
  role: TRoles
}
