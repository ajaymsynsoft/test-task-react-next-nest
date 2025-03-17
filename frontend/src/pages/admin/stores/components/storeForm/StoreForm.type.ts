import { StoreDTO } from '@/dto'

export type StoreFormProps =
  | {
      isEditMode: false
      data?: void
    }
  | {
      isEditMode: true
      data: StoreDTO
    }
