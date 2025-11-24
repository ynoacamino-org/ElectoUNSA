import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Leer del localStorage al montar el componente
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const email = localStorage.getItem('userEmail') || '';
    setIsLoggedIn(loggedIn);
    setUserEmail(email);
  }, []);

  const getLinkClasses = (path: string) => {
    const baseClasses = "hover:text-gray-300 transition duration-150";
    
    if (currentPath === path) {
      return `${baseClasses} font-bold border-b-2 border-white pb-2`;
    }
    return `${baseClasses} font-medium`;
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserEmail('');
    setShowDropdown(false);
    window.location.href = '/';
  };

  return (
    <nav className="bg-unsa-granate text-white h-16 shadow-md select-none relative">

      <div className="h-full flex items-center justify-center gap-[25vw]">

        {/* IZQUIERDA */}
        <div className="flex items-center gap-4 ml-8">
          <div className="w-10 h-10 bg-white rounded-full"></div>
          <span className="text-xl font-bold tracking-wide">ElectoUNSA</span>
        </div>

        {/* MENÚ CENTRAL */}
        <div className="flex gap-14 text-base">
          <Link to="/" className={getLinkClasses("/")}>Inicio</Link>
          <Link to="/listas" className={getLinkClasses("/listas")}>Listas</Link>
          <Link to="/proceso" className={getLinkClasses("/proceso")}>Proceso Electoral</Link>
        </div>

        {/* DERECHA */}
        <div className="flex items-center gap-4 mr-8">
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 hover:text-gray-300 transition cursor-pointer"
              >
                <span className="text-sm font-bold">{userEmail}</span>
                <div className="w-9 h-9 bg-white rounded-full hover:bg-gray-100 transition"></div>
              </button>

              {showDropdown && (
                <div className="absolute top-12 right-0 bg-white text-gray-800 rounded-lg shadow-lg p-2 w-48 z-50">
                  <Link 
                    to="/mi-lista" 
                    className="block px-4 py-2 text-sm hover:bg-gray-100 rounded transition cursor-pointer"
                    onClick={() => setShowDropdown(false)}
                  >
                    Mi Lista
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded transition cursor-pointer text-red-600 font-medium"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/acceso" className="text-sm hover:text-gray-300 transition cursor-pointer">
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

