import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchemaType, getLoginSchema } from '../../schema/LoginSchema.ts';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  verifyUserCredentials,
  setLoggedInUserInSessionStorage,
  setLoggedInUserInCookies,
} from '../../utils/UserLocalStorage.ts';
import UserFormContainer from './UserFormContainer.tsx';
import Input from '../../components/Input.tsx';
import { useTranslation } from 'react-i18next';

const Login: React.FC = () => {
  const { t } = useTranslation(); 

  // Dinh nghia schema dung translation strings
  const schema = getLoginSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();
  const location = useLocation();

  // Dung location state, back to previous path, k co thi ve home
  const from = location.state?.from || '/';

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    const { emailOrPhone, passWord, rememberMe } = data;
    const user = verifyUserCredentials(emailOrPhone, passWord);

    if (user) {
      // Ng dung check box remember
      if (rememberMe) {
        setLoggedInUserInCookies(user); 
      } else {
        setLoggedInUserInSessionStorage(user); 
      }

      toast.success(t('login.login_success')); 
      navigate(from, { replace: true }); 
      window.location.reload(); 
    } else {
      toast.error(t('login.login_failure')); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <UserFormContainer>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full text-md">
          {/* Email or Phone */}
          <Input<LoginSchemaType>
            register={register}
            name="emailOrPhone"
            placeholder={t('login.emailOrPhone')}
            error={errors.emailOrPhone}
          />

          {/* Password */}
          <Input<LoginSchemaType>
            register={register}
            name="passWord"
            placeholder={t('login.password')}
            type="password"
            error={errors.passWord}
          />

          {/* Remember Me */}
          <Input<LoginSchemaType>
            register={register}
            name="rememberMe"
            type="checkbox"
            label={t('login.remember_me')}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 bg-red-600 text-white font-bold rounded hover:bg-red-700 mt-5"
          >
            {t('login.submit_button')}
          </button>
        </form>
      </UserFormContainer>
    </div>
  );
};

export default Login;
