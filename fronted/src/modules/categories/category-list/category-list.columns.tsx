'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/modules/common/components/data-table-column-header.component'
import { type Category } from '../types'
import { TooltipContainer } from '@/modules/common/components/tooltip-container.component'
import { Button } from '@/modules/common/components/ui/button'
import { EditIcon, TrashIcon } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export const CategoryListColumns = ({ openConfirmDialog, openEditDialog }: { openConfirmDialog: ({ id }: { id: number }) => void, openEditDialog: ({ category }: { category: Category }) => void }): Array<ColumnDef<Category>> => [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }) => (
      <div className='text-center'>
        {row.original.id}
      </div>
    )
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => (
      <div className='text-left'>
        {row.original.name}
      </div>
    )
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Creado" />
    ),
    cell: ({ row }) => (
      <div className='text-center'>
        {format(row.original.createdAt, "dd 'de' MMMM 'del' yyyy, h:mm aaaa", { locale: es })}
      </div>
    )
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actualizado" />
    ),
    cell: ({ row }) => (
      <div className='text-center'>
        {format(row.original.updatedAt, "dd 'de' MMMM 'del' yyyy, h:mm aaaa", { locale: es })}
      </div>
    )
  },
  {
    id: 'actions',
    header: () => <div className='text-center'>Acciones</div>,
    cell: ({ row }) => (
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
            onClick={() => { openEditDialog({ category: row.original }) }}
          >
            <EditIcon className='w-6 h-6' />
          </Button>
        </TooltipContainer>
      </div>
    )
  }
]
