// src/schema/LoginSchema.ts

import { z } from 'zod';
import { TFunction } from 'i18next'; // Import TFunction for typing

export const getLoginSchema = (t: TFunction) => {
  return z.object({
    emailOrPhone: z
      .string()
      .min(1, { message: t('login.errors.emailOrPhone_required') }), // Use i18n for error message
    passWord: z
      .string()
      .min(8, { message: t('login.errors.password_required') }) // Updated to match the Register schema
      .regex(/[A-Z]/, { message: t('login.errors.password_uppercase') }) // At least one uppercase letter
      .regex(/[a-z]/, { message: t('login.errors.password_lowercase') }) // At least one lowercase letter
      .regex(/[0-9]/, { message: t('login.errors.password_number') }) // At least one number
      .regex(/[\W_]/, { message: t('login.errors.password_special') }), // At least one special character
    rememberMe: z.boolean().optional(), // Add rememberMe field to the schema
  });
};

export type LoginSchemaType = z.infer<ReturnType<typeof getLoginSchema>>;
