import { z } from 'zod'

export const CategoryCreateSchema = z.object({
  name: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(255, 'El nombre debe tener como máximo 255 caracteres')
    .nonempty('El nombre es requerido')
})

export const CategoryUpdateSchema = CategoryCreateSchema.partial()
