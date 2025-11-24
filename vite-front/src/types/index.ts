export type ElectionType = 'Rectorado' | 'Decanato' | 'Asamblea' | 'Consejo';

export interface Member {
  id: string;
  nombre: string;
  cargo: string;
  fotoUrl?: string; // Opcional
  cvUrl?: string;
}

export interface ElectoralList {
  id: string;
  nombre: string;
  tipo: ElectionType;
  anio: string;
  facultad?: string; // Opcional, para decanatos
  descripcion?: string;
  logoUrl?: string; // El cuadro rosa/granate de la imagen
  integrantes: Member[];
  planGobiernoUrl?: string;
}