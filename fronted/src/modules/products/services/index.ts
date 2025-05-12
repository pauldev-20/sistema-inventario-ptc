import { type AxiosResponse } from 'axios'
import { type ProductCreate, type Product, type ProductUpdate, type ProductsQuery } from '../types'
import { type ApiData } from '@/modules/common/types'
import { api } from '@/modules/common/core'

export const getProductsRequest = async (data: ProductsQuery): Promise<AxiosResponse<ApiData<Product[]>>> => await api.get('/products', { params: data })
export const createProductRequest = async (data: ProductCreate): Promise<AxiosResponse<ApiData<Product>>> => {
  const formData = new FormData()
  formData.append('name', data.name)
  if (data.description) formData.append('description', data.description)
  formData.append('price', data.price.toString())
  if (data.image) formData.append('image', data.image)
  formData.append('categoryId', data.categoryId.toString())
  return await api.post('/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}
export const updateProductRequest = async ({ id, data }: { id: number, data: ProductUpdate }): Promise<AxiosResponse<ApiData<Product>>> => {
  const formData = new FormData()
  if (data.name) formData.append('name', data.name)
  if (data.description) formData.append('description', data.description)
  if (data.price) formData.append('price', data.price.toString())
  if (data.image) formData.append('image', data.image)
  if (data.categoryId) formData.append('categoryId', data.categoryId.toString())
  return await api.post(`/products/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}
export const deleteProductRequest = async ({ id }: { id: number }): Promise<AxiosResponse<ApiData<{ id: number }>>> => await api.delete(`/products/${id}`)
