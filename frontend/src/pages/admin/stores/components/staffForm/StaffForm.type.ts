import { StaffDTO } from '@/dto'

export type StaffFormProps =
  | {
      isEditMode: false
      data?: void
    }
  | {
      isEditMode: true
      data: StaffDTO
    }
