//src/pages/UserAccess/Register.tsx

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, RegisterSchemaType } from '../../schema/RegisterSchema.ts';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { saveUserToLocalStorage } from '../../utils/UserLocalStorage.ts';
import UserFormContainer from './UserFormContainer.tsx';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

const Register: React.FC = () => {
  const { t } = useTranslation(); // Initialize useTranslation hook
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(RegisterSchema),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterSchemaType> = async (data) => {
    try {
      // Hash the password before saving
      const hashedPassword = bcrypt.hashSync(data.passWord, 10);
      const userData = { ...data, passWord: hashedPassword };
      saveUserToLocalStorage(userData);
      toast.success(t('register.register_success')); // Use i18n for success message
      navigate('/login');
    } catch {
      toast.error(t('register.register_failure')); // Use i18n for error message
    }
  };

  return (
    <div className="w-full p-4">
      <UserFormContainer>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full text-md">
          <input
            {...register('userName')}
            placeholder={t('register.name')} // Use i18n for placeholder
            className="my-2 w-full border-2 border-gray-300 p-4 rounded-md"
            type="text"
          />
          {errors.userName && <span className="text-red-500">{errors.userName.message}</span>}

          <input
            {...register('phoneNumber')}
            placeholder={t('register.phone')} // Use i18n for placeholder
            className="my-2 w-full border-2 border-gray-300 p-4 rounded-md"
            type="text"
          />
          {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber.message}</span>}

          <input
            {...register('email')}
            placeholder={t('register.email')} // Use i18n for placeholder
            className="my-2 w-full border-2 border-gray-300 p-4 rounded-md"
            type="email"
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}

          <div className="relative my-2">
            <input
              {...register('passWord')}
              placeholder={t('register.password')} // Use i18n for placeholder
              className="w-full border-2 border-gray-300 p-4 rounded-md"
              type={showPassword ? 'text' : 'password'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
          {errors.passWord && <span className="text-red-500">{errors.passWord.message}</span>}

          <button
            type="submit"
            className="w-full h-12 mt-5 bg-red-600 text-white font-bold rounded hover:bg-red-700" // Medium text size, no caps lock
          >
            {t('register.submit_button')} {/* Use i18n for button text */}
          </button>
        </form>
      </UserFormContainer>
    </div>
  );
};

export default Register;
