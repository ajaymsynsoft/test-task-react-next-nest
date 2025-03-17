import { api } from './api.config'
import { AuthApiResponse } from '@/pages/auth/Auth.type'
import { OrganizationDTO } from '@/dto'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthApiResponse, { email: string; password: string }>({
      query: (body) => ({
        url: '/v1/Auth/login',
        method: 'POST',
        body,
        headers: { hideToast: 'true' },
      }),
    }),

    register: builder.mutation<AuthApiResponse, FormData>({
      query: (body) => ({
        url: '/v1/Organization/create',
        method: 'POST',
        body,
        formData: true,
        // headers: { hideToast: 'true' },
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = extendedApi
