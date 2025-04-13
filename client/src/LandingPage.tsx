import { useNavigate } from "react-router-dom";
import { LanguageProps } from "./types/LanguageType";
import Header from "./Header";

const LandingPage = ({ language, setLanguage }: LanguageProps) => {
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const signOut = () => {
    navigate("/signin");
    localStorage.setItem("email", "");
  };

  return (
    <>
      <Header language={language} setLanguage={setLanguage} />
      {email ? (
        <div className="flex flex-col items-center justify-center text-center">
          <p className="mb-8 font-semibold md:text-xl lg:text-3xl">{`${language === "English" ? "Welcome to luhvi's page" : "Velkommen til luhvis side"}, ${email}!`}</p>
          <button
            className="text-md cursor-pointer rounded-full bg-red-400 px-8 py-4 text-white shadow-lg transition-colors duration-400 ease-in-out hover:bg-red-300 md:px-10 md:py-5 md:text-lg lg:px-15 lg:py-7.5 lg:text-2xl"
            onClick={() => signOut()}
          >
            {language === "English" ? "Sign Out" : "Log Ud"}
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
          <button
            className="mb-6 cursor-pointer rounded-full bg-red-400 px-20 py-7.5 text-lg font-medium text-white shadow-lg transition-colors duration-400 ease-in-out hover:bg-red-300 md:px-25 md:py-10 md:text-3xl lg:px-30 lg:py-12 lg:text-4xl"
            onClick={() => navigate("/signup")}
          >
            {language === "English" ? "Register" : "Tilmeld"}
          </button>
          <button
            className="text-md cursor-pointer rounded-lg bg-red-400 px-10 py-4 text-white shadow-lg transition-colors duration-400 ease-in-out hover:bg-red-300 md:px-12 md:py-5 md:text-lg lg:px-15 lg:py-6 lg:text-2xl"
            onClick={() => navigate("/signin")}
          >
            {language === "English"
              ? "Already have an account? Sign In"
              : "Har du allerede en konto? Log På"}
          </button>
        </div>
      )}
    </>
  );
};

export default LandingPage;
