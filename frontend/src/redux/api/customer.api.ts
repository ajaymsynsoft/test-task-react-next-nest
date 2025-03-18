import { Pagination, PaginationApiResponse } from '@/types'
import { api } from './api.config'
import { OrderDTO, ProductDTO, StoreDTO } from '@/dto'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStoreList: builder.query<PaginationApiResponse<StoreDTO>, Pagination>({
      query: (params) => ({ url: `/customer/stores`, params }),
      providesTags: (result, error) => (!error ? [...result!.list.map(({ id }) => ({ type: 'store' as const, id })), { type: 'store', id: 'LIST' }] : [{ type: 'store', id: 'LIST' }]),
    }),

    getProductList: builder.query<PaginationApiResponse<ProductDTO>, Pagination>({
      query: (params) => ({ url: `/customer/products`, params }),
      providesTags: (result, error) => (!error ? [{ type: 'product', id: 'LIST' }] : []),
    }),

    getOrderList: builder.query<PaginationApiResponse<OrderDTO>, Pagination>({
      query: (params) => ({ url: `/customer/orders`, params }),
      providesTags: (result, error) => (!error ? [{ type: 'order', id: 'LIST' }] : []),
    }),

    addOrder: builder.mutation<void, { name: string; productId: number }>({
      query: (body) => ({ url: '/customer/place-order', method: 'POST', body }),
      invalidatesTags: (result, error) =>
        !error
          ? [
              { type: 'product', id: 'LIST' },
              { type: 'order', id: 'LIST' },
            ]
          : [],
    }),

    updateOrder: builder.mutation<void, { id: number }>({
      query: (body) => ({ url: `/customer/updateOrder/${body.id}`, method: 'PUT', body }),
      invalidatesTags: (result, error) =>
        !error
          ? [
              { type: 'order', id: 'LIST' },
              { type: 'product', id: 'LIST' },
            ]
          : [],
    }),
  }),
})

export const { useGetStoreListQuery, useGetProductListQuery, useGetOrderListQuery, useAddOrderMutation, useUpdateOrderMutation } = extendedApi
