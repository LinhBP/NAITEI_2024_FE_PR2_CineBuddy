import { z } from 'zod';
import i18n from 'i18next'; // Import i18n directly to use translations

export const RegisterSchema = z.object({
  userName: z
    .string()
    .min(1, i18n.t('register.errors.name_required') as string), // Use i18n for error message
  phoneNumber: z
    .string()
    .min(1, i18n.t('register.errors.phone_required') as string), // Use i18n for error message
  email: z
    .string()
    .min(1, i18n.t('register.errors.email_required') as string) // Use i18n for error message
    .email(i18n.t('register.errors.email_invalid') as string), // Use i18n for invalid email message
  passWord: z
    .string()
    .min(1, i18n.t('register.errors.password_required') as string), // Use i18n for error message
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
