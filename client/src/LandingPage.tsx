import { useNavigate } from "react-router-dom";
import { LanguageProps } from "./types/LanguageType";
import Header from "./Header";

const LandingPage = ({ language, setLanguage }: LanguageProps) => {
  const navigate = useNavigate();
  return (
    <>
      <Header language={language} setLanguage={setLanguage} />
      <div className="mt-20 flex flex-col items-center justify-center text-center">
        <button
          className="mb-6 cursor-pointer rounded-full bg-red-400 px-20 py-7.5 text-lg font-medium text-white shadow-lg transition-colors duration-400 ease-in-out hover:bg-red-300 md:px-25 md:py-10 md:text-3xl lg:px-35 lg:py-12.5 lg:text-4xl"
          onClick={() => navigate("/signup")}
        >
          {language === "English" ? "Register" : "Tilmeld"}
        </button>
        <button
          className="text-md cursor-pointer rounded-lg bg-red-400 px-10 py-3.75 text-white shadow-lg transition-colors duration-400 ease-in-out hover:bg-red-300 md:px-17.5 md:py-7.5 md:text-lg lg:px-25 lg:py-10 lg:text-2xl"
          onClick={() => navigate("/signin")}
        >
          {language === "English"
            ? "Already have an account? Sign In"
            : "Har du allerede en konto? Log På"}
        </button>
      </div>
    </>
  );
};

export default LandingPage;
