import { useState, useEffect } from 'react';
import { FilterBar } from '../../components/lists/FilterBar';
import { ListCard } from '../../components/lists/ListCard';
import { getAllLists } from '../../data/dataManager'; // <--- IMPORTANTE: Usamos el gestor
import type { ElectoralList } from '../../types';

// 1. IMPORTAR LOGOS ESTÁTICOS
import LogoRenovacion from '../../assets/renovacion_universitaria.png';
import LogoIntegra from '../../assets/unsa_integra.png';
import LogoFuerza from '../../assets/fuerza_estudiantil.png';

// 2. MAPA DE LOGOS
const logoMap: { [key: string]: string } = {
  "renovacion_universitaria.png": LogoRenovacion,
  "unsa_integra.png": LogoIntegra,
  "fuerza_estudiantil.png": LogoFuerza
};

export const ListsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  
  // Estados de datos
  const [allLists, setAllLists] = useState<ElectoralList[]>([]);
  const [filteredLists, setFilteredLists] = useState<ElectoralList[]>([]);

  // 3. CARGAR DATOS Y PROCESAR IMÁGENES
  useEffect(() => {
    // A. Obtenemos listas del JSON + LocalStorage
    const rawData = getAllLists();
    
    // B. Procesamos los logos
    const processedData = rawData.map(list => {
      // Si la lista tiene un logo que existe en el mapa (es del JSON), úsalo.
      // Si no está en el mapa (es Base64 de una lista nueva), usa el valor original.
      const realLogo = (list.logo && logoMap[list.logo]) ? logoMap[list.logo] : list.logo;
      
      return { ...list, logo: realLogo };
    });

    setAllLists(processedData);
    setFilteredLists(processedData);
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