import { api } from './api.config'
import { AuthApiResponse } from '@/pages/auth/Auth.type'
import { OrganizationDTO } from '@/dto'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthApiResponse, { email: string; password: string }>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
        headers: { hideToast: 'true' },
      }),
    }),

    register: builder.mutation<AuthApiResponse, FormData>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
        formData: true,
        // headers: { hideToast: 'true' },
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = extendedApi
