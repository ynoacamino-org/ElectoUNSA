import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-unsa-granate text-white py-4 px-8 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-3">
        {/* Aquí iría el Logo de la UNSA o ícono */}
        <div className="w-8 h-8 bg-white rounded-full"></div>
        <span className="text-lg font-bold tracking-wide">ElectoUNSA</span>
      </div>

      <div className="flex gap-6 text-sm font-medium">
        <Link
          to="/"
          className="hover:underline decoration-2 underline-offset-4"
        >
          Inicio
        </Link>
        <Link to="/listas" className="hover:text-gray-200 transition">
          Listas
        </Link>
        <Link to="/proceso" className="hover:text-gray-200 transition">
          Proceso Electoral
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm">JuntosUNSA</span>
        <div className="w-8 h-8 bg-white rounded-full"></div>
      </div>
    </nav>
  );
};
