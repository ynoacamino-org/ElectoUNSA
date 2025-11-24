import { useParams, Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';
import listsData from '../../data/lists.json';
import { getListById } from '../../data/dataManager';

// Importar todos los documentos que tienes en src/documents
import HojaDeVida from '../../documents/HojaDeVida.pdf';
import PlanDeTrabajo from '../../documents/PlanDeTrabajo.pdf';
import PropuestasDeListas from '../../documents/PropuestasDeListas.pdf';

// Mapear los archivos con las rutas de tu JSON
const archivosMap: Record<string, string> = {
  'documents/HojaDeVida.pdf': HojaDeVida,
  'documents/PlanDeTrabajo.pdf': PlanDeTrabajo,
  'documents/PropuestasDeListas.pdf': PropuestasDeListas
};

export const ListDetailPage = () => {
  const { id } = useParams();
  const data = listsData.find((lista: any) => lista.id === id);

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-unsa-granate">Lista no encontrada</h2>
        <Link to="/listas" className="bg-unsa-azul text-white px-4 py-2 rounded">Volver</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <Link to="/listas" className="inline-flex items-center text-gray-500 hover:text-unsa-granate mb-6 transition">
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver
        </Link>

        {/* Documentos Oficiales */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-unsa-granate mb-6">Documentos Oficiales</h3>
          <div className="flex flex-col gap-4">
            {data.documentos.map((doc, index) => (
              <a
                key={index}
                href={archivosMap[doc.archivo]}
                download
                className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
              >
                <FileText className="w-8 h-8 text-gray-600" strokeWidth={1.5} />
                <div>
                  <h4 className="text-lg font-bold text-unsa-granate">{doc.titulo}</h4>
                  <p className="text-sm text-gray-500">{doc.desc}</p>
                </div>
              </a>
            ))}
            {data.documentos.length === 0 && <p className="text-gray-400">No hay documentos disponibles.</p>}
          </div>
        </section>

        {/* Integrantes */}
        <section>
          <h3 className="text-2xl font-bold text-unsa-granate mb-6">Integrantes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.integrantes.map((member, index) => (
              <a
                key={index}
                href={HojaDeVida} // Se reutiliza HojaDeVida para todos los integrantes
                download
                className="flex flex-col border-2 border-unsa-granate/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
              >
                <div className="h-48 bg-rose-200 w-full"></div> {/* Placeholder Foto */}
                <div className="p-6 flex flex-col grow bg-white">
                  <h4 className="text-lg font-bold text-unsa-granate mb-2 leading-tight">{member.nombre}</h4>
                  <p className="text-gray-700 text-sm mb-1 font-medium">{member.cargo}</p>
                  <p className="text-gray-600 text-sm mb-6">Año: {member.anio}</p>
                  <span className="mt-auto w-full bg-unsa-granate text-white font-bold py-2.5 rounded-lg hover:bg-[#4a0f1e] transition-colors text-sm text-center cursor-pointer">
                    Descargar Hoja de Vida
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ListDetailPage;
