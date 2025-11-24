import { Link } from 'react-router-dom';
import type { ElectoralList } from '../../types';

interface ListCardProps {
  lista: ElectoralList;
}

export const ListCard = ({ lista }: ListCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="h-32 bg-unsa-granate/20 flex items-center justify-center">
        <div className="h-16 w-16 bg-unsa-granate rounded-full opacity-80"></div>
      </div>

      <div className="p-5 grow flex flex-col">
        <h3 className="text-xl font-bold text-unsa-granate mb-1 leading-tight">
          {lista.nombre}
        </h3>
        
        <div className="mt-2 text-sm text-gray-600 space-y-1 mb-4">
          <p><span className="font-semibold">Elección:</span> {lista.tipo}</p>
          <p><span className="font-semibold">Año:</span> {lista.anio}</p>
        </div>

        <div className="mt-auto">
          <Link 
            to={`/listas/${lista.id}`}
            className="block w-full text-center bg-unsa-granate text-white py-2 rounded-md font-medium hover:bg-red-900 transition-colors"
          >
            Ver Detalle
          </Link>
        </div>
      </div>
    </div>
  );
};