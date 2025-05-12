'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { type Category } from '../types'
import { getCategoriesRequest } from '../services'
import { useAppDispatch } from '@/modules/common/hooks/use-redux'
import { createCategoryAction, deleteCategoryAction, updateCategoryAction } from '../server/actions'
import { type ApiData, type ApiError } from '@/modules/common/types'
import { setNotificationState } from '@/modules/common/reducers/notification-reducer'

const QUERY_KEY_CATEGORIES = 'categories'

export function useCategories() {
  const {
    data,
    isLoading,
    error
  } = useQuery<{ categories: Category[] }>({
    queryKey: [QUERY_KEY_CATEGORIES],
    queryFn: async () => {
      const response = await getCategoriesRequest()
      return {
        categories: (response.data.data ?? []).toSorted((a, b) => {
          return b.id - a.id
        })
      }
    }
  })

  return {
    categories: data?.categories ?? [],
    isLoadingCategories: isLoading,
    errorCategories: error
  }
}

export function useCreateCategory () {
  const queryCategory = useQueryClient()
  const dispatch = useAppDispatch()

  const {
    isPending,
    mutateAsync: createCategory,
    isSuccess,
    data
  } = useMutation({
    mutationFn: createCategoryAction,
    onSuccess: async ({ data, error }: { data?: ApiData<Category>, error?: ApiError }) => {
      if (error ?? !data) {
        dispatch(setNotificationState({ error }))
        return
      }
      queryCategory.setQueryData([QUERY_KEY_CATEGORIES], (prevCategories: { categories?: Category[] }) => {
        return {
          categories: [data.data, ...(prevCategories?.categories ?? [])]
        }
      })
      dispatch(setNotificationState({ message: data.message }))
    }
  })

  return {
    createCategory,
    isCreatingCategory: isPending,
    isSuccessCategory: isSuccess,
    category: data?.data?.data
  }
}

export function useUpdateCategory ({ id }: { id: number }) {
  const queryCategory = useQueryClient()
  const dispatch = useAppDispatch()

  const {
    isPending,
    mutateAsync: updateCategory,
    isSuccess,
    data
  } = useMutation({
    mutationFn: updateCategoryAction,
    onSuccess: ({ data, error }: { data?: ApiData<Category>, error?: ApiError }) => {
      if (error ?? !data) {
        dispatch(setNotificationState({ error }))
        return
      }
      queryCategory.setQueryData([QUERY_KEY_CATEGORIES], (prevCategories: { categories?: Category[] }) => {
        if (prevCategories?.categories && data.data) {
          return {
            categories: prevCategories.categories.map(category => category.id === id ? data.data : category)
          }
        }
        return prevCategories
      })
      dispatch(setNotificationState({ message: data.message }))
    }
  })

  return {
    updateCategory,
    isUpdatingCategory: isPending,
    isSuccessCategory: isSuccess,
    category: data?.data?.data
  }
}

export function useDeleteCategory () {
  const queryCategory = useQueryClient()
  const dispatch = useAppDispatch()

  const {
    isPending,
    mutateAsync: deleteCategory,
    isSuccess,
    data
  } = useMutation({
    mutationFn: deleteCategoryAction,
    onSuccess: ({ data, error }: { data?: ApiData<{ id: number }>, error?: ApiError }) => {
      if (error ?? !data) {
        dispatch(setNotificationState({ error }))
        return
      }
      queryCategory.setQueryData([QUERY_KEY_CATEGORIES], (prevCategories: { categories?: Category[] }) => {
        if (prevCategories?.categories && data.data) {
          return {
            categories: prevCategories.categories.filter(category => category.id !== data.data?.id)
          }
        }
        return prevCategories
      })
      dispatch(setNotificationState({ message: data.message }))
    }
  })

  return {
    deleteCategory,
    isDeletingCategory: isPending,
    isSuccessCategory: isSuccess,
    categoryId: data?.data?.data?.id
  }
}
