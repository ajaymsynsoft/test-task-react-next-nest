export interface ProductDTO {
  id: number
  name: string
  imageUrl?: string
  price: number
  stock: number
  storeId: number
  store?: any
  status: 'active' | 'inActive'
}
