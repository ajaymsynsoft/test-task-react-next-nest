import * as yup from 'yup'
import { stringTest, emailTest } from '@/utils'
import { ProductDTO } from '@/dto'

export const schema = yup.object({
  isEditMode: yup.boolean().required(),
  name: yup.string().trim().required().max(100).test(stringTest),
  price: yup.string().email().trim().required().max(300).test(emailTest),
  roleId: yup.number().required(),
  status: yup.string<ProductDTO['status']>().required(),
})

export type TSchema = yup.InferType<typeof schema>
