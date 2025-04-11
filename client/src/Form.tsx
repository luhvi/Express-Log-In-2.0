import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageProps } from './types/LanguageType';
import Header from './Header';

const getSchema = (signIn: boolean) => {
  return z
    .object({
      email: z
        .string()
        .min(1, { message: 'Email is Required' })
        .email({ message: 'Please enter a valid email' }),
      password: z.string().min(1, { message: 'Password is Required' }).min(8, {
        message: 'Password must be at least 8 characters',
      }),
      ...(signIn
        ? {}
        : {
            confirmPassword: z
              .string()
              .min(8, { message: 'Please confirm your password' })
              .min(8, { message: 'Password must be at least 8 characters' }),
          }),
    })
    .superRefine((val, ctx) => {
      if (!signIn && val.password !== val.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords don't match",
          path: ['confirmPassword'],
        });
      }
    });
};

type FormProps = LanguageProps & {
  signIn: boolean;
};

const Form = ({ signIn, language, setLanguage }: FormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const showPasswordIcon = showPassword ? (
    <i className="fa-solid fa-eye w-5"></i>
  ) : (
    <i className="fa-solid fa-eye-slash w-5"></i>
  );

  const showConfirmPasswordIcon = showConfirmPassword ? (
    <i className="fa-solid fa-eye w-5"></i>
  ) : (
    <i className="fa-solid fa-eye-slash w-5"></i>
  );

  const schema = getSchema(signIn);
  type FormFields = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_PUBLIC_DB_URL}/api/signin`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      const result = await res.json();
    } catch (error) {
      if (language === 'English') {
        setError('root', {
          message: 'Something went wrong...',
        });
      } else {
        setError('root', {
          message: 'Noget gik galt...',
        });
      }
    }
  };

  const formHeaderFunc = () => {
    if (language === 'English') {
      if (signIn) {
        return 'Sign In';
      } else {
        return 'Sign Up';
      }
    } else {
      if (signIn) {
        return 'Log På';
      } else {
        return 'Tilmelding';
      }
    }
  };

  const formFooterFunc = () => {
    if (language === 'English') {
      if (signIn) {
        return 'Register';
      } else {
        return 'Already have an account? Sign In';
      }
    } else {
      if (signIn) {
        return 'Tilmeld';
      } else {
        return 'Har du allerede en konto? Log På';
      }
    }
  };

  const formHeader = formHeaderFunc();
  const formFooter = formFooterFunc();

  return (
    <>
      <Header language={language} setLanguage={setLanguage} />
      <div
        className="flex flex-col w-100 bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.2)]"
        style={{ height: signIn ? 420 : 520 }}
      >
        <p className="mt-7 text-red-400 text-2xl font-bold">{formHeader}</p>

        <form
          className="flex flex-col text-start ml-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="text-xl" htmlFor="email">
            Email
          </label>
          <input
            className="outline-none w-80 pr-9 pl-2 py-1.5 mb-1 rounded-xs text-lg shadow-[0_0_5px_rgba(0,0,0,0.1)]"
            {...register('email')}
            type="email"
            name="email"
          />
          <p className="h-6 text-red-500 font-medium">
            {errors.email ? errors.email.message : ''}
          </p>

          <label className="text-xl" htmlFor="password">
            {language === 'English' ? 'Password' : 'Adgangskode'}
          </label>
          <div className="relative">
            <input
              className="outline-none w-80 pr-9 pl-2 py-1.5 mb-1 rounded-xs text-lg shadow-[0_0_5px_rgba(0,0,0,0.1)]"
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              name="password"
            />
            <button
              className="absolute right-12.5 top-1/2 -translate-y-1/2 text-black hover:text-red-500 transition-colors ease-in-out duration-300 cursor-pointer"
              type="button"
              onClick={() =>
                setShowPassword((prevShowPassword) => !prevShowPassword)
              }
            >
              {showPasswordIcon}
            </button>
          </div>
          <p className="h-6 text-red-500 font-medium">
            {errors.password ? errors.password.message : ''}
          </p>

          {!signIn ? (
            <>
              {' '}
              <label className="text-xl" htmlFor="confirmPassword">
                {language === 'English'
                  ? 'Confirm Password'
                  : 'Bekræft Adgangskode'}
              </label>
              <div className="relative">
                <input
                  className="outline-none w-80 pr-9 pl-2 py-1.5 mb-1 rounded-xs text-lg shadow-[0_0_5px_rgba(0,0,0,0.1)]"
                  {...register('confirmPassword')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                />
                <button
                  className="absolute right-12.5 top-1/2 -translate-y-1/2 text-black hover:text-red-500 transition-colors ease-in-out duration-300 cursor-pointer"
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (prevShowConfirmPassword) => !prevShowConfirmPassword
                    )
                  }
                >
                  {showConfirmPasswordIcon}
                </button>
              </div>
              <p className="h-6 text-red-500 font-medium">
                {errors.confirmPassword ? errors.confirmPassword.message : ''}
              </p>
            </>
          ) : null}
          <button
            className="w-80 py-4.5 mt-3 rounded-full bg-red-400 hover:bg-red-300 disabled:bg-gray-900 disabled:text-gray-700 disabled:cursor-not-allowed transition-colors ease-in-out duration-300 text-xl text-white font-semibold shadow-lg cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <p>
                Submitting <i className="fa-solid fa-spinner animate-spin"></i>
              </p>
            ) : language === 'English' ? (
              'Submit'
            ) : (
              'Indsend'
            )}
          </button>
        </form>
        <p className="h-6 mt-1 text-red-500 font-medium">
          {errors.root ? errors.root.message : ''}
        </p>
        <p
          className="text-sm text-red-400 font-semibold cursor-pointer hover:text-red-300 transition-colors duration-300 ease-in-out"
          onClick={() => navigate(signIn ? '/signup' : '/signin')}
        >
          {formFooter}
        </p>
      </div>
    </>
  );
};

export default Form;
