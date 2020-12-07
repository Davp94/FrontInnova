export interface LoginResponse {
  response: string;
  content: Content;
}

interface Content {
  nombre: string;
  token: string;
  sistema: string;
  perfil: string;
  nit: string;
  tipodoc: string;
  docid: string;
  lugemi: string;
  movil?: any;
  opciones: Opcione[];
  aduanas: Aduana[];
}

interface Aduana {
  codigo: string;
  descripcion: string;
}

interface Opcione {
  opcion: string;
  accion?: string;
  descripcion: string;
  anterior?: string;
}