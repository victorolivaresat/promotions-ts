import { AuthContext } from "../contexts/AuthContext";
import { FaLock, FaBars } from "react-icons/fa";
import { useContext } from "react";

const Header = ({ toggleSidebar }) => {
  const { currentUser, logoutUser } = useContext(AuthContext);
  return (
    <header className="h-16 bg-white text-white flex items-center justify-between px-4 border-b border-gray-300">
      <div className="flex items-center">
        <button className="p-2 mr-4 text-gray-600" onClick={toggleSidebar}>
          <FaBars size={20} />
        </button>
        <div className="text-xl font-bold text-gray-600">
          {currentUser ? `Bienvenido, ${currentUser.userName}` : "Bienvenido"}
        </div>
      </div>
      <button className="p-2 bg-red-600 hover:bg-red-800" onClick={logoutUser}>
        Cerrar sesión
        <FaLock className="inline ml-2" size={10} />
      </button>
    </header>
  );
};

export default Header;
