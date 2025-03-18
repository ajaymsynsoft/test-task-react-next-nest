import * as yup from 'yup'
import { stringTest } from '@/utils'

export const schema = yup.object({
  isEditMode: yup.boolean().required(),
  name: yup.string().trim().required().max(100).test(stringTest),
})

export type TSchema = yup.InferType<typeof schema>
