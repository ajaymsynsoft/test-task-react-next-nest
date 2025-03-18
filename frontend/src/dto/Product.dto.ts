export interface ProductDTO {
  id: number
  name: string
  image_url?: string
  price: string
  stock: string
  storeId: number
  status: 'active' | 'inActive'
}
