import { useState } from 'react';
import { Search, Filter } from 'lucide-react'; 
import { ListCard } from '../../components/lists/ListCard';
type ElectoralList = {
  id: string;
  nombre: string;
  tipo: string;
  anio: string;
  integrantes: { id?: string; nombre?: string }[];
};

const MOCK_LISTAS: ElectoralList[] = [
  { id: '1', nombre: 'Renovación Universitaria', tipo: 'Rectorado', anio: '2025', integrantes: [] },
  { id: '2', nombre: 'UNSA Integra', tipo: 'Decanato', anio: '2024', integrantes: [] },
  { id: '3', nombre: 'Autonomía y Futuro', tipo: 'Asamblea', anio: '2023', integrantes: [] },
  { id: '4', nombre: 'Compromiso Estudiantil', tipo: 'Rectorado', anio: '2025', integrantes: [] },
];

export const ListsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const listasFiltradas = MOCK_LISTAS.filter(l => 
    l.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-unsa-granate">Listas Electorales Autorizadas</h1>
          <p className="text-gray-600 mt-2">Filtra y busca para encontrar la información de las listas participantes.</p>
        </div>

        {/* Barra de Filtros (Estilo de tu imagen) */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row gap-4 items-center">
          
          {/* Input Buscador */}
          <div className="relative grow w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input 
              type="text" 
              placeholder="Buscar por nombre de lista..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-unsa-azul/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Selects de Filtro */}
          <select className="w-full md:w-48 p-2 border border-gray-300 rounded-md text-gray-600 bg-gray-50">
            <option value="">Tipo de Elección</option>
            <option value="Rectorado">Rectorado</option>
            <option value="Decanato">Decanato</option>
          </select>

          <select className="w-full md:w-32 p-2 border border-gray-300 rounded-md text-gray-600 bg-gray-50">
            <option value="">Año</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>

          {/* Botón Aplicar */}
          <button className="w-full md:w-auto bg-unsa-granate text-white px-6 py-2 rounded-md font-medium hover:bg-red-900 transition flex items-center justify-center gap-2">
            <Filter className="h-4 w-4" />
            Aplicar
          </button>
        </div>

        {/* Grilla de Resultados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {listasFiltradas.map((lista) => (
            <ListCard key={lista.id} lista={lista} />
          ))}
        </div>

        {listasFiltradas.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No se encontraron listas con esos criterios.
          </div>
        )}

      </div>
    </div>
  );
};

export default ListsPage;
