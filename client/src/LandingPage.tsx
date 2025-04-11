import { useNavigate } from 'react-router-dom';
import Header from './Header';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center text-center mt-20">
        <button
          className="py-7.5 px-20 md:py-10 md:px-25 md:text-3xl lg:py-12.5 lg:px-35 lg:text-4xl mb-2 rounded-full shadow-lg bg-red-400 hover:bg-red-300 transition-colors duration-400 ease-in-out text-lg font-medium text-white cursor-pointer"
          onClick={() => navigate('/signup')}
        >
          Register
        </button>
        <button
          className="py-3.75 px-10 md:py-7.5 md:px-17.5 md:text-lg lg:py-10 lg:px-25 lg:text-2xl rounded-lg shadow-lg bg-red-400 hover:bg-red-300 transition-colors duration-400 ease-in-out text-md text-white cursor-pointer"
          onClick={() => navigate('/signin')}
        >
          Already have an account? Sign In
        </button>
      </div>
    </>
  );
};

export default LandingPage;
