import { Pagination, PaginationApiResponse } from '@/types'
import { api } from '../api.config'
import { ProductDTO } from '@/dto'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation<void, Partial<ProductDTO>>({
      query: (body) => ({ url: '/admin/product', method: 'POST', body }),
      invalidatesTags: (result, error) => (!error ? [{ type: 'product', id: 'LIST' }] : []),
    }),

    updateProduct: builder.mutation<void, Partial<ProductDTO>>({
      query: (body) => ({ url: `/admin/product/${body.id}`, method: 'PUT', body }),
      invalidatesTags: (result, error, { id }) => (!error ? [{ type: 'product', id }] : []),
    }),

    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({ url: `/admin/product/${id}`, method: 'DELETE' }),
      invalidatesTags: (result, error, id) =>
        !error
          ? [
              { type: 'product', id },
              { type: 'product', id: 'LIST' },
            ]
          : [],
    }),
    getProduct: builder.query<ProductDTO, number>({
      query: (id) => `/admin/product/${id}`,
      providesTags: (result, error, id) => (!error ? [{ type: 'product', id }] : []),
    }),

    getProductList: builder.query<PaginationApiResponse<ProductDTO>, Pagination>({
      query: (params) => ({ url: `/admin/product`, params }),
      providesTags: (result, error) => (!error ? [...result!.list.map(({ id }) => ({ type: 'product' as const, id })), { type: 'product', id: 'LIST' }] : [{ type: 'product', id: 'LIST' }]),
    }),
  }),
})

export const { useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation, useGetProductQuery, useGetProductListQuery } = extendedApi
