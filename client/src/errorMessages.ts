type ErrorMessages = {
  [key: string]: {
    email: {
      required: string;
      invalid: string;
    };
    password: {
      required: string;
      minLength: string;
    };
    confirmPassword: {
      required: string;
      invalid: string;
    };
    root: string;
  };
};

const errorMessages: ErrorMessages = {
  English: {
    email: {
      required: 'Email is Required',
      invalid: 'Please enter a valid email',
    },
    password: {
      required: 'Password is Required',
      minLength: 'Password must be at least 8 characters',
    },
    confirmPassword: {
      required: 'Please confirm your password',
      invalid: "Passwords don't match",
    },
    root: 'Something went wrong...',
  },
  Dansk: {
    email: {
      required: 'Email er Påkrævet',
      invalid: 'Venligst indtast en gyldig email',
    },
    password: {
      required: 'Adgangskode er Påkrævet',
      minLength: 'Adgangskode skal være mindst 8 tegn',
    },
    confirmPassword: {
      required: 'Venligst bekræft din adgangskode',
      invalid: 'Adgangskoderne er ikke ens',
    },
    root: 'Noget gik galt...',
  },
};

export default errorMessages;
