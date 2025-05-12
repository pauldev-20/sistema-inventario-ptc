import { type Category } from '@/modules/categories/types'

export interface Product {
  id: number
  name: string
  description: string | null
  price: number
  imageUrl: string | null
  createdAt: Date
  updatedAt: Date
  category: Omit<Category, 'createdAt' | 'updatedAt'>
}

export interface ProductsQuery {
  page?: number
  perPage?: number
  orderBy?: OrderBy
  sortOrder?: SortOrder
  categoryId?: number
}

export interface ProductCreate {
  name: string
  description?: string
  price: number
  categoryId: number
  image?: File
}

export interface ProductUpdate extends Partial<ProductCreate> {}

export enum OrderBy {
  ID = 'id',
  NAME = 'name',
  DESCRIPTION = 'description',
  PRICE = 'price',
  IMAGE_URL = 'imageUrl',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt'
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}
