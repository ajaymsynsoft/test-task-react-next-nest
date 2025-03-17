import { removeCookie } from '@/utils'
import { updateProfile } from '../slice/layout.slice'
import { api } from './api.config'
import { ProfileDTO } from '@/dto'
import { Module } from '@/types'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    profile: builder.query<ProfileDTO & { modules: Record<string, Module> }, void>({
      query: () => '/auth/getProfile',  
      transformResponse(response: any) {   
        return {
          ...response,         
        }
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data }) => dispatch(updateProfile(data)))
          .catch((error) => {
            if (error.meta.response?.status === 401) {
              removeCookie('token')
              window.location.replace('/auth/login')
            }
          })
      },
    }),
  }),
})

export const { useLazyProfileQuery } = extendedApi
