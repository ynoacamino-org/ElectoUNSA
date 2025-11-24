import { useState, useEffect } from 'react';
import { FilterBar } from '../../components/lists/FilterBar';
import { ListCard } from '../../components/lists/ListCard';
import { getAllLists } from '../../data/dataManager';
import type { ElectoralList } from '../../types';

export const ListsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  
  // Estado que almacena TODAS las listas (JSON + Nuevas)
  const [allLists, setAllLists] = useState<ElectoralList[]>([]);
  // Estado para lo que se muestra en pantalla filtrado
  const [filteredLists, setFilteredLists] = useState<ElectoralList[]>([]);

  // Cargar datos al iniciar
  useEffect(() => {
    const data = getAllLists();
    setAllLists(data);
    setFilteredLists(data);
  }, []);

  const handleApplyFilters = () => {
    let result = allLists;

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
    setFilteredLists(allLists);
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
            <ListCard key={lista.id} lista={lista} />
          ))}
        </div>

        {filteredLists.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-200 mt-6">
            <h3 className="text-xl font-bold text-gray-700">No se encontraron resultados</h3>
            <button onClick={handleClear} className="mt-4 text-unsa-granate font-bold hover:underline">
              Limpiar filtros
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ListsPage;