import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchemaType, getRegisterSchema } from '../../schema/RegisterSchema.ts';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { saveUserToLocalStorage, setLoggedInUserInSessionStorage, getUsersFromLocalStorage } from '../../utils/UserLocalStorage.ts';
import UserFormContainer from './UserFormContainer.tsx';
import Input from '../../components/Input.tsx';
import { useTranslation } from 'react-i18next';

const Register: React.FC = () => {
  const { t } = useTranslation();

  const schema = getRegisterSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterSchemaType> = async (data) => {
    const users = getUsersFromLocalStorage();
    const userExists = users.some(
      (user) => user.email === data.email || user.phoneNumber === data.phoneNumber
    );

    if (userExists) {
      toast.error(t('register.user_exists'));
      return;
    }

    try {
      const hashedPassword = bcrypt.hashSync(data.passWord, 10);
      const userData = { ...data, passWord: hashedPassword };

      // Save user to local storage
      saveUserToLocalStorage(userData);

      // Set the newly registered user as the logged-in user
      setLoggedInUserInSessionStorage(userData);

      toast.success(t('register.register_success'));

      // Redirect to the homepage
      navigate('/');
    } catch {
      toast.error(t('register.register_failure'));
    }
  };

  return (
    <div className="w-full p-4">
      <UserFormContainer>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full text-md">
          <Input<RegisterSchemaType>
            register={register}
            name="userName"
            placeholder={t('register.name')}
            error={errors.userName}
          />
          <Input<RegisterSchemaType>
            register={register}
            name="phoneNumber"
            placeholder={t('register.phone')}
            type="text"
            error={errors.phoneNumber}
          />
          <Input<RegisterSchemaType>
            register={register}
            name="email"
            placeholder={t('register.email')}
            type="email"
            error={errors.email}
          />
          <Input<RegisterSchemaType>
            register={register}
            name="passWord"
            placeholder={t('register.password')}
            type="password"
            error={errors.passWord}
          />
          <Input<RegisterSchemaType>
            register={register}
            name="confirmPassword"
            placeholder={t('register.confirm_password')}
            type="password"
            error={errors.confirmPassword}
          />
          <button
            type="submit"
            className="w-full h-12 mt-5 bg-red-600 text-white font-bold rounded hover:bg-red-700"
          >
            {t('register.submit_button')}
          </button>
        </form>
      </UserFormContainer>
    </div>
  );
};

export default Register;
