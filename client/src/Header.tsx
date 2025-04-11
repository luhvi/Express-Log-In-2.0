import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col items-center text-center fixed top-0 left-0 cursor-pointer"
      onClick={() => navigate('/')}
    >
      <header className="flex flex-row items-center justify-center text-center w-screen h-12 md:h-16 lg:h-20 bg-red-400 text-md md:text-lg lg:text-xl text-white shadow-lg">
        <i className="fa-solid fa-earth-europe mr-1"></i>
        <p>luhvi's page.</p>
      </header>
    </div>
  );
};

export default Header;
