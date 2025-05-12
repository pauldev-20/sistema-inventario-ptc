'use server'

import { getExcepcionPayload } from '@/modules/common/lib'
import { type CategoryUpdate, type CategoryCreate } from '../../types'
import { createCategoryRequest, deleteCategoryRequest, updateCategoryRequest } from '../../services'

export async function createCategoryAction (
  { data }: { data: CategoryCreate }
) {
  try {
    const response = await createCategoryRequest({ data })
    return {
      data: response.data
    }
  } catch (error) {
    return {
      error: getExcepcionPayload(error)
    }
  }
}

export async function updateCategoryAction (
  { id, data }: { id: number, data: CategoryUpdate }
) {
  try {
    const response = await updateCategoryRequest({ id, data })
    return {
      data: response.data
    }
  } catch (error) {
    return {
      error: getExcepcionPayload(error)
    }
  }
}

export async function deleteCategoryAction (
  { id }: { id: number }
) {
  try {
    const response = await deleteCategoryRequest({ id })
    return {
      data: response.data
    }
  } catch (error) {
    return {
      error: getExcepcionPayload(error)
    }
  }
}
