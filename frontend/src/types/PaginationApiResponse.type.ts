export type PaginationApiResponse<List> = {
  list: List[]
  totalCount: number
  totalRecords: number
  totalPages: number
}
