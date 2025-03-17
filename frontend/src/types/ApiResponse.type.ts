export type ApiResponse<Data> = {
  data: Data
  httpCode: number
  message: string
}
