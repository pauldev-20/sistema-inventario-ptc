'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/modules/common/components/ui/select'
import { Label } from '@/modules/common/components/ui/label'
import { useCategories } from '@/modules/categories/hooks'
import { OrderBy, SortOrder } from '../types'

interface FilterBarProductsProps {
  onOrderByChange: ({ value }: { value: string }) => void
  onCategoryChange: ({ categoryId }: { categoryId: number | undefined }) => void
  orderByValue: string
  categoryValue: number | undefined
}

export function FilterBarProducts({ onOrderByChange, onCategoryChange, orderByValue, categoryValue }: FilterBarProductsProps) {
  const { categories, isLoadingCategories } = useCategories()

  return (
    <div className="flex flex-col sm:flex-row gap-4 rounded-lg">
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <Label htmlFor="sort-select" className="mb-1.5 block text-sm font-medium">
          Ordernar por
        </Label>
        <Select value={orderByValue} onValueChange={(value: string) => { onOrderByChange({ value }) }}>
          <SelectTrigger id="sort-select" className="w-full">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={`${OrderBy.PRICE}-${SortOrder.ASC}`}>Precio: Bajo a Alto</SelectItem>
            <SelectItem value={`${OrderBy.PRICE}-${SortOrder.DESC}`}>Precio: Alto a Bajo</SelectItem>
            <SelectItem value={`${OrderBy.NAME}-${SortOrder.ASC}`}>Nombre: A to Z</SelectItem>
            <SelectItem value={`${OrderBy.NAME}-${SortOrder.DESC}`}>Nombre: Z to A</SelectItem>
            <SelectItem value={`${OrderBy.CREATED_AT}-${SortOrder.DESC}`}>Más Reciente</SelectItem>
            <SelectItem value={`${OrderBy.CREATED_AT}-${SortOrder.ASC}`}>Más Antiguo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <Label htmlFor="category-select" className="mb-1.5 block text-sm font-medium">
          Category
        </Label>
        <Select
          value={categoryValue?.toString()}
          disabled={isLoadingCategories}
          onValueChange={(value) => { onCategoryChange({ categoryId: value === 'all' ? undefined : Number(value) }) }}>
          <SelectTrigger id="category-select" className="w-full">
            <SelectValue placeholder="Todas las categorias" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorias</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
