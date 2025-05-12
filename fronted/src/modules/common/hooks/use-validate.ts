'use client'

import { type FieldValues, type Path, type UseFormReturn } from 'react-hook-form'

export function useValidate () {
  const handleErrorsBackend = <T extends FieldValues>({ errors, form }: { errors?: Record<string, string[]>, form: UseFormReturn<T> }) => {
    if (errors) {
      Object.entries(errors).forEach(([key, value]) => {
        if (value && value.length > 0) {
          form.setError(key as Path<T>, { type: 'server', message: value[0] })
        }
      })
    }
  }

  const changedData = <T extends Record<string, any>>({ dirtyFields, data }: { dirtyFields: Partial<Readonly<{ [K in keyof T]: boolean | boolean[] | Array<Record<string, boolean | undefined>> | undefined }>>, data: T }): T => {
    return Object.keys(dirtyFields).reduce<T>((changes, key) => {
      changes[key as keyof T] = data[key as keyof T] as any
      return changes
    // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter, @typescript-eslint/consistent-type-assertions
    }, {} as T)
  }

  return {
    handleErrorsBackend,
    changedData
  }
}
