import React, { useState } from 'react';
import {
  Megaphone,
  ClipboardList,
  ScrollText,
  Vote,
  Presentation,
  GraduationCap,
  Users,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// Definimos los tipos de datos para mantener el código limpio
interface OrganoInfo {
  id: string;
  title: string;
  content: string;
}

interface EtapaInfo {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ElectoralProcessPage: React.FC = () => {
  // Estado para controlar qué acordeón está abierto (por defecto el primero)
  const [openSection, setOpenSection] = useState<string | null>('asamblea');

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  // Datos de la sección "Tipos de Organos"
  const organos: OrganoInfo[] = [
    {
      id: 'asamblea',
      title: 'Asamblea Universitaria',
      content: 'Es el máximo órgano de gobierno de la universidad. Se encarga de modificar el Estatuto, elegir al Rector y Vicerrectores, y tomar decisiones trascendentes para la institución. Las elecciones se realizan cada cuatro años para docentes y cada dos años para estudiantes.'
    },
    {
      id: 'consejo_univ',
      title: 'Consejo Universitario',
      content: 'Es el órgano de dirección superior, de promoción y de ejecución de la universidad. Está integrado por el Rector, los Vicerrectores, los Decanos de las Facultades, el Director de la Escuela de Posgrado, representantes estudiantiles y un representante de los graduados.'
    },
    {
      id: 'consejo_facu',
      title: 'Consejo de Facultad',
      content: 'Es el órgano de gobierno de la Facultad. Está integrado por el Decano, quien lo preside, y por representantes de los docentes y de los estudiantes. Se encarga de aprobar los planes de estudio, grados académicos y títulos profesionales.'
    }
  ];

  // Datos de la sección "Etapas"
  const etapas: EtapaInfo[] = [
    {
      icon: <Megaphone className="w-8 h-8 text-[#5e1320]" />,
      title: 'Convocatoria',
      description: 'El comité Electoral anuncia oficialmente el inicio del proceso y publica el cronograma electoral.'
    },
    {
      icon: <ClipboardList className="w-8 h-8 text-[#5e1320]" />,
      title: 'Inscripción',
      description: 'Los candidatos y listas presentan su postulación cumpliendo los requisitos establecidos.'
    },
    {
      icon: <ScrollText className="w-8 h-8 text-[#5e1320]" />,
      title: 'Campaña',
      description: 'Los candidatos presentan sus propuestas y planes de trabajo a la comunidad universitaria.'
    },
    {
      icon: <Vote className="w-8 h-8 text-[#5e1320]" />,
      title: 'Votación',
      description: 'Estudiantes y docentes emiten su voto de forma secreta, universal y obligatoria.'
    },
    {
      icon: <Presentation className="w-8 h-8 text-[#5e1320]" />,
      title: 'Resultados',
      description: 'El comité electoral realiza el escrutinio y proclama a los ganadores oficialmente.'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 pb-16">

      {/* Header Section */}
      <div className="container mx-auto px-4 pt-10 pb-8 text-center max-w-4xl">
        <h1 className="text-4xl font-bold text-[#5e1320] mb-4">Proceso electoral UNSA</h1>
        <p className="text-gray-600 font-medium text-lg">
          Una guía completa para entender la importancia y el funcionamiento de las elecciones en nuestra universidad
        </p>
      </div>

      {/* Section 1: Tipos de Organos (Acordeón) */}
      <section className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#751829] mb-2">Tipos de Organos y Periodicidad</h2>
          <p className="text-gray-500">
            Conoce los diferentes órganos de gobierno que se eligen democráticamente en la UNSA, sus funciones principales y la frecuencia con la que se renuevan
          </p>
        </div>

        <div className="space-y-3">
          {organos.map((org) => (
            <div key={org.id} className="bg-gray-100 rounded-lg overflow-hidden transition-all duration-300">
              <button
                onClick={() => toggleSection(org.id)}
                className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-200 transition-colors"
              >
                <span className="font-bold text-gray-700">{org.title}</span>
                {openSection === org.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {/* Contenido expandible */}
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openSection === org.id ? 'max-h-40 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
                  }`}
              >
                <p className="text-gray-600 text-sm leading-relaxed">
                  {org.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Etapas del Proceso */}
      <section className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-[#751829] mb-4">Etapas del Proceso Electoral</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            El proceso electoral sigue una serie de pasos secuenciales y organizados para garantizar la transparencia y la participación de toda la comunidad universitaria
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-center relative">
          {/* Línea conectora (visible solo en desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 -z-10" />

          {etapas.map((etapa, index) => (
            <div key={index} className="flex flex-col items-center group">
              <div className="w-24 h-24 bg-[#f3e6e8] rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300 border-4 border-white shadow-sm">
                {etapa.icon}
              </div>
              <h3 className="font-bold text-[#751829] text-lg mb-2">{etapa.title}</h3>
              <p className="text-xs text-gray-500 leading-tight px-2">
                {etapa.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Roles */}
      <section className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-[#751829] mb-4">Rol de Estudiantes y Docentes</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            La participación de toda la comunidad es fundamental para fortalecer nuestra democracia universitaria y elegir a los mejores representantes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tarjeta Estudiantes */}
          <div className="bg-gray-100 p-8 rounded-xl flex flex-col items-start hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-8 h-8 text-black" />
              <h3 className="text-xl font-bold text-[#751829]">Estudiantes</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Como estudiante, tienes el derecho y deber de informarte sobre los candidatos, participar en los debates y, lo más importante, emitir tu voto. También puedes postular como representante para defender los intereses del estamento estudiantil en los órganos del gobierno.
            </p>
          </div>

          {/* Tarjeta Docentes */}
          <div className="bg-gray-100 p-8 rounded-xl flex flex-col items-start hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-black" />
              <h3 className="text-xl font-bold text-[#751829]">Docentes</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              El claustro docente juega un rol crucial en la elección de las autoridades que dirigirán el rumbo académico y administrativo de la universidad. Su participación a través del voto y la postulación a cargos es vital para la gobernanza institucional.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ElectoralProcessPage;