import { type Table } from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Button } from './ui/button'
import React from 'react'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}
export function DataTablePagination<TData> ({
  table
}: DataTablePaginationProps<TData>) {
  return (
    <div className="w-full flex items-center justify-center sm:justify-start px-2 py-4 gap-4 max-md:flex-col">
      <div className="flex-1 flex items-center max-sm:justify-center space-x-2">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => { table.setPageIndex(0) }}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Ir a la primera página</span>
          <ChevronsLeft />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => { table.previousPage() }}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Ir a la página anterior</span>
          <ChevronLeft />
        </Button>
        {table.getPageOptions().map((pageIndex, i, arr) => {
          const totalPages = arr.length
          const currentPage = table.getState().pagination.pageIndex

          const shouldShow =
            pageIndex === 0 ||
            pageIndex === totalPages - 1 ||
            pageIndex === currentPage ||
            pageIndex === currentPage - 1 ||
            pageIndex === currentPage + 1

          const showDotsBefore = pageIndex === 1 && currentPage > 2
          const showDotsAfter = pageIndex === totalPages - 2 && currentPage < totalPages - 3

          return (
            <React.Fragment key={pageIndex}>
              {showDotsBefore && <span className="px-2">...</span>}
              {shouldShow && (
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => { table.setPageIndex(pageIndex) }}
                  disabled={currentPage === pageIndex}
                >
                  {pageIndex + 1}
                </Button>
              )}
              {showDotsAfter && <span className="px-2">...</span>}
            </React.Fragment>
          )
        })}
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => { table.nextPage() }}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Ir a la siguiente página</span>
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => { table.setPageIndex(table.getPageCount() - 1) }}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Ir a la última página</span>
          <ChevronsRight />
        </Button>
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Filas por página:</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            disabled={table.getRowModel().rows?.length === 0}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[1, 2, 3, 4, 5, 10].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex w-full sm:w-fit items-center justify-center text-sm font-medium">
        Página {table.getState().pagination.pageIndex + 1} de{' '}
        {table.getPageCount()}
      </div>
    </div>
  )
}
