'use server'
import { getExcepcionPayload } from '@/modules/common/lib'
import { deleteProductRequest } from '@/modules/products/services'

export async function deleteProductAction (
  { id }: { id: number }
) {
  try {
    const response = await deleteProductRequest({ id })
    return {
      data: response.data
    }
  } catch (error) {
    return {
      error: getExcepcionPayload(error)
    }
  }
}
