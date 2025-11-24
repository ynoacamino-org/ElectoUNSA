import { useParams, Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';
import { getListById } from '../../data/dataManager';

// Importar documentos estáticos
import HojaDeVida from '../../documents/HojaDeVida.pdf';
import PlanDeTrabajo from '../../documents/PlanDeTrabajo.pdf';
import PropuestasDeListas from '../../documents/PropuestasDeListas.pdf';

const archivosMap: Record<string, string> = {
  'documents/HojaDeVida.pdf': HojaDeVida,
  'documents/PlanDeTrabajo.pdf': PlanDeTrabajo,
  'documents/PropuestasDeListas.pdf': PropuestasDeListas
};

export const ListDetailPage = () => {
  const { id } = useParams();
  const data = id ? getListById(id) : undefined;

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

        {/* ENCABEZADO */}
        <div className="mb-10 flex flex-col md:flex-row gap-6 items-start">
            {/* Si tiene logo, lo mostramos */}
            {data.logo && (
                <img src={data.logo} alt="Logo lista" className="w-32 h-32 object-contain rounded-full border-4 border-gray-100 shadow-md" />
            )}
            <div>
                <h1 className="text-4xl font-bold text-unsa-granate mb-2">{data.nombre}</h1>
                <h2 className="text-xl text-gray-500 font-medium mb-6">{data.subtitulo}</h2>
                <p className="text-gray-600 leading-relaxed text-justify max-w-4xl whitespace-pre-wrap">
                    {data.descripcion}
                </p>
            </div>
        </div>

        {/* DOCUMENTOS OFICIALES */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-unsa-granate mb-6">Documentos Oficiales</h3>
          <div className="flex flex-col gap-4">
            {data.documentos.map((doc, index) => {
              // LÓGICA MAESTRA PARA OBTENER EL PDF
              let fileUrl = '#';
              const archivoInfo = (doc as any).archivo;

              if (archivoInfo) {
                if (archivoInfo.startsWith('data:')) {
                    // CASO 1: Es un PDF nuevo (Base64) guardado en memoria
                    fileUrl = archivoInfo;
                } else {
                    // CASO 2: Es un PDF estático del JSON
                    fileUrl = archivosMap[archivoInfo] || '#';
                }
              }

              return (
                <a
                  key={index}
                  href={fileUrl}
                  download={doc.titulo} // Esto fuerza la descarga con el nombre correcto
                  className={`flex items-center gap-4 p-4 border rounded-lg shadow-sm transition-shadow cursor-pointer 
                    ${fileUrl !== '#' ? 'bg-white hover:shadow-md border-gray-300' : 'bg-gray-50 border-gray-200 cursor-not-allowed'}`}
                >
                  <FileText className="w-8 h-8 text-gray-600" strokeWidth={1.5} />
                  <div>
                    <h4 className="text-lg font-bold text-unsa-granate">{doc.titulo}</h4>
                    <p className="text-sm text-gray-500">{doc.desc}</p>
                  </div>
                </a>
              );
            })}
            
            {data.documentos.length === 0 && <p className="text-gray-400 italic">No hay documentos cargados.</p>}
          </div>
        </section>

        {/* INTEGRANTES */}
        <section>
          <h3 className="text-2xl font-bold text-unsa-granate mb-6">Integrantes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.integrantes.map((member, index) => (
              <div key={index} className="flex flex-col border-2 border-unsa-granate/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
                <div className="h-48 bg-rose-200 w-full flex items-center justify-center">
                    <span className="text-unsa-granate/40 font-bold text-4xl">FOTO</span>
                </div> 
                <div className="p-6 flex flex-col grow bg-white">
                  <h4 className="text-lg font-bold text-unsa-granate mb-2 leading-tight">{member.nombre}</h4>
                  <p className="text-gray-700 text-sm mb-1 font-medium">{member.cargo}</p>
                  <p className="text-gray-600 text-sm mb-6">Año: {member.anio}</p>
                  
                  <button className="mt-auto w-full bg-unsa-granate text-white font-bold py-2.5 rounded-lg group-hover:bg-[#4a0f1e] transition-colors text-sm">
                    Ver Hoja de Vida
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ListDetailPage;