import { useNavigate } from 'react-router-dom';
import { LanguageProps } from './types/LanguageType';

const Header = ({ language, setLanguage }: LanguageProps) => {
  const navigate = useNavigate();

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedLanguage = event.target.value;
    if (selectedLanguage === 'english' || selectedLanguage === 'dansk') {
      const formattedLanguage =
        selectedLanguage === 'english' ? 'English' : 'Dansk';
      setLanguage(formattedLanguage);
    }
  };

  return (
    <div className="flex flex-col items-center text-center fixed top-0 left-0">
      <header className="flex flex-row items-center justify-center text-center relative w-screen h-12 md:h-16 lg:h-20 bg-red-400 text-md md:text-lg lg:text-xl text-white shadow-lg">
        <i
          className="fa-solid fa-earth-europe mr-1 cursor-pointer"
          onClick={() => navigate('/')}
        ></i>
        <p className="cursor-pointer" onClick={() => navigate('/')}>
          {language === 'English' ? "luhvi's page." : 'luhvis side.'}
        </p>
        <form className="absolute right-8 top-1/2 -translate-y-1/2 text-white">
          <select
            className="outline-none"
            name="language"
            onChange={handleLanguageChange}
            value={language.toLowerCase()}
          >
            <option className="text-black" value="english">
              English
            </option>
            <option className="text-black" value="dansk">
              Dansk
            </option>
          </select>
        </form>
      </header>
    </div>
  );
};

export default Header;
