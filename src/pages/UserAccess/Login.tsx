// src/pages/UserAccess/Login.tsx

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, LoginSchemaType } from '../../schema/LoginSchema.ts';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { verifyUserCredentials, setLoggedInUserInLocalStorage } from '../../utils/UserLocalStorage.ts';
import UserFormContainer from './UserFormContainer.tsx';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const Login: React.FC = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(LoginSchema),
  });

  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const from = location.state?.from?.pathname || '/account-info'; // Default to '/account-info' if no previous path

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    const { emailOrPhone, passWord } = data;
    const user = verifyUserCredentials(emailOrPhone, passWord);

    if (user) {
      setLoggedInUserInLocalStorage(user);
      toast.success(t('login.login_success'));
      navigate(from, { replace: true }); // Redirect to the previous page or '/account-info'
    } else {
      toast.error(t('login.login_failure'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <UserFormContainer>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full text-md">
          <input
            {...register('emailOrPhone')}
            placeholder={t('login.emailOrPhone')}
            className="w-full border-2 border-gray-300 p-4 my-2 rounded"
            type="text"
          />
          {errors.emailOrPhone && <span className="text-red-500 text-sm">{errors.emailOrPhone.message}</span>}

          <div className="relative my-2">
            <input
              {...register('passWord')}
              placeholder={t('login.password')}
              className="w-full border-2 border-gray-300 p-4 rounded"
              type={showPassword ? 'text' : 'password'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-4 text-gray-500"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
          {errors.passWord && <span className="text-red-500 text-sm">{errors.passWord.message}</span>}

          <button type="submit" className="w-full h-12 bg-red-600 text-white font-bold rounded hover:bg-red-700 mt-5">
            {t('login.submit_button')}
          </button>
        </form>
      </UserFormContainer>
    </div>
  );
};

export default Login;
