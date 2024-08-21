import React from 'react';
import { UseFormRegister, FieldError, FieldValues, Path } from 'react-hook-form';

interface InputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  placeholder?: string;
  type?: string;
  error?: FieldError;
  label?: string; // Checkboxes
}

const Input = <T extends FieldValues>({
  register,
  name,
  placeholder = '',
  type = 'text',
  error,
  label,
}: InputProps<T>) => {
  return (
    <div className="my-2 w-full">
      {/* Input based on type */}
      {type === 'checkbox' ? (
        <div className="flex items-center">
          <input
            {...register(name)}
            type={type}
            id={name}
            className="mr-2"
          />
          {label && <label htmlFor={name}>{label}</label>}
        </div>
      ) : (
        <input
          {...register(name)}
          placeholder={placeholder}
          type={type}
          className="w-full border-2 border-gray-300 p-4 rounded-md"
        />
      )}
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
};

export default Input;
