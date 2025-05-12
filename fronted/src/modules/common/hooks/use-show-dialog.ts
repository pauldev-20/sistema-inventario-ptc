'use client'

import { useState } from 'react'

export function useShowDialog <T = any> () {
  const [isOpenModalShow, setIsOpenModalShow] = useState<boolean>(false)
  const [item, setItem] = useState<T | null>(null)

  const openShowDialog = (data?: T) => {
    if (data) setItem(data)
    setIsOpenModalShow(true)
  }

  const closeShowDialog = () => {
    setIsOpenModalShow(false)
    setItem(null)
  }

  return {
    isOpenModalShow,
    setIsOpenModalShow,
    openShowDialog,
    closeShowDialog,
    item
  }
}
