import { Roles } from '@/types'

export type ProfileDTO = {
  id: number
  firstName: string
  lastName: string
  phone: string
  email: string
  country: string | null
  countryId: number | null
  roleId: number
  fcmToken: string
} & (
  | {
      role: Exclude<Roles, 'superAdmin' | 'customer'>
      organizationId: number
    }
  | {
      role: Extract<Roles, 'superAdmin'>
      organizationId: null
    }
  | {
      role: 'customer'
      customerOrganizationName: string
      customerOrganizationType: string
      customerOrganizationTypeId: number
    }
)
