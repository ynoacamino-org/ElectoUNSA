// src/types/index.ts
export interface Integrante {
  nombre: string;
  cargo: string;
  anio: string;
}

export interface Documento {
  titulo: string;
  desc: string;
}

export interface ElectoralList {
  id: string;
  nombre: string;
  tipo: string;
  anio: string;
  subtitulo: string;
  descripcion: string;
  documentos: Documento[];
  integrantes: Integrante[];
  logo?: string; // Opcional, para la URL de la imagen
}