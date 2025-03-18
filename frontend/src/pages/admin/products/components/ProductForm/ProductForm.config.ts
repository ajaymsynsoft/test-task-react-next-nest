import * as yup from 'yup'
import { stringTest, emailTest } from '@/utils'
import { ProductDTO } from '@/dto'

export const schema = yup.object({
  isEditMode: yup.boolean().required(),
  name: yup.string().trim().required().max(100).test(stringTest),
  price: yup.number().required().max(300),
  stock: yup.number().required().max(300),
  storeId: yup.number().required(),  
  image_url: yup.string().optional()
})

export type TSchema = yup.InferType<typeof schema>
