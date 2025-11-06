// Tipos de usuario y autenticación
export type UserRole = "admin" | "tecnico_sst" | "auditor" | "cliente";

export interface User {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
  role: UserRole;
  empresa_id: string;
  activo: boolean;
  creado_en: string;
  actualizado_en: string;
}

// Tipos de empresa
export type NivelRiesgo = "bajo" | "medio" | "alto";
export type TamanoEmpresa = "micro" | "pequeña" | "mediana" | "grande";

export interface Empresa {
  id: string;
  ruc: string;
  razon_social: string;
  actividad_economica: string;
  codigo_ciiu: string;
  nivel_riesgo: NivelRiesgo;
  numero_trabajadores: number;
  direccion: string;
  responsable_sst: string;
  email_contacto: string;
  telefono: string;
  plan_suscripcion: "microempresa" | "pequeña" | "mediana" | "grande";
  estado_suscripcion: "activa" | "cancelada" | "suspendida";
  fecha_inicio_suscripcion: string;
  fecha_proximo_pago: string;
  creado_en: string;
  actualizado_en: string;
}

// Tipos de verificación
export interface Verificacion {
  id: string;
  empresa_id: string;
  numero: number;
  pregunta: string;
  categoria: "administrativa" | "tecnica" | "talento_humano" | "servicios";
  referencia_normativa: string;
  requisitos: string[];
  estado: "cumple" | "no_cumple" | "no_aplica";
  observaciones: string;
  responsable_id: string;
  fecha_revision: string;
  creado_en: string;
  actualizado_en: string;
}

// Tipos de evidencias
export interface Evidencia {
  id: string;
  verificacion_id: string;
  nombre_archivo: string;
  tipo_archivo: string;
  url_archivo: string;
  descripcion: string;
  cargado_por_id: string;
  fecha_carga: string;
  creado_en: string;
}

// Tipos de informes
export interface Informe {
  id: string;
  empresa_id: string;
  titulo: string;
  contenido: string;
  url_pdf: string;
  porcentaje_cumplimiento: number;
  cumplimiento_por_categoria: {
    administrativa: number;
    tecnica: number;
    talento_humano: number;
    servicios: number;
  };
  generado_por_id: string;
  fecha_generacion: string;
  creado_en: string;
}

// Tipos de suscripción
export interface Plan {
  id: string;
  nombre: "microempresa" | "pequeña" | "mediana" | "grande";
  numero_trabajadores_min: number;
  numero_trabajadores_max: number;
  precio_mensual: number;
  numero_usuarios: number;
  caracteristicas: string[];
  stripe_price_id: string;
}

export interface Suscripcion {
  id: string;
  empresa_id: string;
  plan_id: string;
  stripe_subscription_id: string;
  estado: "activa" | "cancelada" | "suspendida";
  fecha_inicio: string;
  fecha_proximo_pago: string;
  fecha_cancelacion?: string;
  creado_en: string;
  actualizado_en: string;
}

// Tipos de chat/asistente
export interface MensajeChat {
  id: string;
  usuario_id: string;
  contenido: string;
  es_usuario: boolean;
  creado_en: string;
}
