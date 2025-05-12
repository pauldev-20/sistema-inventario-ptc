'use client'

import { type SubmitHandler, useForm } from 'react-hook-form'
import { useCreateCategory } from '../hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { CategoryCreateSchema } from '../schemas'
import { useNotification } from '@/modules/common/hooks/use-notification'
import { useValidate } from '@/modules/common/hooks/use-validate'
import { type CategoryCreate } from '../types'
import { Button } from '@/modules/common/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/modules/common/components/ui/form'
import { Input } from '@/modules/common/components/ui/input'
import { useEffect } from 'react'
export function CategoryCreateModal ({ onClose }: { onClose: () => void }) {
  const { createCategory, isCreatingCategory, category } = useCreateCategory()

  const { error } = useNotification()
  const { handleErrorsBackend } = useValidate()

  const CategoryCreateForm = useForm<CategoryCreate>({
    resolver: zodResolver(CategoryCreateSchema)
  })

  const onSubmit: SubmitHandler<CategoryCreate> = (data) => {
    void createCategory({ data })
  }

  useEffect(() => {
    if (error) {
      handleErrorsBackend<CategoryCreate>({
        form: CategoryCreateForm,
        errors: error.errors
      })
    } else if (category) {
      onClose()
    }
  }, [error, category])

  return (
    <Form {...CategoryCreateForm}>
      <form onSubmit={CategoryCreateForm.handleSubmit(onSubmit)} className='grid gap-2' id='category-create-form'>
        <FormField
          control={CategoryCreateForm.control}
          name="name"
          defaultValue=''
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nombre de la categoría" {...field}
                  className='h-10' />
              </FormControl>
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
          form='category-create-form'
          disabled={isCreatingCategory}
          className={`${isCreatingCategory ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {isCreatingCategory ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </Form>
  )
}
