import { useNavigate } from "react-router-dom";
import { LanguageProps } from "./types/LanguageType";

const Header = ({ language, setLanguage }: LanguageProps) => {
  const navigate = useNavigate();

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedLanguage = event.target.value;
    if (selectedLanguage === "english" || selectedLanguage === "dansk") {
      const formattedLanguage =
        selectedLanguage === "english" ? "English" : "Dansk";
      setLanguage(formattedLanguage);
    }
  };

  return (
    <div className="fixed top-0 left-0 flex flex-col items-center text-center">
      <header className="text-md relative flex h-12 w-screen flex-row items-center justify-center bg-red-400 text-center text-white shadow-lg md:h-16 md:text-lg lg:h-20 lg:text-xl">
        <i
          className="fa-solid fa-earth-europe mr-1 cursor-pointer"
          onClick={() => navigate("/")}
        ></i>
        <p className="cursor-pointer" onClick={() => navigate("/")}>
          {language === "English" ? "luhvi's page." : "luhvis side."}
        </p>
        <form className="absolute top-1/2 right-8 -translate-y-1/2 text-white">
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
