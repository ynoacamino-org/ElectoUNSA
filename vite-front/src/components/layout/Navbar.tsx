import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-red-600 text-white py-4 px-8 flex justify-between items-center shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white rounded-full"></div>
        <span className="text-lg font-bold tracking-wide">ElectoUNSA</span>
      </div>

      {/* Menú principal */}
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

        <Link to="/acceso" className="hover:text-gray-200 transition">
          Acceso
        </Link>

        <Link to="/mi-lista" className="hover:text-gray-200 transition">
          Mi Lista
        </Link>
      </div>

      {/* Info derecha */}
      <div className="flex items-center gap-2">
        <span className="text-sm">JuntosUNSA</span>
        <div className="w-8 h-8 bg-white rounded-full"></div>
      </div>
    </nav>
  );
}

export default Navbar;
