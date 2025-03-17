export interface ProductDTO {
  id: number
  name: string
  image_url: string
  price: string
  stock: string
  status: 'pending' | 'active' | 'inactive'
}
