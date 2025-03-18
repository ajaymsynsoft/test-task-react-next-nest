import { Pagination, PaginationApiResponse } from '@/types'
import { api } from '../api.config'
import { StoreDTO } from '@/dto'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addStore: builder.mutation<void, Partial<StoreDTO>>({
      query: (body) => ({ url: '/admin/store', method: 'POST', body }),
      invalidatesTags: (result, error) => (!error ? [{ type: 'store', id: 'LIST' }] : []),
    }),

    updateStore: builder.mutation<void, Partial<StoreDTO>>({
      query: (body) => ({ url: `/admin/store/${body.id}`, method: 'PUT', body }),
      invalidatesTags: (result, error, { id }) => (!error ? [{ type: 'store', id }] : []),
    }),

    deleteStore: builder.mutation<void, number>({
      query: (id) => ({ url: `/admin/store/${id}`, method: 'DELETE' }),
      invalidatesTags: (result, error, id) =>
        !error
          ? [
              { type: 'store', id },
              { type: 'store', id: 'LIST' },
            ]
          : [],
    }),

    getStore: builder.query<StoreDTO, number>({
      query: (id) => `/admin/store/${id}`,
      providesTags: (result, error, id) => (!error ? [{ type: 'store', id }] : []),
    }),

    getStoreList: builder.query<PaginationApiResponse<StoreDTO>, Pagination>({
      query: (params) => ({ url: `/admin/store`, params }),
      providesTags: (result, error) => (!error ? [...result!.list.map(({ id }) => ({ type: 'store' as const, id })), { type: 'store', id: 'LIST' }] : [{ type: 'store', id: 'LIST' }]),
    }),

    getAllStoreList: builder.query<{ id: number; name: string }[], void>({
      query: () => '/admin/store/list',
      providesTags: (result, error) => (!error ? [{ type: 'store', id: 'ROLE_LIST' }] : []),
    }),
  }),
})

export const { useAddStoreMutation, useUpdateStoreMutation, useDeleteStoreMutation, useGetStoreQuery, useGetStoreListQuery, useGetAllStoreListQuery } = extendedApi
