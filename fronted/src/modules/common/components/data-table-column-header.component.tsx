import { ArrowUpDown } from 'lucide-react'
import { Button } from './ui/button'

const DataTableColumnHeader = ({ column, title }: { column: any, title: string }) => {
  return (
    <div className='flex items-center justify-center'>
      <Button
        variant='ghost'
        onClick={() => { column.toggleSorting(column.getIsSorted() === 'asc') }} >
        {title}
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    </div>
  )
}

export {
  DataTableColumnHeader
}
