'use client'

import { useEffect, useState } from 'react'
import { useDeleteProduct, useProducts } from '../hooks'
import { OrderBy, type Product, SortOrder } from '../types'
import { Skeleton } from '@/modules/common/components/ui/skeleton'
import { ProductCard } from '../product-card'
import { PaginationProducts } from '../components/pagination-products.component'
import { FilterBarProducts } from '../components/filter-bar-products.component'
import { Button } from '@/modules/common/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/modules/common/components/ui/dialog'
import { ProductCreateModal } from '../product-create-modal'
import { useShowDialog } from '@/modules/common/hooks/use-show-dialog'
import { ProductUpdateModal } from '../product-update-modal'
import { useConfirmDialog } from '@/modules/common/hooks/use-confirm-dialog'
import { useNotification } from '@/modules/common/hooks/use-notification'

export function ProductList() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [orderBy, setOrderBy] = useState<OrderBy>(OrderBy.CREATED_AT)
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC)
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined)

  const { products, isLoading: isLoadingProducts, refetch, lastPage } = useProducts({
    page: currentPage,
    perPage: 8,
    orderBy,
    sortOrder,
    categoryId: selectedCategory
  })

  useNotification()

  const {
    deleteProduct,
    isDeletingProduct,
    isSuccessProduct
  } = useDeleteProduct()

  const {
    isOpenModalDelete,
    setIsOpenModalDelete,
    openConfirmDialog,
    cancelDelete,
    handleDelete
  } = useConfirmDialog({
    isSuccess: isSuccessProduct,
    onDelete: async ({ id }) => {
      await deleteProduct({ id })
    }
  })

  const {
    closeShowDialog: closeProductCreate,
    isOpenModalShow: isOpenModalProductCreate,
    openShowDialog: openProductCreate
  } = useShowDialog()

  const {
    isOpenModalShow: isOpenModalProductEdit,
    openShowDialog: openProductEdit,
    closeShowDialog: closeProductEdit,
    item: productToEdit
  } = useShowDialog<{ product: Product }>()

  const handlePageChange = ({ page }: { page: number }) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSortChange = ({ value }: { value: string }) => {
    const [field, order] = value.split('-')
    setOrderBy(field as OrderBy)
    setSortOrder(order as SortOrder)
    setCurrentPage(1)
  }

  const handleCategoryChange = ({ categoryId }: { categoryId: number | undefined }) => {
    setSelectedCategory(categoryId)
    setCurrentPage(1)
  }

  useEffect(() => {
    void refetch()
  }, [currentPage, orderBy, sortOrder, selectedCategory])

  if (isLoadingProducts) {
    return (
      <div className="w-full px-4 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-lg overflow-hidden border border-border">
              <Skeleton className="h-48 w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-6 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full px-4 pb-8">
      <div className='flex items-center justify-end w-full mb-2'>
        <Button
          variant="outline"
          onClick={openProductCreate}
          size="sm">
          <PlusIcon />
          <span className="hidden lg:inline">Nuevo Producto</span>
        </Button>
      </div>
      <FilterBarProducts
        onOrderByChange={handleSortChange}
        onCategoryChange={handleCategoryChange}
        orderByValue={`${orderBy}-${sortOrder}`}
        categoryValue={selectedCategory}
      />
      {products.length === 0
        ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium">No hay productos disponibles</h3>
          <p className="text-muted-foreground mt-2">Intenta cambiar tus filtros o vuelve más tarde.</p>
        </div>
          )
        : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              openEditDialog={openProductEdit}
              openConfirmDialog={openConfirmDialog} />
          ))}
        </div>
          )}

      {lastPage > 1 && (
        <PaginationProducts
          currentPage={currentPage}
          lastPage={lastPage}
          onPageChange={handlePageChange} />
      )}

      <Dialog open={isOpenModalProductCreate} onOpenChange={closeProductCreate}>
        <DialogContent className="max-w-[90vw] md:max-w-[425px] max-h-[95vh] rounded-md overflow-auto" aria-describedby='product-create-form'>
          <DialogHeader>
            <DialogTitle>Nuevo Producto</DialogTitle>
          </DialogHeader>
          <div className='w-full space-y-4'>
            <ProductCreateModal onClose={closeProductCreate} />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isOpenModalProductEdit} onOpenChange={closeProductEdit}>
        <DialogContent className="max-w-[90vw] md:max-w-[425px] max-h-[95vh] rounded-md overflow-auto" aria-describedby='product-edit-form'>
          <DialogHeader>
            <DialogTitle>Editar Producto</DialogTitle>
          </DialogHeader>
          <div className='w-full space-y-4'>
            {productToEdit && (
              <ProductUpdateModal
                product={productToEdit.product}
                onClose={closeProductEdit} />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isOpenModalDelete} onOpenChange={setIsOpenModalDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar este producto?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={cancelDelete}>Cancelar</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeletingProduct} className={isDeletingProduct ? 'opacity-50 cursor-not-allowed' : ''}>
              {isDeletingProduct ? 'Eliminando...' : 'Eliminar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
