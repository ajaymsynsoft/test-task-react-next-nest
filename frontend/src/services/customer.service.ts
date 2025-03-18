import { axiosInstance } from './api.config.ts'
import { ProductDTO } from '@/dto'
import { ApiResponse } from '@/types'

const getProducts = async (id: string) => {
  return await axiosInstance
    .get<ApiResponse<ProductDTO>>(`/customer/products`,{params:{id}})
    .then((respose) => respose.data.data)
    .catch((error) => Promise.reject(error))
}

export const customerService = {
  getProducts,
}
