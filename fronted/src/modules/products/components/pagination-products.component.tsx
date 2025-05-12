'use client'

import { Button } from '@/modules/common/components/ui/button'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  lastPage: number
  onPageChange: ({ page }: { page: number }) => void
}

export function PaginationProducts({ currentPage, lastPage, onPageChange }: PaginationProps) {
  const getPages = () => {
    const pageNumbers = []

    pageNumbers.push(1)

    const startPage = Math.max(2, currentPage - 1)
    const endPage = Math.min(lastPage - 1, currentPage + 1)

    if (startPage > 2) {
      pageNumbers.push('ellipsis-start')
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    if (endPage < lastPage - 1) {
      pageNumbers.push('ellipsis-end')
    }

    if (lastPage > 1) {
      pageNumbers.push(lastPage)
    }

    return pageNumbers
  }

  const pageNumbers = getPages()
  return (
    <nav className="flex justify-center items-center mt-12 mb-8">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => { onPageChange({ page: currentPage - 1 }) }}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {pageNumbers.map((page, index) => {
          if (page === 'ellipsis-start' || page === 'ellipsis-end') {
            return (
              <Button key={`ellipsis-${index}`} variant="ghost" size="icon" disabled className="cursor-default">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            )
          }

          return (
            <Button
              key={index}
              variant={currentPage === page ? 'default' : 'outline'}
              onClick={() => { onPageChange({ page: page as number }) }}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </Button>
          )
        })}

        <Button
          variant="outline"
          size="icon"
          onClick={() => { onPageChange({ page: currentPage + 1 }) }}
          disabled={currentPage === lastPage}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </nav>
  )
}
