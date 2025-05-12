import { api } from '@/modules/common/core'
import { type ApiData } from '@/modules/common/types'
import { type AxiosResponse } from 'axios'
import { type CategoryCreate, type CategoryUpdate, type Category } from '..'

export const getCategoriesRequest = async (): Promise<AxiosResponse<ApiData<Category[]>>> => await api.get('/categories')
export const getCategoryRequest = async ({ id }: { id: number }): Promise<AxiosResponse<ApiData<Category>>> => await api.get(`/categories/${id}`)
export const createCategoryRequest = async ({ data }: { data: CategoryCreate }): Promise<AxiosResponse<ApiData<Category>>> => await api.post('/categories', data)
export const updateCategoryRequest = async ({ id, data }: { id: number, data: CategoryUpdate }): Promise<AxiosResponse<ApiData<Category>>> => await api.patch(`/categories/${id}`, data)
export const deleteCategoryRequest = async ({ id }: { id: number }): Promise<AxiosResponse<ApiData<{ id: number }>>> => await api.delete(`/categories/${id}`)
