import { useParams, Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';
import { getListById } from '../../data/dataManager'; // <--- IMPORTANTE

// Documentos
import HojaDeVida from '../../documents/HojaDeVida.pdf';
import PlanDeTrabajo from '../../documents/PlanDeTrabajo.pdf';
import PropuestasDeListas from '../../documents/PropuestasDeListas.pdf';

// Fotos (Del pull request)
import FotoJuan from '../../assets/juan_carlos_quinto.jpg';
import FotoMaria from '../../assets/maria fernandez.jpeg';
import FotoLuis from '../../assets/Luis_peralta.jpeg';
import FotoAna from '../../assets/ana_soto.png';
import FotoCarlos from '../../assets/carlos_mendoza.jpeg';
import FotoLucia from '../../assets/lucia_ramirez.jpeg';
import DefaultPhoto from '../../assets/default.png';

const archivosMap: Record<string, string> = {
  'documents/HojaDeVida.pdf': HojaDeVida,
  'documents/PlanDeTrabajo.pdf': PlanDeTrabajo,
  'documents/PropuestasDeListas.pdf': PropuestasDeListas
};

const fotosMap: Record<string, string> = {
  "juan_carlos_quinto.jpg": FotoJuan,
  "maria fernandez.jpeg": FotoMaria,
  "Luis_peralta.jpeg": FotoLuis,
  "ana_soto.png": FotoAna,
  "carlos_mendoza.jpeg": FotoCarlos,
  "lucia_ramirez.jpeg": FotoLucia
};

export const ListDetailPage = () => {
  const { id } = useParams();
  
  // 1. BUSCAR LA LISTA (Soporta JSON y LocalStorage)
  const rawData = id ? getListById(id) : undefined;

  if (!rawData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-unsa-granate">Lista no encontrada</h2>
        <Link to="/listas" className="bg-unsa-azul text-white px-4 py-2 rounded">Volver</Link>
      </div>
    );
  }

  // 2. Procesar el Logo (Igual que en ListsPage, por si acaso)
  // Nota: Esto asume que tienes logoMap importado o usas rawData.logo si es Base64
  // Como aquí no importamos los logos, asumimos que si es del JSON el <img> fallaría a menos que sea URL
  // Para simplificar en Detalle: Mostramos el logo tal cual si es Base64, o nada si es string de archivo sin mapa.
  // Si quieres que se vean los logos del JSON aquí, tendrías que importar el logoMap igual que en ListsPage.
  
  const data = rawData; 

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <Link to="/listas" className="inline-flex items-center text-gray-500 hover:text-unsa-granate mb-6 transition">
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver
        </Link>

        {/* ENCABEZADO */}
        <div className="mb-10 flex flex-col md:flex-row gap-6 items-start">
            {/* Renderizado de logo seguro */}
            {data.logo && (data.logo.startsWith('data:') || data.logo.startsWith('http')) ? (
                 <img src={data.logo} alt="Logo" className="w-32 h-32 object-contain rounded-full border-4 border-gray-100 shadow-md" />
            ) : null}
            
            <div>
                <h1 className="text-4xl font-bold text-unsa-granate mb-2">{data.nombre}</h1>
                <h2 className="text-xl text-gray-500 font-medium mb-6">{data.subtitulo}</h2>
                <p className="text-gray-600 leading-relaxed text-justify max-w-4xl whitespace-pre-wrap">
                    {data.descripcion}
                </p>
            </div>
        </div>

        {/* DOCUMENTOS */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-unsa-granate mb-6">Documentos Oficiales</h3>
          <div className="flex flex-col gap-4">
            {data.documentos.map((doc, index) => {
              let fileUrl = '#';
              const archivoInfo = (doc as any).archivo;
              if (archivoInfo) {
                if (archivoInfo.startsWith('data:')) fileUrl = archivoInfo;
                else fileUrl = archivosMap[archivoInfo] || '#';
              }

              return (
                <a
                  key={index}
                  href={fileUrl}
                  download={doc.titulo}
                  className={`flex items-center gap-4 p-4 border rounded-lg shadow-sm transition-shadow cursor-pointer 
                    ${fileUrl !== '#' ? 'bg-white hover:shadow-md border-gray-300' : 'bg-gray-50 border-gray-200'}`}
                >
                  <FileText className="w-8 h-8 text-gray-600" strokeWidth={1.5} />
                  <div>
                    <h4 className="text-lg font-bold text-unsa-granate">{doc.titulo}</h4>
                    <p className="text-sm text-gray-500">{doc.desc}</p>
                  </div>
                </a>
              );
            })}
             {data.documentos.length === 0 && <p className="text-gray-400">No hay documentos.</p>}
          </div>
        </section>

        {/* INTEGRANTES */}
        <section>
          <h3 className="text-2xl font-bold text-unsa-granate mb-6">Integrantes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.integrantes.map((member, index) => {
               // 3. MAPEO DE FOTOS
               // Si el miembro tiene propiedad 'foto', la buscamos en el mapa. Si no, Default.
               const fotoKey = (member as any).foto;
               const fotoUrl = fotoKey ? (fotosMap[fotoKey] || DefaultPhoto) : DefaultPhoto;

               return (
                  <div key={index} className="flex flex-col border-2 border-unsa-granate/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
                    <div className="h-48 w-full overflow-hidden bg-gray-100">
                      <img
                        src={fotoUrl}
                        alt={member.nombre}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow bg-white">
                      <h4 className="text-lg font-bold text-unsa-granate mb-2 leading-tight">{member.nombre}</h4>
                      <p className="text-gray-700 text-sm mb-1 font-medium">{member.cargo}</p>
                      <p className="text-gray-600 text-sm mb-6">Año: {member.anio}</p>
                      <button className="mt-auto w-full bg-unsa-granate text-white font-bold py-2.5 rounded-lg transition-colors text-sm">
                        Ver Hoja de Vida
                      </button>
                    </div>
                  </div>
               );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ListDetailPage;