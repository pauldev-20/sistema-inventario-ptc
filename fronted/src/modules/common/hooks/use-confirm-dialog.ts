'use client'

import { useEffect, useState } from 'react'

export function useConfirmDialog ({ onDelete, isSuccess }: { onDelete: ({ id }: { id: number }) => Promise<void>, isSuccess: boolean }) {
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false)
  const [itemToDelete, setItemToDelete] = useState<number | null>(null)

  const openConfirmDialog = ({ id }: { id: number }) => {
    setItemToDelete(id)
    setIsOpenModalDelete(true)
  }

  const handleDelete = async () => {
    if (itemToDelete !== null) {
      await onDelete({ id: itemToDelete })
    }
  }

  const cancelDelete = () => {
    setIsOpenModalDelete(false)
    setItemToDelete(null)
  }

  useEffect(() => {
    if (isSuccess) {
      setIsOpenModalDelete(false)
      setItemToDelete(null)
    }
  }, [isSuccess])

  return {
    isOpenModalDelete,
    setIsOpenModalDelete,
    openConfirmDialog,
    handleDelete,
    cancelDelete,
    itemToDelete
  }
}
