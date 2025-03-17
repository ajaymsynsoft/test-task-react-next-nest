import { Pagination, PaginationApiResponse } from '@/types'
import { api } from '../api.config'
import { StaffDTO } from '@/dto'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addStaff: builder.mutation<void, Omit<StaffDTO, 'id'> & { password: string }>({
      query: (body) => ({ url: '/v1/Staff', method: 'POST', body }),
      invalidatesTags: (result, error) => (!error ? [{ type: 'staff', id: 'LIST' }] : []),
    }),

    updateStaff: builder.mutation<void, Omit<StaffDTO, 'password'>>({
      query: (body) => ({ url: `/v1/Staff/${body.id}`, method: 'PUT', body }),
      invalidatesTags: (result, error, { id }) => (!error ? [{ type: 'staff', id }] : []),
    }),

    deleteStaff: builder.mutation<void, number>({
      query: (id) => ({ url: `/v1/Staff/${id}`, method: 'DELETE' }),
      invalidatesTags: (result, error, id) =>
        !error
          ? [
              { type: 'staff', id },
              { type: 'staff', id: 'LIST' },
            ]
          : [],
    }),

    getStaff: builder.query<StaffDTO, number>({
      query: (id) => `/v1/Staff/${id}`,
      providesTags: (result, error, id) => (!error ? [{ type: 'staff', id }] : []),
    }),

    getStaffList: builder.query<PaginationApiResponse<StaffDTO>, Pagination>({
      query: (params) => ({ url: `/v1/staff/all`, params }),
      providesTags: (result, error) => (!error ? [...result!.list.map(({ id }) => ({ type: 'staff' as const, id })), { type: 'staff', id: 'LIST' }] : [{ type: 'staff', id: 'LIST' }]),
    }),

    getAssignStaffList: builder.query<(Pick<StaffDTO, 'id' | 'firstName' | 'lastName' | 'role'> & { staffId: number })[], void>({
      query: () => ({ url: '/v1/Staff/list/assign' }),
      providesTags: (result, error) => (!error ? [...result!.map(({ id }) => ({ type: 'staff' as const, id })), { type: 'staff', id: 'LIST' }] : [{ type: 'staff', id: 'LIST' }]),
    }),

    getStaffRoleList: builder.query<{ id: number; name: string }[], void>({
      query: () => '/v1/Staff/roles',
      providesTags: (result, error) => (!error ? [{ type: 'staff', id: 'ROLE_LIST' }] : []),
    }),
  }),
})

export const { useAddStaffMutation, useUpdateStaffMutation, useDeleteStaffMutation, useGetStaffQuery, useGetStaffListQuery, useGetAssignStaffListQuery, useGetStaffRoleListQuery } = extendedApi
