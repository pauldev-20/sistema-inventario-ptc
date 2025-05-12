'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, type AppStore } from '../store'
import es from 'dayjs/locale/es'
import dayjs from 'dayjs'

dayjs.locale(es)
export function StoreProvider ({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
