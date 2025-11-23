import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  // Esto luego se reemplaza con Google Auth
  const [isLoggedIn] = useState(false); 

  return (
    <nav className="bg-red-600 text-white py-4 px-8 flex justify-between items-center shadow-md">
      
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white rounded-full"></div>
        <span className="text-lg font-bold tracking-wide">ElectoUNSA</span>
      </div>

      {/* Menú */}
      <div className="flex gap-6 text-sm font-medium">
        <Link to="/" className="hover:underline decoration-2 underline-offset-4">
          Inicio
        </Link>

        <Link to="/listas" className="hover:text-gray-200 transition">
          Listas
        </Link>

        <Link to="/proceso" className="hover:text-gray-200 transition">
          Proceso Electoral
        </Link>
      </div>

      {/* Parte derecha condicional */}
      <div className="flex items-center gap-2">
        {!isLoggedIn ? (
          // Estado SIN sesión
          <Link to="/acceso" className="text-sm hover:text-gray-200 transition">
            Iniciar sesión
          </Link>
        ) : (
          // Estado CON sesión
          <Link to="/mi-lista" className="flex items-center gap-2 hover:text-gray-200 transition">
            <span className="text-sm">JuntosUNSA</span>
            <div className="w-8 h-8 bg-white rounded-full"></div>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
