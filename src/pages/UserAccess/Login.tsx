//src/pages/UserAccess/Login.tsx

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, LoginSchemaType } from '../../schema/LoginSchema.ts';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { verifyUserCredentials, setLoggedInUserInLocalStorage } from '../../utils/UserLocalStorage.ts';
import UserFormContainer from './UserFormContainer.tsx';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const Login: React.FC = () => {
  const { t } = useTranslation(); // Initialize useTranslation hook
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

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    const { emailOrPhone, passWord } = data;
    const user = verifyUserCredentials(emailOrPhone, passWord);

    if (user) {
      setLoggedInUserInLocalStorage(user);
      toast.success(t('login.login_success')); // Use i18n for success message
      navigate('/account-info');
    } else {
      toast.error(t('login.login_failure')); // Use i18n for error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <UserFormContainer>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full text-md">
          {/* Email or Phone Input */}
          <input
            {...register('emailOrPhone')}
            placeholder={t('login.emailOrPhone')} // Use i18n for placeholder
            className="w-full border-2 border-gray-300 p-4 my-2 rounded"
            type="text"
          />
          {errors.emailOrPhone && <span className="text-red-500 text-sm">{errors.emailOrPhone.message}</span>}

          {/* Password Input */}
          <div className="relative my-2">
            <input
              {...register('passWord')}
              placeholder={t('login.password')} // Use i18n for placeholder
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

          {/* Submit Button */}
          <button type="submit" className="w-full h-12 bg-red-600 text-white font-bold rounded hover:bg-red-700 mt-5">
            {t('login.submit_button')} {/* Use i18n for button text */}
          </button>
        </form>
      </UserFormContainer>
    </div>
  );
};

export default Login;
