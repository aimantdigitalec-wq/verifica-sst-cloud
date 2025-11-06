# Guía Rápida de Inicio - Verifica SST Cloud

## 📋 Resumen del Proyecto

**Verifica SST Cloud** es una plataforma SaaS profesional para ayudar a empresas ecuatorianas a cumplir con la normativa de Seguridad y Salud en el Trabajo (SST).

### Características Principales

✅ **Clasificación Automática de Empresas** - Basada en número de trabajadores y actividad económica
✅ **Lista de Verificación Completa** - 69 verificaciones del Anexo 1
✅ **Carga de Evidencias** - Sistema de almacenamiento de documentos
✅ **Generación de Informes con IA** - Informes automáticos usando DeepSeek
✅ **Asistente SST AI 24/7** - Chat inteligente con contexto ecuatoriano
✅ **Sistema de Suscripciones** - Integración con PayPal
✅ **Gestión de Usuarios y Roles** - Control de acceso basado en roles
✅ **Dashboard Completo** - Panel de control con indicadores

---

## 🚀 Despliegue Rápido en Vercel

### Requisitos Previos

- Cuenta en GitHub
- Cuenta en Vercel (puedes crear con GitHub)
- Supabase ya configurado con tablas creadas
- Variables de entorno configuradas

### Pasos de Despliegue

#### 1. Crear Repositorio en GitHub

```bash
# Si aún no has subido el código a GitHub
git remote add origin https://github.com/TU_USUARIO/verifica-sst-cloud.git
git branch -M main
git push -u origin main
```

#### 2. Conectar a Vercel

1. Abre https://vercel.com
2. Haz clic en **Add New → Project**
3. Selecciona tu repositorio `verifica-sst-cloud`
4. Haz clic en **Import**

#### 3. Configurar Variables de Entorno

En Vercel, agrega estas variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://kgteuuzqhgbizervsvbl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtndGV1dXpxaGdiaXplcnZzdmJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMDI0MTEsImV4cCI6MjA3NzY3ODQxMX0.VjreNWcNiy1HAKCSHjQYJao1U_yE3Ww4l1_k-t_DhrY
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtndGV1dXpxaGdiaXplcnZzdmJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMDI0MTEsImV4cCI6MjA3NzY3ODQxMX0.VjreNWcNiy1HAKCSHjQYJao1U_yE3Ww4l1_k-t_DhrY
DEEPSEEK_API_KEY=sk-ee1fd6c320234a9fb93a9980d47e9ace
PAYPAL_API_USERNAME=aimant.digital.ec_api1.gmail.com
PAYPAL_API_PASSWORD=XKG8WKPMWWZ7CRTT
PAYPAL_API_SIGNATURE=Ay.4BQR-smjdd4jqY6t77775i5BZAHZF6ICF3GYPapfL-N7xcOgfLmF5
PAYPAL_MODE=sandbox
NEXT_PUBLIC_APP_URL=https://verifica-sst-cloud.vercel.app
```

#### 4. Deploy

Haz clic en **Deploy** y espera a que se complete.

---

## 📚 Documentación Disponible

- **README.md** - Descripción general y stack tecnológico
- **SUPABASE_SQL_CORRECTED.md** - Script SQL para crear tablas
- **SUPABASE_SETUP.md** - Guía de configuración de Supabase
- **VERCEL_DEPLOYMENT.md** - Guía completa de despliegue en Vercel
- **API_DOCUMENTATION.md** - Documentación de endpoints de API
- **DEPLOYMENT.md** - Guía general de despliegue

---

## 🔧 Desarrollo Local

### Instalación

```bash
cd /home/ubuntu/verifica-sst-cloud
npm install
```

### Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3001`

### Variables de Entorno

Copia `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

---

## 📊 Estructura del Proyecto

```
verifica-sst-cloud/
├── src/
│   ├── app/              # Páginas y rutas
│   │   ├── page.tsx      # Landing page
│   │   ├── login/        # Página de login
│   │   ├── registro/     # Página de registro
│   │   ├── dashboard/    # Dashboard principal
│   │   ├── verificaciones/  # Lista de verificaciones
│   │   ├── reportes/     # Página de reportes
│   │   ├── asistente-ai/ # Chat con IA
│   │   ├── planes/       # Planes de suscripción
│   │   └── globals.css   # Estilos globales
│   ├── components/       # Componentes React
│   ├── lib/              # Funciones utilitarias
│   │   ├── supabase.ts   # Cliente Supabase
│   │   ├── deepseek.ts   # Cliente DeepSeek
│   │   └── paypal.ts     # Integración PayPal
│   └── types/            # Tipos TypeScript
├── public/               # Archivos estáticos
├── supabase/             # Configuración Supabase
├── package.json          # Dependencias
├── tsconfig.json         # Configuración TypeScript
├── tailwind.config.ts    # Configuración Tailwind
└── next.config.ts        # Configuración Next.js
```

---

## 🎯 Planes de Suscripción

| Plan | Trabajadores | Precio | Usuarios | Características |
|------|--------------|--------|----------|-----------------|
| **Microempresa** | 1-10 | $15/mes | 1 | Checklist básico |
| **Pequeña** | 11-50 | $35/mes | 3 | Informes PDF |
| **Mediana** | 51-200 | $75/mes | 10 | IA incluida |
| **Grande** | 200+ | $150/mes | Ilimitados | IA avanzada |

---

## 🔐 Seguridad

- ✅ Autenticación con Supabase Auth
- ✅ Row Level Security (RLS) en todas las tablas
- ✅ Variables de entorno seguras en Vercel
- ✅ HTTPS en todas las conexiones
- ✅ Validación de datos en cliente y servidor

---

## 📞 Soporte

Para soporte técnico: support@verificasst.com

---

## 📄 Licencia

MIT License - Ver LICENSE.md

---

## 🎉 ¡Listo para Producción!

Tu plataforma SaaS está lista para desplegar. Sigue los pasos de despliegue en Vercel y estarás en línea en minutos.

**Próximos pasos:**
1. ✅ Crear repositorio en GitHub
2. ✅ Conectar a Vercel
3. ✅ Configurar variables de entorno
4. ✅ Deploy
5. ✅ Configurar dominio personalizado (opcional)
6. ✅ Cambiar a modo live en PayPal (cuando estés listo)

¡Buena suerte! 🚀
