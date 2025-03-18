export interface OrderDTO {
  id: number
  name: string
  productId: number
  store?: any
  status: 'completed' | 'return'
}
