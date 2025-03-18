import { axiosInstance } from './api.config.ts'
import { ProductDTO } from '@/dto'
import { ApiResponse } from '@/types'

const getEvent = async (id: string) => {
  return await axiosInstance
    .get<ApiResponse<ProductDTO>>(`/customer/store/public/${id}`)
    .then((respose) => respose.data.data)
    .catch((error) => Promise.reject(error))
}

export const eventService = {
  getEvent,
}
