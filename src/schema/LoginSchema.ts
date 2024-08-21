import { z } from 'zod';
import i18n from 'i18next'; // Import i18n directly to use translations

export const LoginSchema = z.object({
  emailOrPhone: z
    .string()
    .min(1, i18n.t('login.errors.emailOrPhone_required') as string), // Use i18n for error message
  passWord: z
    .string()
    .min(1, i18n.t('login.errors.password_required') as string), // Use i18n for error message
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
