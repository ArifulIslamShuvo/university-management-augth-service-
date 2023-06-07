import { z } from 'zod'

const createUserZodSchema = z.object({
  bidy: z.object({
    role: z.string({
      required_error: 'roal is required',
    }),
  }),
})
export const UserValidation = {
  createUserZodSchema,
}

//   await createUserZodSchema.parseAsync(req)
