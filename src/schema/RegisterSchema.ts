import { z } from 'zod';
import { TFunction } from 'i18next';

export const getRegisterSchema = (t: TFunction) => {
  return z.object({
    userName: z
      .string()
      .min(1, { message: t('register.errors.name_required') }),
    phoneNumber: z
      .string()
      .min(1, { message: t('register.errors.phone_required') }),
    email: z
      .string()
      .min(1, { message: t('register.errors.email_required') })
      .email({ message: t('register.errors.email_invalid') }),
    passWord: z
      .string()
      .min(8, { message: t('register.errors.password_required') })
      .regex(/[A-Z]/, { message: t('register.errors.password_uppercase') })
      .regex(/[a-z]/, { message: t('register.errors.password_lowercase') })
      .regex(/[0-9]/, { message: t('register.errors.password_number') })
      .regex(/[\W_]/, { message: t('register.errors.password_special') }),
    confirmPassword: z
      .string()
      .min(1, { message: t('register.errors.confirm_password_required') }),
  }).refine((data) => data.passWord === data.confirmPassword, {
    message: t('register.errors.passwords_mismatch'),
    path: ['confirmPassword'],
  });
};

export type RegisterSchemaType = z.infer<ReturnType<typeof getRegisterSchema>>;
