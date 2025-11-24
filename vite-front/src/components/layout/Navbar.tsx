import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const [isLoggedIn] = useState(true);

  const getLinkClasses = (path) => {
    const baseClasses = "hover:text-gray-300 transition duration-150";
    
    if (currentPath === path) {
      return `${baseClasses} font-bold border-b-2 border-white pb-2`;
    }
    return `${baseClasses} font-medium`;
  };

  return (
    <nav className="bg-[#651528] text-white h-16 shadow-md select-none relative">

      <div className="h-full flex items-center justify-center gap-140">

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
            <Link to="/mi-lista" className="flex items-center gap-3 hover:text-gray-300 transition">
              <span className="text-sm font-bold">JuntosUNSA</span>
              <div className="w-9 h-9 bg-white rounded-full"></div>
            </Link>
          ) : (
            <Link to="/acceso" className="text-sm hover:text-gray-300 transition">
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

