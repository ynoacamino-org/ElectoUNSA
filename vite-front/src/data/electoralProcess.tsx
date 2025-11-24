import React from 'react';
import {
  Megaphone,
  FileText,
  AlertCircle,
  Ban,
  CheckCircle2,
  Mic2,
  Vote,
  Calculator,
  Trophy,
  AlertTriangle,
  Check
} from 'lucide-react';

export interface ElectoralStep {
  id: number;
  title: string;
  icon: React.ReactNode;
  content?: string;
  list?: string[];
  subsections?: {
    title: string;
    list: string[];
  }[];
}

export const electoralProcessSteps: ElectoralStep[] = [
  {
    id: 1,
    title: "Convocatoria",
    icon: <Megaphone className="w-6 h-6" />,
    content: "El Comité Electoral Universitario (CEU) publica:",
    list: [
      "El cargo a elegir",
      "El cronograma electoral",
      "Los requisitos para ser candidato",
      "Los requisitos para votar",
      "Los documentos necesarios",
      "La modalidad de votación (presencial o virtual)"
    ]
  },
  {
    id: 2,
    title: "Inscripción de listas y candidatos",
    icon: <FileText className="w-6 h-6" />,
    content: "Los grupos interesados entregan:",
    list: [
      "Solicitud de inscripción",
      "Hoja de vida",
      "Declaración jurada",
      "Copia de DNI",
      "Ficha académica actualizada (en caso de estudiantes)",
      "Plan de trabajo (si es autoridad)"
    ]
  },
  {
    id: 3,
    title: "Subsanación de observaciones",
    icon: <AlertCircle className="w-6 h-6" />,
    content: "Si algún documento falta o está mal:",
    list: [
      "El CEU notifica",
      "Se otorga un plazo corto para corregir",
      "Si no se corrige, la lista queda excluida"
    ]
  },
  {
    id: 4,
    title: "Periodo de tachas",
    icon: <Ban className="w-6 h-6" />,
    content: "Cualquier votante puede presentar una tacha por:",
    list: [
      "Falsedad de información",
      "Incumplimiento de requisitos",
      "Antecedentes o sanciones",
      "Situaciones no permitidas en la normativa"
    ]
  },
  {
    id: 5,
    title: "Publicación de listas hábiles",
    icon: <CheckCircle2 className="w-6 h-6" />,
    content: "Solo las listas que:",
    list: [
      "se inscribieron",
      "corrigieron observaciones",
      "no fueron tachadas"
    ]
  },
  {
    id: 6,
    title: "Campaña electoral",
    icon: <Mic2 className="w-6 h-6" />,
    content: "Las listas pueden:",
    list: [
      "Presentar propuestas",
      "Realizar actividades autorizadas",
      "Participar en debates y foros",
      "Difundir información institucional"
    ]
  },
  {
    id: 7,
    title: "Jornada electoral",
    icon: <Vote className="w-6 h-6" />,
    subsections: [
      {
        title: "Presencial",
        list: [
          "Se instalan mesas de votación",
          "Se verifica identidad",
          "Se entrega cédula",
          "El voto es secreto",
          "Se deposita en ánfora"
        ]
      },
      {
        title: "Virtual",
        list: [
          "El estudiante o docente se autentica",
          "Accede al sistema seguro",
          "Emite su voto una sola vez",
          "Se registra automáticamente en el sistema"
        ]
      }
    ]
  },
  {
    id: 8,
    title: "Escrutinio",
    icon: <Calculator className="w-6 h-6" />,
    subsections: [
      {
        title: "Presencial:",
        list: [
          "Se abren ánforas",
          "Se cuentan los votos",
          "Se llenan actas",
          "Se firman por los miembros de mesa"
        ]
      },
      {
        title: "Virtual:",
        list: [
          "El sistema registra los votos automáticamente",
          "Se genera un reporte de resultados",
          "Se audita la integridad del proceso"
        ]
      }
    ]
  },
  {
    id: 9,
    title: "Proclamación de resultados",
    icon: <Trophy className="w-6 h-6" />,
    content: "El CEU publica:",
    list: [
      "Resultados oficiales",
      "Votos válidos, nulos y blancos",
      "Lista o candidato ganador",
      "Representación obtenida"
    ]
  },
  {
    id: 10,
    title: "Impugnaciones",
    icon: <AlertTriangle className="w-6 h-6" />,
    content: "Durante un plazo breve se pueden presentar reclamos por:",
    list: [
      "Actas mal llenadas",
      "Errores de conteo",
      "Irregularidades",
      "Situaciones excepcionales"
    ]
  },
  {
    id: 11,
    title: "Credenciales",
    icon: <Check className="w-6 h-6" />,
    content: "Finalmente:",
    list: [
      "Se entregan credenciales al candidato o lista ganadora",
      "Queda oficialmente reconocida la autoridad o representante electo"
    ]
  }
];
