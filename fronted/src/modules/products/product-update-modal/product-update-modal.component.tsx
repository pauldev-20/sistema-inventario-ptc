'use client'

import { type SubmitHandler, useForm } from 'react-hook-form'
import { useUpdateProduct } from '../hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProductUpdateSchema } from '../schemas'
import { useNotification } from '@/modules/common/hooks/use-notification'
import { useValidate } from '@/modules/common/hooks/use-validate'
import { type Product, type ProductUpdate } from '../types'
import { Button } from '@/modules/common/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/modules/common/components/ui/form'
import { Input } from '@/modules/common/components/ui/input'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Textarea } from '@/modules/common/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/modules/common/components/ui/select'
import { useCategories } from '@/modules/categories/hooks'
import { PencilIcon } from 'lucide-react'
export function ProductUpdateModal ({ product, onClose }: { product: Product, onClose: () => void }) {
  const { updateProduct, isUpdatingProduct } = useUpdateProduct({ id: product.id })
  const { categories, isLoadingCategories } = useCategories()

  const { error } = useNotification()
  const { handleErrorsBackend, changedData } = useValidate()

  const ProductUpdateForm = useForm<ProductUpdate>({
    resolver: zodResolver(ProductUpdateSchema)
  })

  const onSubmit: SubmitHandler<ProductUpdate> = (data) => {
    const dataToSend = changedData<ProductUpdate>({ dirtyFields: ProductUpdateForm.formState.dirtyFields, data })
    console.log(dataToSend)

    void updateProduct({ id: product.id, data: dataToSend })
  }

  useEffect(() => {
    if (error) {
      handleErrorsBackend<ProductUpdate>({
        form: ProductUpdateForm,
        errors: error.errors
      })
    }
  }, [error])

  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({ file: null })
  const [previewImage, setPreviewImage] = useState<File | null>(null)

  const handleButtonUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const fileInput = fileRefs.current.file
    if (!fileInput) return
    fileInput.click()
  }

  const AvatarProduct = useMemo(() => {
    if (!previewImage) {
      return (
        <div className='w-full h-full shadow-md border-secondary border-[1px] relative rounded-full'>
          <img
            src={product.imageUrl ?? '/placeholder.svg'}
            alt={`Imagen de ${product.name}`}
            className='w-full h-full object-cover rounded-full' />
          <Button
            variant="ghost"
            size="icon"
            className='absolute bottom-0 right-0 bg-background rounded-full shadow-md'
            onClick={handleButtonUpload}
            aria-label='Subir Imagen'
          >
            <PencilIcon className="w-5 h-5" />
          </Button>
        </div>
      )
    }
    return (
      <div className='w-full h-full shadow-md border-secondary border-[1px] relative rounded-full'>
        <img
          src={URL.createObjectURL(previewImage)}
          alt='Imagen de Producto'
          className='w-full h-full object-cover rounded-full' />
        <Button
          variant="ghost"
          size="icon"
          className='absolute bottom-0 right-0 bg-background rounded-full shadow-md'
          onClick={handleButtonUpload}
          aria-label='Subir Imagen'
        >
          <PencilIcon className="w-5 h-5" />
        </Button>
      </div>
    )
  }, [product, previewImage])

  return (
    <Form {...ProductUpdateForm}>
      <form onSubmit={ProductUpdateForm.handleSubmit(onSubmit)} className='grid gap-2' id='product-update-form'>
        <FormField
          control={ProductUpdateForm.control}
          name="image"
          render={({ field }) => (
            <FormItem className='space-y-2 row-span-1 sm:row-span-4 lg:row-span-3 flex flex-col'>
              <FormLabel>Imagen</FormLabel>
              <FormControl>
                <div className='w-full flex-1 flex justify-center items-center min-h-[25vh] p-4'>
                  <input
                    type="file"
                    ref={(image) => {
                      fileRefs.current.file = image
                    }}
                    hidden
                    onChange={(e) => {
                      const files = e.target.files
                      if (!files) return
                      const file = files[0]
                      if (!file) return
                      field.onChange(file)
                      setPreviewImage(file)
                    }}
                    multiple={false}
                    accept=".jpg,.jpeg,.png"
                  />
                  <div className='aspect-square w-[55%] max-h-full'>
                    {AvatarProduct}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={ProductUpdateForm.control}
          name="name"
          defaultValue={product.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nombre del producto" {...field}
                  className='h-10' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={ProductUpdateForm.control}
          name="description"
          defaultValue={product.description ?? ''}
          render={({ field }) => (
            <FormItem className=''>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descripción"
                  rows={5}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={ProductUpdateForm.control}
          name="price"
          defaultValue={product.price}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  step='0.1'
                  placeholder="0.00" {...field}
                  className='h-10' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={ProductUpdateForm.control}
          name="categoryId"
          defaultValue={product.category.id}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select
                disabled={isLoadingCategories}
                value={field.value?.toString()}
                onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id?.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
      <div className='col-span-3 flex justify-end items-center gap-2'>
        <Button
          variant={'outline'}
          onClick={onClose}>
          Volver
        </Button>
        <Button
          type="submit"
          form='product-update-form'
          disabled={isUpdatingProduct || !ProductUpdateForm.formState.isDirty}
          className={`${isUpdatingProduct ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {isUpdatingProduct ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </Form>
  )
}
