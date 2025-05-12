'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type FC, type PropsWithChildren } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount) => {
        if (failureCount < 1) return true
        return false
      },
      retryDelay: 500
    }
  }
})

export const QueryProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider
        client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}
