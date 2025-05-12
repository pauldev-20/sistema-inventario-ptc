'use client'

import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { OrderBy, SortOrder, type Product } from '../types'
import { createProductRequest, getProductsRequest, updateProductRequest } from '../services'
import { useAppDispatch } from '@/modules/common/hooks/use-redux'
import { type ApiData, type ApiError } from '@/modules/common/types'
import { setNotificationState } from '@/modules/common/reducers/notification-reducer'
import { getExcepcionPayload } from '@/modules/common/lib'
import { deleteProductAction } from '../server/actions'

const QUERY_KEY_PRODUCTS = 'products'

export function useProducts ({
  page = 1,
  perPage = 10,
  orderBy = OrderBy.CREATED_AT,
  sortOrder = SortOrder.DESC,
  categoryId
}: {
  page?: number
  perPage?: number
  orderBy?: OrderBy
  sortOrder?: SortOrder
  categoryId?: number
}) {
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    refetch
  } = useInfiniteQuery<{ products: Product[], nextPage?: number, lastPage: number }>({
    queryKey: [QUERY_KEY_PRODUCTS],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getProductsRequest({
        page,
        perPage,
        orderBy,
        sortOrder,
        categoryId
      })
      return {
        products: (response.data.data ?? []),
        nextPage: response.data?.meta?.nextPage ?? undefined,
        lastPage: response.data?.meta?.lastPage ?? 0
      }
    },
    initialPageParam: page,
    getNextPageParam: (lastPage) => lastPage.nextPage
  })

  return {
    products: data?.pages.flatMap(page => page.products) ?? [],
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    refetch,
    lastPage: data?.pages[data.pages.length - 1]?.lastPage ?? 0
  }
}

export function useCreateProduct () {
  const queryProduct = useQueryClient()
  const dispatch = useAppDispatch()

  const {
    isPending: isLoading,
    mutateAsync: createProduct,
    isSuccess,
    data
  } = useMutation({
    mutationFn: createProductRequest,
    onSuccess: async ({ data }: { data?: ApiData<Product> }) => {
      if (!data) return
      queryProduct.setQueryData([QUERY_KEY_PRODUCTS], (prevProducts: { pages?: Array<{ products: Product[], nextPage?: number }>, pageParams?: number[] }) => {
        if (prevProducts?.pages && prevProducts.pages.length > 0) {
          const firstPage = prevProducts.pages[0]
          const nextPage = firstPage.nextPage ?? undefined
          return {
            pages: [
              { products: [data.data, ...firstPage.products], nextPage },
              ...prevProducts.pages.slice(1)
            ],
            pageParams: [1, ...prevProducts.pageParams ?? []]
          }
        }
        return prevProducts
      })
      dispatch(setNotificationState({ message: data.message }))
    },
    onError: (error: ApiError) => {
      dispatch(setNotificationState({ error: getExcepcionPayload(error) }))
    }
  })

  return {
    createProduct,
    isCreatingProduct: isLoading,
    isSuccessProduct: isSuccess,
    product: data?.data?.data
  }
}

export function useUpdateProduct ({ id }: { id: number }) {
  const queryProduct = useQueryClient()
  const dispatch = useAppDispatch()

  const {
    isPending,
    mutateAsync: updateProduct,
    isSuccess,
    data
  } = useMutation({
    mutationFn: updateProductRequest,
    onSuccess: ({ data }: { data?: ApiData<Product> }) => {
      if (!data) return
      queryProduct.setQueryData([QUERY_KEY_PRODUCTS], (prevProducts: { pages?: Array<{ products: Product[], nextPage?: number }>, pageParams?: number[] }) => {
        if (prevProducts?.pages && prevProducts.pages.length > 0) {
          return {
            pages: prevProducts.pages.map(page => ({
              ...page,
              products: page.products.map(product => {
                if (product.id === id) {
                  return data.data
                }
                return product
              })
            })),
            pageParams: prevProducts.pageParams
          }
        }
        return prevProducts
      })
      dispatch(setNotificationState({ message: data.message }))
    },
    onError: (error: ApiError) => {
      dispatch(setNotificationState({ error: getExcepcionPayload(error) }))
    }
  })

  return {
    updateProduct,
    isUpdatingProduct: isPending,
    isSuccessProduct: isSuccess,
    product: data?.data?.data
  }
}

export function useDeleteProduct () {
  const queryProduct = useQueryClient()
  const dispatch = useAppDispatch()

  const {
    isPending,
    mutateAsync: deleteProduct,
    isSuccess,
    data
  } = useMutation({
    mutationFn: deleteProductAction,
    onSuccess: ({ data, error }: { data?: ApiData<{ id: number }>, error?: ApiError }) => {
      if (error ?? !data) {
        dispatch(setNotificationState({ error }))
        return
      }
      queryProduct.setQueryData([QUERY_KEY_PRODUCTS], (prevProducts: { pages?: Array<{ products: Product[], nextPage?: number }>, pageParams?: number[] }) => {
        if (prevProducts?.pages && prevProducts.pages.length > 0) {
          return {
            pages: prevProducts.pages.map(page => ({
              ...page,
              products: page.products.filter(product => product.id !== data?.data?.id)
            })),
            pageParams: prevProducts.pageParams
          }
        }
        return prevProducts
      })
      dispatch(setNotificationState({ message: data.message }))
    }
  })

  return {
    deleteProduct,
    isDeletingProduct: isPending,
    isSuccessProduct: isSuccess,
    productId: data?.data?.data?.id
  }
}
