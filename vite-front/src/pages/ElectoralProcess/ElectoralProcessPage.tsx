import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { electoralProcessSteps } from '../../data/electoralProcess';
import ProcessSection from '../../components/electoral/ProcessSection';

interface OrganoInfo {
  id: string;
  title: string;
  content: string;
}

const ElectoralProcessPage: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>('asamblea');

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

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

  return (
    <div className="min-h-screen bg-white text-gray-800 pb-16">

      {/* Header Section */}
      <div className="container mx-auto px-4 pt-12 pb-10 text-center max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-[#5e1320] mb-6">
          Proceso Electoral Universitario
        </h1>
        <p className="text-gray-600 font-medium text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Una guía completa y transparente sobre cómo elegimos a nuestras autoridades y representantes en la universidad.
        </p>
      </div>

      {/* Section 1: Tipos de Organos (Restored) */}
      <section className="container mx-auto px-4 py-8 max-w-4xl mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#751829] mb-2">Tipos de Órganos y Periodicidad</h2>
          <p className="text-gray-500">
            Conoce los diferentes órganos de gobierno que se eligen democráticamente en la UNSA.
          </p>
        </div>

        <div className="space-y-3">
          {organos.map((org) => (
            <div key={org.id} className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-md">
              <button
                onClick={() => toggleSection(org.id)}
                className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-100 transition-colors"
              >
                <span className="font-bold text-[#5e1320]">{org.title}</span>
                {openSection === org.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

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

      {/* Section 2: Etapas del Proceso (Detailed Timeline) */}
      <section className="container mx-auto px-4 py-8 max-w-3xl relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#751829] mb-4">Etapas del Proceso</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            El camino hacia la elección de nuestras autoridades sigue un proceso riguroso y transparente de 11 pasos.
          </p>
        </div>

        <div className="relative">
          {electoralProcessSteps.map((step, index) => (
            <ProcessSection
              key={step.id}
              step={step}
              isLast={index === electoralProcessSteps.length - 1}
            />
          ))}
        </div>
      </section>

      {/* Section 3: Roles (Restored) */}
      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-[#751829] mb-4">Tu Rol es Importante</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            La participación activa de estudiantes y docentes es el motor de nuestra democracia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tarjeta Estudiantes */}
          <div className="bg-gradient-to-br from-[#5e1320] to-[#751829] p-8 rounded-2xl flex flex-col items-start text-white shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4 bg-white/10 p-3 rounded-lg">
              <GraduationCap className="w-8 h-8 text-white" />
              <h3 className="text-xl font-bold">Estudiantes</h3>
            </div>
            <p className="text-white/90 text-sm leading-relaxed">
              Como estudiante, tienes el derecho y deber de informarte sobre los candidatos, participar en los debates y emitir tu voto. También puedes postular como representante.
            </p>
          </div>

          {/* Tarjeta Docentes */}
          <div className="bg-white p-8 rounded-2xl flex flex-col items-start border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4 bg-gray-100 p-3 rounded-lg">
              <Users className="w-8 h-8 text-[#5e1320]" />
              <h3 className="text-xl font-bold text-[#5e1320]">Docentes</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              El claustro docente juega un rol crucial en la elección de las autoridades. Su participación a través del voto y la postulación a cargos es vital para la gobernanza.
            </p>
          </div>
        </div>
      </section>

      {/* Footer / Call to Action */}
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-[#f8f9fa] rounded-2xl p-8 max-w-3xl mx-auto border border-gray-200">
          <h3 className="text-xl font-bold text-[#5e1320] mb-3">
            ¿Tienes dudas sobre el proceso?
          </h3>
          <p className="text-gray-600">
            La participación informada es clave para la democracia universitaria.
            Revisa los reglamentos oficiales o acércate al Comité Electoral.
          </p>
        </div>
      </div>

    </div>
  );
};

export default ElectoralProcessPage;