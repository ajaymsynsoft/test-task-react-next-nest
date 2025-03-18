import * as yup from 'yup'
import { stringTest } from '@/utils'

export const schema = yup.object({
  isEditMode: yup.boolean().required(),
  name: yup.string().trim().required().max(100).test(stringTest),
  price: yup.number().required().max(300),
  stock: yup.number().required().max(300),
  storeId: yup.number().required(),
  imageUrl: yup.string(),
})

export type TSchema = yup.InferType<typeof schema>
