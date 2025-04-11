import { useNavigate } from 'react-router-dom';
import { LanguageProps } from './types/LanguageType';
import Header from './Header';

const LandingPage = ({ language, setLanguage }: LanguageProps) => {
  const navigate = useNavigate();
  return (
    <>
      <Header language={language} setLanguage={setLanguage} />
      <div className="flex flex-col items-center justify-center text-center mt-20">
        <button
          className="py-7.5 px-20 md:py-10 md:px-25 md:text-3xl lg:py-12.5 lg:px-35 lg:text-4xl mb-6 rounded-full shadow-lg bg-red-400 hover:bg-red-300 transition-colors duration-400 ease-in-out text-lg font-medium text-white cursor-pointer"
          onClick={() => navigate('/signup')}
        >
          {language === 'English' ? 'Register' : 'Tilmeld'}
        </button>
        <button
          className="py-3.75 px-10 md:py-7.5 md:px-17.5 md:text-lg lg:py-10 lg:px-25 lg:text-2xl rounded-lg shadow-lg bg-red-400 hover:bg-red-300 transition-colors duration-400 ease-in-out text-md text-white cursor-pointer"
          onClick={() => navigate('/signin')}
        >
          {language === 'English'
            ? 'Already have an account? Sign In'
            : 'Har du allerede en konto? Log På'}
        </button>
      </div>
    </>
  );
};

export default LandingPage;
