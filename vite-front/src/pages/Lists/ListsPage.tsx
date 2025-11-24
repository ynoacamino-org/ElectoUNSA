import { useState } from 'react';
import { FilterBar } from '../../components/lists/FilterBar';
import { ListCard } from '../../components/lists/ListCard';
import { LISTAS_DATA } from '../../data/lists';
import type { ListaDetallada } from '../../data/lists';

export const ListsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const [filteredLists, setFilteredLists] = useState<ListaDetallada[]>(LISTAS_DATA);

  // Lógica para APLICAR filtros
  const handleApplyFilters = () => {
    let result = LISTAS_DATA;

    if (searchTerm.trim() !== '') {
      result = result.filter(lista => 
        lista.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== '') {
      result = result.filter(lista => lista.tipo === selectedType);
    }

    if (selectedYear !== '') {
      result = result.filter(lista => lista.anio === selectedYear);
    }

    setFilteredLists(result);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSelectedType('');
    setSelectedYear('');
    setFilteredLists(LISTAS_DATA);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-unsa-granate">Listas Electorales Autorizadas</h1>
          <p className="text-gray-600 mt-2 text-lg">
            Filtra y busca para encontrar la información de las listas participantes.
          </p>
        </div>

        <FilterBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          onApply={handleApplyFilters}
          onClear={handleClear}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredLists.map((lista) => (
            <ListCard 
              key={lista.id} 
              lista={lista} 
            />
          ))}
        </div>

        {filteredLists.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-200 shadow-sm mt-6">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-700">No se encontraron resultados</h3>
            <p className="text-gray-500 mt-2">Intenta ajustar los filtros o limpiar la búsqueda.</p>
            <button 
              onClick={handleClear}
              className="mt-4 text-unsa-granate font-bold hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ListsPage;