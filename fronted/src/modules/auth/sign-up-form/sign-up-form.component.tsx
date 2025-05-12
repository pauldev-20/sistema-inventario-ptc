'use client'

import { type SubmitHandler, useForm } from 'react-hook-form'
import { SignUpSchema } from '../schemas'
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../hooks/use-auth'
import { type SignUp } from '../types'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/modules/common/components/ui/form'
import { useValidate } from '@/modules/common/hooks/use-validate'
import { useNotification } from '@/modules/common/hooks/use-notification'
import { Input } from '@/modules/common/components/ui/input'
import { Button } from '@/modules/common/components/ui/button'
export function SignUpForm () {
  const { signUp, isLoadingSignUp } = useAuth()

  const { handleErrorsBackend } = useValidate()
  const { error } = useNotification()

  const signUpForm = useForm<SignUp>({
    resolver: zodResolver(SignUpSchema)
  })

  const onSubmit: SubmitHandler<SignUp> = (data) => {
    void signUp(data)
  }

  useEffect(() => {
    if (error) {
      handleErrorsBackend<SignUp>({
        form: signUpForm,
        errors: error.errors
      })
    }
  }, [error])

  return (
    <Form {...signUpForm}>
      <form onSubmit={signUpForm.handleSubmit(onSubmit)} className='space-y-4' id='sign-in-form'>
        <FormField
          control={signUpForm.control}
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
          control={signUpForm.control}
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
        <FormField
          control={signUpForm.control}
          name="passwordConfirmation"
          defaultValue=''
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar contraseña</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirma tu contraseña" {...field}
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
        disabled={isLoadingSignUp}
        className={`w-full h-10 mt-4 ${isLoadingSignUp ? 'opacity-50' : ''}`}>
        {isLoadingSignUp ? 'Cargando...' : 'Registrarse'}
      </Button>
    </Form>
  )
}
