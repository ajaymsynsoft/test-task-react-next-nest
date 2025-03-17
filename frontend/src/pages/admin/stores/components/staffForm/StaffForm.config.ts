import * as yup from 'yup'
import { passwordTest, phoneTest, stringTest, emailTest } from '@/utils'
import { StaffDTO } from '@/dto'

export const schema = yup.object({
  isEditMode: yup.boolean().required(),
  firstName: yup.string().trim().required().max(100).test(stringTest),
  lastName: yup.string().trim().required().max(100).test(stringTest),
  email: yup.string().email().trim().required().max(300).test(emailTest),
  phone: yup.string().trim().required().test(phoneTest),
  password: yup.string().when('isEditMode', {
    is: true,
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.trim().required().test(passwordTest).max(100),
  }),
  roleId: yup.number().required(),
  status: yup.string<StaffDTO['status']>().required(),
})

export type TSchema = yup.InferType<typeof schema>
