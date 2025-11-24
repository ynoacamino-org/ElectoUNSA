import React from 'react';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../../assets/default.png';

export const ListCard = ({ lista }: { lista: any }) => {
  const navigate = useNavigate();

  // Si no hay logo, usar default
  const logoSrc = lista.logo ? lista.logo : defaultImage;

  const handleViewDetails = () => {
    navigate(`/listas/${lista.id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition-all hover:shadow-xl h-full">
      <img
        src={logoSrc.startsWith('assets') ? defaultImage : logoSrc}
        alt={lista.nombre}
        className="w-28 h-28 rounded-full object-cover mb-4"
      />
      <h3 className="text-xl font-semibold text-unsa-granate mb-2">{lista.nombre}</h3>
      <p className="text-gray-600 text-sm mb-6 flex-grow">{lista.descripcion}</p>
      <button
        onClick={handleViewDetails}
        className="bg-[#651528] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#4a0f1e] transition-colors cursor-pointer w-4/5"
      >
        Ver Detalles
      </button>
    </div>
  );
};
