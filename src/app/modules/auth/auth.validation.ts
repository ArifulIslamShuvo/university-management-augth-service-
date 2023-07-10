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

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'RefreshToken is requerd',
    }),
  }),
});
const changePasswordZodSchema = z.object({
  oldPassword: z.object({
    refreshToken: z.string({
      required_error: 'old password is requerd',
    }),
  }),
  newPassword: z.object({
    refreshToken: z.string({
      required_error: 'new password is requerd',
    }),
  }),
});

export const AuthValidation = {
  loginZodSchema,
  refreshTokenZodSchema,
  changePasswordZodSchema,
};
