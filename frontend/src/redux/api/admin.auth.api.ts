import { api } from './api.config'
import { AuthApiResponse } from '@/pages/admin/AdminAuth.type'
import { OrganizationDTO } from '@/dto'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthApiResponse, { email: string; password: string }>({
      query: (body) => ({
        url: '/auth/adminLogin',
        method: 'POST',
        body,
        headers: { hideToast: 'true' },
      }),
    }),   
  }),
})

export const { useLoginMutation } = extendedApi
