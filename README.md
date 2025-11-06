# Verifica SST Cloud

Plataforma SaaS profesional para ayudar a empresas ecuatorianas a cumplir con la normativa de Seguridad y Salud en el Trabajo (SST).

## 🎯 Características Principales

- **Registro de Empresa y Usuario:** Formulario completo con datos de empresa y usuario
- **Lista de Verificación Dinámica:** 69 verificaciones basadas en Anexo 1
- **Carga de Evidencias:** Sistema de almacenamiento de documentos
- **Generación de Informes con IA:** Informes automáticos usando OpenAI GPT-4
- **Sistema de Usuarios y Roles:** 4 roles con permisos diferenciados
- **Suscripciones y Pagos:** Integración con Stripe
- **Asistente SST AI:** Chat inteligente con contexto ecuatoriano
- **Dashboard:** Panel de control con indicadores de cumplimiento

## 🛠️ Stack Tecnológico

- **Frontend:** Next.js 15 + React 19 + TypeScript + Tailwind CSS
- **Backend:** Node.js + Supabase
- **Autenticación:** Supabase Auth
- **Base de Datos:** PostgreSQL (Supabase)
- **Almacenamiento:** Supabase Storage
- **IA:** OpenAI GPT-4
- **Pagos:** Stripe
- **Hosting:** Vercel

## 📋 Requisitos Previos

- Node.js 18+
- npm o pnpm
- Cuenta de Supabase
- Claves de API de OpenAI
- Claves de Stripe

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd verifica-sst-cloud
```

### 2. Instalar dependencias

```bash
npm install
# o
pnpm install
```

### 3. Configurar variables de entorno

Copiar `.env.example` a `.env.local` y completar con tus credenciales:

```bash
cp .env.example .env.local
```

Editar `.env.local` con:

```
NEXT_PUBLIC_SUPABASE_URL=tu_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima
SUPABASE_SERVICE_ROLE_KEY=tu_clave_servicio
OPENAI_API_KEY=tu_clave_openai
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=tu_clave_publica_stripe
STRIPE_SECRET_KEY=tu_clave_secreta_stripe
STRIPE_WEBHOOK_SECRET=tu_webhook_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Ejecutar en desarrollo

```bash
npm run dev
# o
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📊 Estructura del Proyecto

```
verifica-sst-cloud/
├── src/
│   ├── app/              # Páginas y rutas
│   │   ├── page.tsx      # Landing page
│   │   ├── login/        # Página de login
│   │   ├── registro/     # Página de registro
│   │   ├── dashboard/    # Dashboard principal
│   │   └── globals.css   # Estilos globales
│   ├── components/       # Componentes React
│   ├── lib/              # Funciones utilitarias
│   │   ├── supabase.ts   # Cliente Supabase
│   │   ├── openai.ts     # Cliente OpenAI
│   │   └── stripe.ts     # Configuración Stripe
│   └── types/            # Tipos TypeScript
├── public/               # Archivos estáticos
├── .env.example          # Variables de entorno ejemplo
├── next.config.ts        # Configuración Next.js
├── tailwind.config.ts    # Configuración Tailwind
└── package.json          # Dependencias
```

## 🔐 Configuración de Supabase

### 1. Crear proyecto en Supabase

1. Ir a https://supabase.com
2. Crear un nuevo proyecto
3. Copiar la URL y claves de API

### 2. Crear tablas en Supabase

```sql
-- Tabla de empresas
CREATE TABLE empresas (
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
  plan_suscripcion VARCHAR(50),
  estado_suscripcion VARCHAR(50),
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de usuarios
CREATE TABLE usuarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  nombre VARCHAR(255),
  apellido VARCHAR(255),
  role VARCHAR(50),
  empresa_id UUID REFERENCES empresas(id),
  activo BOOLEAN DEFAULT true,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de verificaciones
CREATE TABLE verificaciones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID REFERENCES empresas(id),
  numero INTEGER,
  pregunta TEXT,
  categoria VARCHAR(50),
  referencia_normativa TEXT,
  estado VARCHAR(20),
  observaciones TEXT,
  responsable_id UUID REFERENCES usuarios(id),
  fecha_revision TIMESTAMP,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de evidencias
CREATE TABLE evidencias (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  verificacion_id UUID REFERENCES verificaciones(id),
  nombre_archivo VARCHAR(255),
  tipo_archivo VARCHAR(50),
  url_archivo TEXT,
  descripcion TEXT,
  cargado_por_id UUID REFERENCES usuarios(id),
  fecha_carga TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Configurar Row Level Security (RLS)

Habilitar RLS en todas las tablas para que cada empresa solo vea sus datos.

## 💳 Configuración de Stripe

1. Crear cuenta en https://stripe.com
2. Crear productos para cada plan
3. Copiar las claves de API
4. Configurar webhooks para eventos de suscripción

## 🤖 Configuración de OpenAI

1. Crear cuenta en https://openai.com
2. Generar clave de API
3. Agregar a `.env.local`

## 📝 Planes de Suscripción

| Plan | Trabajadores | Precio | Usuarios | Características |
|------|--------------|--------|----------|-----------------|
| Microempresa | 1-10 | $15/mes | 1 | Checklist básico |
| Pequeña | 11-50 | $35/mes | 3 | Informes PDF |
| Mediana | 51-200 | $75/mes | 10 | IA incluida |
| Grande | 200+ | $150/mes | Ilimitados | IA avanzada |

## 🚀 Despliegue

### Desplegar en Vercel

1. Conectar repositorio a Vercel
2. Configurar variables de entorno
3. Deploy automático

```bash
vercel deploy
```

## 📚 Documentación

- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Stripe Docs](https://stripe.com/docs)
- [OpenAI Docs](https://platform.openai.com/docs)

## 📞 Soporte

Para soporte técnico, contactar a: support@verificasst.com

## 📄 Licencia

MIT License - Ver LICENSE.md

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abrir un issue o pull request.

---

**Verifica SST Cloud** - Cumplimiento de SST en Ecuador hecho simple.
