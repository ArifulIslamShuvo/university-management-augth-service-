import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'ID is requerd',
    }),
    password: z.string({
      required_error: 'password is requerd',
    }),
  }),
});

export const AuthValidation = {
  loginZodSchema,
};
