-- Crear extensión para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de empresas
CREATE TABLE IF NOT EXISTS empresas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ruc VARCHAR(13) UNIQUE NOT NULL,
  razon_social VARCHAR(255) NOT NULL,
  actividad_economica VARCHAR(255),
  codigo_ciiu VARCHAR(10),
  nivel_riesgo VARCHAR(20),
  numero_trabajadores INTEGER,
  direccion TEXT,
  responsable_sst VARCHAR(255),
  email_contacto VARCHAR(255),
  telefono VARCHAR(20),
  plan_suscripcion VARCHAR(50) DEFAULT 'microempresa',
  estado_suscripcion VARCHAR(50) DEFAULT 'activa',
  fecha_inicio_suscripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_proximo_pago TIMESTAMP,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  nombre VARCHAR(255),
  apellido VARCHAR(255),
  role VARCHAR(50) DEFAULT 'cliente',
  empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE,
  activo BOOLEAN DEFAULT true,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de verificaciones
CREATE TABLE IF NOT EXISTS verificaciones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE,
  numero INTEGER,
  pregunta TEXT,
  categoria VARCHAR(50),
  referencia_normativa TEXT,
  requisitos TEXT[],
  estado VARCHAR(20) DEFAULT 'no-aplica',
  observaciones TEXT,
  responsable_id UUID REFERENCES usuarios(id),
  fecha_revision TIMESTAMP,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de evidencias
CREATE TABLE IF NOT EXISTS evidencias (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  verificacion_id UUID REFERENCES verificaciones(id) ON DELETE CASCADE,
  nombre_archivo VARCHAR(255),
  tipo_archivo VARCHAR(50),
  url_archivo TEXT,
  descripcion TEXT,
  notas TEXT,
  cargado_por_id UUID REFERENCES usuarios(id),
  fecha_carga TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de informes
CREATE TABLE IF NOT EXISTS informes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE,
  titulo VARCHAR(255),
  contenido TEXT,
  url_pdf TEXT,
  porcentaje_cumplimiento INTEGER,
  cumplimiento_administrativa INTEGER,
  cumplimiento_tecnica INTEGER,
  cumplimiento_talento_humano INTEGER,
  cumplimiento_servicios INTEGER,
  generado_por_id UUID REFERENCES usuarios(id),
  fecha_generacion TIMESTAMP,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de suscripciones
CREATE TABLE IF NOT EXISTS suscripciones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE,
  plan_id VARCHAR(50),
  paypal_agreement_id VARCHAR(255),
  estado VARCHAR(50) DEFAULT 'activa',
  fecha_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_proximo_pago TIMESTAMP,
  fecha_cancelacion TIMESTAMP,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de mensajes de chat
CREATE TABLE IF NOT EXISTS mensajes_chat (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
  contenido TEXT,
  es_usuario BOOLEAN DEFAULT true,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices para mejorar rendimiento
CREATE INDEX idx_empresas_ruc ON empresas(ruc);
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_empresa_id ON usuarios(empresa_id);
CREATE INDEX idx_verificaciones_empresa_id ON verificaciones(empresa_id);
CREATE INDEX idx_verificaciones_categoria ON verificaciones(categoria);
CREATE INDEX idx_evidencias_verificacion_id ON evidencias(verificacion_id);
CREATE INDEX idx_informes_empresa_id ON informes(empresa_id);
CREATE INDEX idx_suscripciones_empresa_id ON suscripciones(empresa_id);
CREATE INDEX idx_mensajes_chat_usuario_id ON mensajes_chat(usuario_id);

-- Habilitar Row Level Security (RLS)
ALTER TABLE empresas ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE verificaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidencias ENABLE ROW LEVEL SECURITY;
ALTER TABLE informes ENABLE ROW LEVEL SECURITY;
ALTER TABLE suscripciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE mensajes_chat ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para empresas
CREATE POLICY "Empresas: usuarios pueden ver su propia empresa"
  ON empresas FOR SELECT
  USING (
    id IN (
      SELECT empresa_id FROM usuarios WHERE id = auth.uid()
    )
  );

CREATE POLICY "Empresas: solo admin puede crear"
  ON empresas FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Políticas RLS para usuarios
CREATE POLICY "Usuarios: pueden ver usuarios de su empresa"
  ON usuarios FOR SELECT
  USING (
    empresa_id IN (
      SELECT empresa_id FROM usuarios WHERE id = auth.uid()
    )
  );

-- Políticas RLS para verificaciones
CREATE POLICY "Verificaciones: usuarios pueden ver de su empresa"
  ON verificaciones FOR SELECT
  USING (
    empresa_id IN (
      SELECT empresa_id FROM usuarios WHERE id = auth.uid()
    )
  );

CREATE POLICY "Verificaciones: usuarios pueden crear"
  ON verificaciones FOR INSERT
  WITH CHECK (
    empresa_id IN (
      SELECT empresa_id FROM usuarios WHERE id = auth.uid()
    )
  );

CREATE POLICY "Verificaciones: usuarios pueden actualizar"
  ON verificaciones FOR UPDATE
  USING (
    empresa_id IN (
      SELECT empresa_id FROM usuarios WHERE id = auth.uid()
    )
  );

-- Políticas RLS para evidencias
CREATE POLICY "Evidencias: usuarios pueden ver de su empresa"
  ON evidencias FOR SELECT
  USING (
    verificacion_id IN (
      SELECT id FROM verificaciones WHERE empresa_id IN (
        SELECT empresa_id FROM usuarios WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Evidencias: usuarios pueden crear"
  ON evidencias FOR INSERT
  WITH CHECK (
    verificacion_id IN (
      SELECT id FROM verificaciones WHERE empresa_id IN (
        SELECT empresa_id FROM usuarios WHERE id = auth.uid()
      )
    )
  );

-- Políticas RLS para informes
CREATE POLICY "Informes: usuarios pueden ver de su empresa"
  ON informes FOR SELECT
  USING (
    empresa_id IN (
      SELECT empresa_id FROM usuarios WHERE id = auth.uid()
    )
  );

-- Políticas RLS para suscripciones
CREATE POLICY "Suscripciones: usuarios pueden ver de su empresa"
  ON suscripciones FOR SELECT
  USING (
    empresa_id IN (
      SELECT empresa_id FROM usuarios WHERE id = auth.uid()
    )
  );

-- Políticas RLS para mensajes de chat
CREATE POLICY "Mensajes: usuarios pueden ver sus propios mensajes"
  ON mensajes_chat FOR SELECT
  USING (usuario_id = auth.uid());

CREATE POLICY "Mensajes: usuarios pueden crear"
  ON mensajes_chat FOR INSERT
  WITH CHECK (usuario_id = auth.uid());
