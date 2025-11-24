import { Search, Filter, X } from "lucide-react";

interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
  selectedYear: string;
  setSelectedYear: (value: string) => void;
  onApply: () => void;
  onClear: () => void;
}

export const FilterBar = ({
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
  selectedYear,
  setSelectedYear,
  onApply,
  onClear,
}: FilterBarProps) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-col lg:flex-row gap-4 items-center">
      <div className="relative w-full lg:flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-unsa-azul/20 focus:border-unsa-azul transition duration-150 ease-in-out sm:text-sm"
          placeholder="Buscar por nombre de candidato o lista..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="w-full lg:w-48">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="block w-full py-2.5 px-3 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-unsa-azul/20 focus:border-unsa-azul sm:text-sm text-gray-700 cursor-pointer"
        >
          <option value="">Tipo de Elección</option>
          <option value="Rectorado">Rectorado</option>
          <option value="Decanato">Decanato</option>
          <option value="Asamblea">Asamblea Univ.</option>
          <option value="Consejo">Consejo Univ.</option>
        </select>
      </div>

      <div className="w-full lg:w-32">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="block w-full py-2.5 px-3 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-unsa-azul/20 focus:border-unsa-azul sm:text-sm text-gray-700 cursor-pointer"
        >
          <option value="">Año</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
      </div>

      <div className="flex w-full lg:w-auto gap-2">
        <button
          onClick={onApply}
          className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-unsa-granate hover:bg-[#4a0f1e] text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 shadow-sm"
        >
          <Filter className="h-4 w-4" />
          Aplicar Filtros
        </button>

        {(searchTerm || selectedType || selectedYear) && (
          <button
            onClick={onClear}
            className="flex items-center justify-center p-2.5 text-gray-500 hover:text-unsa-granate hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
            title="Limpiar filtros"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};
