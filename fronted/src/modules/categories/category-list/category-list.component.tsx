'use client'

import { useNotification } from '@/modules/common/hooks/use-notification'
import { type ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, type SortingState, useReactTable } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { useCategories, useDeleteCategory } from '../hooks'
import { useConfirmDialog } from '@/modules/common/hooks/use-confirm-dialog'
import { useShowDialog } from '@/modules/common/hooks/use-show-dialog'
import { type Category } from '../types'
import { CategoryListColumns } from './category-list.columns'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/modules/common/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/modules/common/components/ui/dialog'
import { Button } from '@/modules/common/components/ui/button'
import { DataTablePagination } from '@/modules/common/components/data-table-pagination'
import { CategoryListSkeleton } from './category-list.skeleton'
import { Card, CardContent } from '@/modules/common/components/ui/card'
import { TooltipContainer } from '@/modules/common/components/tooltip-container.component'
import { EditIcon, PlusIcon, TrashIcon } from 'lucide-react'
import { CategoryCreateModal } from '../category-create-modal'
import { CategoryUpdateModal } from '../category-update-modal'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export function CategoryList () {
  const { categories, isLoadingCategories, errorCategories } = useCategories()
  const { deleteCategory, isDeletingCategory, isSuccessCategory, categoryId } = useDeleteCategory()

  useNotification()

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )

  const {
    isOpenModalDelete,
    setIsOpenModalDelete,
    openConfirmDialog,
    cancelDelete,
    handleDelete
  } = useConfirmDialog({
    isSuccess: isSuccessCategory && !!categoryId,
    onDelete: async ({ id }) => {
      await deleteCategory({ id })
    }
  })

  const {
    isOpenModalShow: isOpenModalCategoryCreate,
    openShowDialog: openCategoryCreate,
    closeShowDialog: closeCategoryCreate
  } = useShowDialog()

  const {
    isOpenModalShow: isOpenModalCategoryEdit,
    openShowDialog: openCategoryEdit,
    closeShowDialog: closeCategoryEdit,
    item: category
  } = useShowDialog<{ category: Category }>()

  const listColumns = useMemo(
    () => {
      return CategoryListColumns({ openConfirmDialog, openEditDialog: openCategoryEdit })
    }, [])

  const table = useReactTable({
    data: categories,
    columns: listColumns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters
    }
  })

  if (isLoadingCategories) {
    return (
      <>
       <CategoryListSkeleton />
      </>
    )
  }

  if (errorCategories) {
    return (
      <>
        <div className='w-full px-4 sm:px-6 py-8'>
          <div className='text-center text-red-500'>
            Ocurrió un error al cargar las categorías.
          </div>
        </div>
      </>
    )
  }

  return (
    <div className='w-full px-4 flex flex-col gap-2'>
      <div className='flex items-center justify-end w-full mb-2'>
        <Button
          variant="outline"
          onClick={openCategoryCreate}
          size="sm">
          <PlusIcon />
          <span className="hidden lg:inline">Nueva categoría</span>
        </Button>
      </div>
      <div className="overflow-hidden rounded-lg border hidden sm:block">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length
              ? (
                  table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>)
                  })}
                </TableRow>
                  ))
                )
              : (
              <TableRow>
                <TableCell colSpan={listColumns.length} className="h-24 text-center">
                  No hay categorías disponibles.
                </TableCell>
              </TableRow>
                )}
          </TableBody>
        </Table>
      </div>

      <div className="sm:hidden w-full overflow-y-hidden">
        {table.getRowModel().rows?.length
          ? table.getRowModel().rows.map((row) => (
          <Card key={row.id} className="mb-4 text-sm">
            <CardContent className="pt-4">
              <div className="flex justify-between items-start">
                <div className='space-y-1'>
                  <h3 className="font-medium">{row.original.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {format(row.original.createdAt, "dd 'de' MMMM 'del' yyyy, h:mm aaaa", { locale: es })}
                  </p>
                </div>
                <div className='flex justify-center gap-2'>
                  <TooltipContainer
                    content='Eliminar categoria'>
                    <Button
                      variant='outline'
                      className='text-red-500 px-3 hover:bg-red-500 hover:text-white'
                      onClick={() => { openConfirmDialog({ id: row.original.id }) }}
                    >
                      <TrashIcon className='w-6 h-6' />
                    </Button>
                  </TooltipContainer>
                  <TooltipContainer
                    content='Editar categoria'>
                    <Button
                      variant='outline'
                      className='text-blue-500 px-3 hover:bg-blue-500 hover:text-white'
                      onClick={() => { openCategoryEdit({ category: row.original }) }}
                    >
                      <EditIcon className='w-6 h-6' />
                    </Button>
                  </TooltipContainer>
                </div>
              </div>
            </CardContent>
          </Card>
          ))
          : (
          <Card className="mb-4 text-sm">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">No hay categorias disponibles</h3>
                </div>
              </div>
            </CardContent>
          </Card>
            )}
      </div>

      <DataTablePagination table={table} />

      <Dialog open={isOpenModalDelete} onOpenChange={setIsOpenModalDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar esta categoria?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={cancelDelete}>Cancelar</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeletingCategory} className={isDeletingCategory ? 'opacity-50 cursor-not-allowed' : ''}>
              {isDeletingCategory ? 'Eliminando...' : 'Eliminar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isOpenModalCategoryCreate} onOpenChange={closeCategoryCreate}>
        <DialogContent className="max-w-[90vw] md:max-w-[425px] max-h-[95vh] rounded-md overflow-auto" aria-describedby='category-create-form'>
          <DialogHeader>
            <DialogTitle>Nueva Categoría</DialogTitle>
          </DialogHeader>
          <div className='w-full space-y-4'>
            <CategoryCreateModal onClose={closeCategoryCreate} />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isOpenModalCategoryEdit} onOpenChange={closeCategoryEdit}>
        <DialogContent className="max-w-[90vw] md:max-w-[425px] max-h-[95vh] rounded-md overflow-auto" aria-describedby='category-edit-form'>
          <DialogHeader>
            <DialogTitle>Editar {category?.category.name}</DialogTitle>
          </DialogHeader>
          <div className='w-full space-y-4'>
            {category &&
              <CategoryUpdateModal
                category={category.category}
                onClose={closeCategoryEdit} />}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
