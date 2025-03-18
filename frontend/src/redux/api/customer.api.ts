import { Pagination, PaginationApiResponse } from '@/types'
import { api } from './api.config'
import { StoreDTO } from '@/dto'
import { OrderDTO } from '@/dto/Order.dto'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({   

    getStoreList: builder.query<PaginationApiResponse<StoreDTO>, Pagination>({
      query: (params) => ({ url: `/customer/stores`, params }),
      providesTags: (result, error) => (!error ? [...result!.list.map(({ id }) => ({ type: 'store' as const, id })), { type: 'store', id: 'LIST' }] : [{ type: 'store', id: 'LIST' }]),
    }),
 
    getProductList:  builder.query<PaginationApiResponse<StoreDTO>, Pagination>({
      query: (params) =>  ({ url: `/customer/products`, params }), 
      providesTags: (result, error) => (!error ? [{ type: 'store', id: 'ROLE_LIST' }] : []),
    }),
    getOrderList:  builder.query<PaginationApiResponse<StoreDTO>, Pagination>({
      query: (params) =>  ({ url: `/customer/orders`, params }), 
      providesTags: (result, error) => (!error ? [{ type: 'store', id: 'ROLE_LIST' }] : []),
    }),

    addOrder: builder.mutation<void, Omit<OrderDTO, 'id'> & { password: string }>({
      query: (body) => ({ url: '/customer/place-order', method: 'POST', body }),
      invalidatesTags: (result, error) => (!error ? [{ type: 'store', id: 'LIST' }] : []),
    }),

    updateOrder: builder.mutation<void, Omit<OrderDTO, 'id'> & { password: string }>({
      query: (body) => ({ url: `/customer/updateOrder/${body.id}`, method: 'POST', body }),
      invalidatesTags: (result, error) => (!error ? [{ type: 'store', id: 'LIST' }] : []),
    }),
   
  }),
})

export const {  useGetStoreListQuery, useGetProductListQuery, useGetOrderListQuery, useAddOrderMutation, useUpdateOrderMutation } = extendedApi
