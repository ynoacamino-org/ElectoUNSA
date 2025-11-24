export interface Documento {
  titulo: string;
  desc: string;
}

export interface Integrante {
  nombre: string;
  cargo: string;
  anio: string;
}

export interface ListaDetallada {
  id: string;
  nombre: string;
  tipo: string; // Rectorado, Decanato, etc.
  anio: string;
  subtitulo: string;
  descripcion: string;
  documentos: Documento[];
  integrantes: Integrante[];
}

export const LISTAS_DATA: ListaDetallada[] = [
  {
    id: '1',
    nombre: 'Renovación Universitaria',
    tipo: 'Rectorado',
    anio: '2025',
    subtitulo: 'Elecciones de Representantes Estudiantiles 2024',
    descripcion: 'Somos la lista Renovación Universitaria y buscamos representar a estudiantes y docentes, promoviendo participación, transparencia y propuestas concretas para mejorar nuestra universidad.',
    documentos: [
      { titulo: "Plan de Trabajo 2025 - 2026", desc: "Documento PDF detallando las propuestas." },
      { titulo: "Propuesta Académica", desc: "Iniciativas y proyectos de la lista." },
    ],
    integrantes: [
      { nombre: "Juan Carlos Quinto", cargo: "Candidato a Asamblea", anio: "2025" },
      { nombre: "Maria Fernandez", cargo: "Candidato a Consejo", anio: "2025" },
    ]
  },
  {
    id: '2',
    nombre: 'UNSA Integra',
    tipo: 'Decanato',
    anio: '2024',
    subtitulo: 'Unidad y Compromiso por tu Facultad',
    descripcion: 'Buscamos integrar a todas las escuelas profesionales bajo una misma visión de modernidad y acreditación internacional.',
    documentos: [
      { titulo: "Plan de Gobierno Decanato", desc: "Propuestas especificas para la facultad." }
    ],
    integrantes: [
      { nombre: "Dr. Luis Peralta", cargo: "Candidato a Decano", anio: "2024" },
      { nombre: "Dra. Ana Soto", cargo: "Vicedecana Académica", anio: "2024" },
    ]
  },
  {
    id: '3',
    nombre: 'Fuerza Estudiantil',
    tipo: 'Asamblea',
    anio: '2025',
    subtitulo: 'Voz Activa de los Estudiantes',
    descripcion: 'Representamos a los estudiantes con propuestas frescas y un compromiso real con la mejora de la calidad educativa y los servicios estudiantiles.',
    documentos: [
      { titulo: "Propuestas para la Asamblea 2025", desc: "Iniciativas estudiantiles para el próximo periodo." }
    ],
    integrantes: [
      { nombre: "Carlos Mendoza", cargo: "Candidato a Asamblea", anio: "2025" },
      { nombre: "Lucia Ramirez", cargo: "Candidata a Consejo", anio: "2025" },
    ]
  },
  // Puedes agregar más listas aquí...
];