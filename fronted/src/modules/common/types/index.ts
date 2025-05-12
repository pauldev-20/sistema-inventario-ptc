export interface ApiError {
  status: boolean
  message: string
  code: number
  errors?: Record<string, string[]>
}

export interface ApiData<DataType = any> {
  status: boolean
  data?: DataType
  meta?: {
    currentPage: number
    nextPage: number
    lastPage: number
    perPage: number
    total: number
  }
  message?: string
}
