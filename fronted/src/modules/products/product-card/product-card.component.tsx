'use client'

import { formatDistanceToNow } from 'date-fns'
import { Badge } from '@/modules/common/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/modules/common/components/ui/card'
import { type Product } from '../types'
import { es } from 'date-fns/locale'
import { TooltipContainer } from '@/modules/common/components/tooltip-container.component'
import { Button } from '@/modules/common/components/ui/button'
import { EditIcon, TrashIcon } from 'lucide-react'

interface ProductCardProps {
  product: Product
  openConfirmDialog: ({ id }: { id: number }) => void
  openEditDialog: ({ product }: { product: Product }) => void
}
export function ProductCard({ product, openConfirmDialog, openEditDialog }: ProductCardProps) {
  const { name, description, price, imageUrl, createdAt, category } = product

  const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: es })

  const formattedPrice = new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price)

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
      <div
        className="relative h-56 overflow-hidden bg-gray-100"
        style={{
          backgroundImage: `url(${imageUrl ?? '/placeholder.svg?height=192&width=384'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        role="img"
        aria-label={name}
      ></div>
      <CardContent className="flex-grow p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs font-medium">
            {category.name}
          </Badge>
          <span className="text-xs text-muted-foreground">{formattedDate}</span>
        </div>
        <h3 className="font-semibold text-lg line-clamp-1 mb-1">{name}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-2">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="font-bold text-lg">{formattedPrice}</span>
        <div className='flex justify-center gap-2'>
          <TooltipContainer
            content='Eliminar Producto'>
            <Button
              variant='outline'
              className='text-red-500 px-3 hover:bg-red-500 hover:text-white'
              onClick={() => { openConfirmDialog({ id: product.id }) }}
            >
              <TrashIcon className='w-6 h-6' />
            </Button>
          </TooltipContainer>
          <TooltipContainer
            content='Editar producto'>
            <Button
              variant='outline'
              className='text-blue-500 px-3 hover:bg-blue-500 hover:text-white'
              onClick={() => { openEditDialog({ product }) }}
            >
              <EditIcon className='w-6 h-6' />
            </Button>
          </TooltipContainer>
        </div>
      </CardFooter>
    </Card>
  )
}
