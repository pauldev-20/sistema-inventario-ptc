'use client'

import { type SubmitHandler, useForm } from 'react-hook-form'
import { SignInSchema } from '../schemas'
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../hooks/use-auth'
import { type SignIn } from '../types'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/modules/common/components/ui/form'
import { useValidate } from '@/modules/common/hooks/use-validate'
import { useNotification } from '@/modules/common/hooks/use-notification'
import { Input } from '@/modules/common/components/ui/input'
import { Button } from '@/modules/common/components/ui/button'
export function SignInForm () {
  const { signIn, isLoadingSignIn } = useAuth()

  const { handleErrorsBackend } = useValidate()
  const { error } = useNotification()

  const signInForm = useForm<SignIn>({
    resolver: zodResolver(SignInSchema)
  })

  const onSubmit: SubmitHandler<SignIn> = (data) => {
    void signIn(data)
  }

  useEffect(() => {
    if (error) {
      handleErrorsBackend<SignIn>({
        form: signInForm,
        errors: error.errors
      })
    }
  }, [error])

  return (
    <Form {...signInForm}>
      <form onSubmit={signInForm.handleSubmit(onSubmit)} className='space-y-4' id='sign-in-form'>
        <FormField
          control={signInForm.control}
          name="name"
          defaultValue=''
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de usuario</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ingresa tu nombre de usuario" {...field}
                  className='h-10' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signInForm.control}
          name="password"
          defaultValue=''
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ingresa tu contraseña" {...field}
                  className='h-10'
                  type='password' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
      <Button
        type="submit"
        form='sign-in-form'
        disabled={isLoadingSignIn}
        className={`w-full h-10 mt-4 ${isLoadingSignIn ? 'opacity-50' : ''}`}>
        {isLoadingSignIn ? 'Cargando...' : 'Ingresar'}
      </Button>
    </Form>
  )
}
