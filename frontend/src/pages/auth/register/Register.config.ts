import * as yup from 'yup'
import { passwordTest, stringTest } from '@/utils'

export const schema = yup.object({
  email: yup.string().email().trim().required().max(300),
  fullName: yup.string().trim().required().test(stringTest).max(100),
  password: yup.string().trim().required().test(passwordTest).max(100),
  confirmPassword: yup
    .string()
    .trim()
    .required()
    .oneOf([yup.ref('password')], 'Password and confirm password is different'),
})

export type TSchema = yup.InferType<typeof schema>
