import { Roles } from '@/types'

export type ProfileDTO = {
  id: number
  name: string 
  phone: string
  email: string 
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
