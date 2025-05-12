import { z } from 'zod'

export const SignInSchema = z.object({
  name: z
    .string()
    .min(4, { message: 'Usuario demasiado corto' })
    .max(255, { message: 'Usuario demasiado largo' })
    .transform(value => {
      value = value.trim()
      return value
    }),
  password: z
    .string()
    .min(4, { message: 'Contraseña demasiado corta' })
    .max(72, { message: 'Contraseña demasiado larga' })
})

export const SignUpSchema = z.object({
  name: z
    .string()
    .min(4, { message: 'Usuario demasiado corto' })
    .max(255, { message: 'Usuario demasiado largo' })
    .transform(value => {
      value = value.trim()
      return value
    }),
  password: z
    .string()
    .min(4, { message: 'Contraseña demasiado corta' })
    .max(72, { message: 'Contraseña demasiado larga' }),
  passwordConfirmation: z
    .string()
    .min(4, { message: 'Contraseña demasiado corta' })
    .max(72, { message: 'Contraseña demasiado larga' })
    .optional()
}).refine((data) => data.password === (data?.passwordConfirmation ?? ''), {
  message: 'Las contraseñas no coinciden', path: ['passwordConfirmation']
}).transform(data => {
  const { passwordConfirmation, ...rest } = data
  return {
    ...rest
  }
})
