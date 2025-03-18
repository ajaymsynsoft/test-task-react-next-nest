import { ProductDTO } from '@/dto'

export type ProductFormProps =
  | {
      isEditMode: false
      data?: void
    }
  | {
      isEditMode: true
      data: ProductDTO
    }
