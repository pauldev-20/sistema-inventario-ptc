import { Card, CardContent } from '@/modules/common/components/ui/card'
import { Skeleton } from '@/modules/common/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/modules/common/components/ui/table'

export function CategoryListSkeleton () {
  return (
    <div className='w-full px-4 flex flex-col gap-2'>
      <div className="overflow-hidden rounded-lg border hidden sm:block">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-muted">
            <TableRow>
              <TableHead className='text-center'>id</TableHead>
              <TableHead className='text-center'>Nombre</TableHead>
              <TableHead className='text-center'>Creado</TableHead>
              <TableHead className='text-center'>Actualizado</TableHead>
              <TableHead className='text-center'>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                <TableCell>
                  <div className="flex justify-center space-x-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="sm:hidden w-full overflow-y-hidden">
        {[...Array(5)].map((_, index) => (
          <Card key={index} className="mb-4 text-sm">
            <CardContent className="pt-4">
              <div className="flex justify-between items-start">
                <div className='space-y-2'>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className='flex justify-center gap-2'>
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-center sm:justify-start px-2 py-4 gap-2 max-sm:flex-wrap">
        <div className="flex-1 flex items-center max-sm:justify-center space-x-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          <Skeleton className="h-6 flex-1" />
        </div>
      </div>
    </div>
  )
}
