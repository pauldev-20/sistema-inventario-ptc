'use client'

import { type SubmitHandler, useForm } from 'react-hook-form'
import { useUpdateCategory } from '../hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { CategoryUpdateSchema } from '../schemas'
import { useNotification } from '@/modules/common/hooks/use-notification'
import { useValidate } from '@/modules/common/hooks/use-validate'
import { type Category, type CategoryUpdate } from '../types'
import { Button } from '@/modules/common/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/modules/common/components/ui/form'
import { Input } from '@/modules/common/components/ui/input'
import { useEffect } from 'react'
export function CategoryUpdateModal ({ category, onClose }: { category: Category, onClose: () => void }) {
  const { updateCategory, isUpdatingCategory } = useUpdateCategory({ id: category.id })

  const { error } = useNotification()
  const { handleErrorsBackend, changedData } = useValidate()

  const CategoryUpdateForm = useForm<CategoryUpdate>({
    resolver: zodResolver(CategoryUpdateSchema)
  })

  const onSubmit: SubmitHandler<CategoryUpdate> = (data) => {
    const changed = changedData<CategoryUpdate>({
      dirtyFields: CategoryUpdateForm.formState.dirtyFields,
      data
    })
    void updateCategory({ id: category.id, data: changed })
  }

  useEffect(() => {
    if (error) {
      handleErrorsBackend<CategoryUpdate>({
        form: CategoryUpdateForm,
        errors: error.errors
      })
    }
  }, [error])

  return (
    <Form {...CategoryUpdateForm}>
      <form onSubmit={CategoryUpdateForm.handleSubmit(onSubmit)} className='grid gap-2' id='category-update-form'>
        <FormField
          control={CategoryUpdateForm.control}
          name="name"
          defaultValue={category.name}
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
          form='category-update-form'
          disabled={isUpdatingCategory || !CategoryUpdateForm.formState.isDirty}
          className={`${isUpdatingCategory ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {isUpdatingCategory ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </Form>
  )
}
