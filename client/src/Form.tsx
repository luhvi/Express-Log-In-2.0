import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageProps } from "./types/LanguageType";
import Header from "./Header";
import errorMessages from "./errorMessages";

const getSchema = (signIn: boolean, language: string) => {
  return z
    .object({
      email: z
        .string()
        .min(1, { message: errorMessages[language].email.required })
        .email({ message: errorMessages[language].email.invalid }),
      password: z
        .string()
        .min(1, { message: errorMessages[language].password.required })
        .min(8, {
          message: errorMessages[language].password.minLength,
        }),
      ...(signIn
        ? {}
        : {
            confirmPassword: z
              .string()
              .min(8, {
                message: errorMessages[language].confirmPassword.required,
              })
              .min(8, { message: "" }),
          }),
    })
    .superRefine((val, ctx) => {
      if (!signIn && val.password !== val.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: errorMessages[language].confirmPassword.invalid,
          path: ["confirmPassword"],
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
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const schema = getSchema(signIn, language);
  type FormFields = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
    try {
      setIsSubmitting(true);
      const res = await fetch(
        `${import.meta.env.VITE_PUBLIC_DB_URL}/api/${
          signIn ? "signin" : "signup"
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      localStorage.setItem("authToken", result.token);
      localStorage.setItem("email", data.email);

      setTimeout(() => {
        setIsSubmitting(false);
        navigate("./");
      }, 1000);
    } catch (error) {
      setIsSubmitting(false);
      setError("root", {
        message: errorMessages[language].root,
      });
    }
  };

  const formHeaderFunc = () => {
    if (language === "English") {
      if (signIn) {
        return "Sign In";
      } else {
        return "Sign Up";
      }
    } else {
      if (signIn) {
        return "Log På";
      } else {
        return "Tilmelding";
      }
    }
  };

  const formFooterFunc = () => {
    if (language === "English") {
      if (signIn) {
        return "Register";
      } else {
        return "Already have an account? Sign In";
      }
    } else {
      if (signIn) {
        return "Tilmeld";
      } else {
        return "Har du allerede en konto? Log På";
      }
    }
  };

  const formHeader = formHeaderFunc();
  const formFooter = formFooterFunc();

  return (
    <>
      <Header language={language} setLanguage={setLanguage} />
      <div
        className="flex w-100 flex-col rounded-sm bg-white shadow-[0_0_10px_rgba(0,0,0,0.2)]"
        style={{ height: signIn ? 420 : 520 }}
      >
        <p className="mt-7 text-2xl font-bold text-red-400">{formHeader}</p>

        <form
          className="ml-10 flex flex-col text-start"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="text-xl" htmlFor="email">
            Email
          </label>
          <input
            className="mb-1 w-80 rounded-xs py-1.5 pr-9 pl-2 text-lg shadow-[0_0_5px_rgba(0,0,0,0.1)] outline-none"
            {...register("email")}
            type="email"
            name="email"
          />
          <p className="h-6 font-medium text-red-500">
            {errors.email ? errors.email.message : ""}
          </p>

          <label className="text-xl" htmlFor="password">
            {language === "English" ? "Password" : "Adgangskode"}
          </label>
          <div className="relative">
            <input
              className="mb-1 w-80 rounded-xs py-1.5 pr-9 pl-2 text-lg shadow-[0_0_5px_rgba(0,0,0,0.1)] outline-none"
              {...register("password")}
              type={showPassword ? "text" : "password"}
              name="password"
            />
            <button
              className="absolute top-1/2 right-12.5 -translate-y-1/2 cursor-pointer text-black transition-colors duration-300 ease-in-out hover:text-red-500"
              type="button"
              onClick={() =>
                setShowPassword((prevShowPassword) => !prevShowPassword)
              }
            >
              {showPasswordIcon}
            </button>
          </div>
          <p className="h-6 font-medium text-red-500">
            {errors.password ? errors.password.message : ""}
          </p>

          {!signIn ? (
            <>
              {" "}
              <label className="text-xl" htmlFor="confirmPassword">
                {language === "English"
                  ? "Confirm Password"
                  : "Bekræft Adgangskode"}
              </label>
              <div className="relative">
                <input
                  className="mb-1 w-80 rounded-xs py-1.5 pr-9 pl-2 text-lg shadow-[0_0_5px_rgba(0,0,0,0.1)] outline-none"
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                />
                <button
                  className="absolute top-1/2 right-12.5 -translate-y-1/2 cursor-pointer text-black transition-colors duration-300 ease-in-out hover:text-red-500"
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (prevShowConfirmPassword) => !prevShowConfirmPassword,
                    )
                  }
                >
                  {showConfirmPasswordIcon}
                </button>
              </div>
              <p className="h-6 font-medium text-red-500">
                {errors.confirmPassword ? errors.confirmPassword.message : ""}
              </p>
            </>
          ) : null}
          <button
            className="mt-3 w-80 cursor-pointer rounded-full bg-red-400 py-4.5 text-xl font-semibold text-white shadow-lg transition-colors duration-300 ease-in-out hover:bg-red-300 disabled:cursor-not-allowed disabled:bg-gray-900 disabled:text-gray-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              language === "English" ? (
                <p>
                  Submitting{" "}
                  <i className="fa-solid fa-spinner animate-spin"></i>
                </p>
              ) : (
                <p>
                  Indsender <i className="fa-solid fa-spinner animate-spin"></i>
                </p>
              )
            ) : language === "English" ? (
              "Submit"
            ) : (
              "Indsend"
            )}
          </button>
        </form>
        <p className="mt-1 h-6 font-medium text-red-500">
          {errors.root ? errors.root.message : ""}
        </p>
        <p
          className="cursor-pointer text-sm font-semibold text-red-400 transition-colors duration-300 ease-in-out hover:text-red-300"
          onClick={() => navigate(signIn ? "/signup" : "/signin")}
        >
          {formFooter}
        </p>
      </div>
    </>
  );
};

export default Form;
