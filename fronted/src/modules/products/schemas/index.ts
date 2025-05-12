import { z } from 'zod'

export const ProductCreateSchema = z.object({
  name: z
    .string()
    .max(150, 'El nombre debe tener como máximo 255 caracteres')
    .nonempty('El nombre es requerido'),
  price: z
    .coerce
    .number()
    .nonnegative('El precio debe ser positivo'),
  description: z
    .string()
    .optional()
    .transform((v) => v === '' ? undefined : v),
  image: z
    .instanceof(File, { message: 'La imagen del product no es válida' })
    .optional(),
  categoryId: z
    .coerce
    .number({ message: 'La categoría no es válida' })
    .int('La categoría debe ser un número entero')
    .positive('La categoría debe ser un número positivo')
})

export const ProductUpdateSchema = ProductCreateSchema.partial()
