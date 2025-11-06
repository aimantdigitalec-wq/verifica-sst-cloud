# Guía de Despliegue - Verifica SST Cloud

## Despliegue en Vercel

### Paso 1: Preparar el Repositorio

1. Inicializar Git (si no está inicializado):
```bash
cd /home/ubuntu/verifica-sst-cloud
git init
git add .
git commit -m "Initial commit: Verifica SST Cloud SaaS"
```

2. Crear repositorio en GitHub:
- Ir a https://github.com/new
- Crear repositorio `verifica-sst-cloud`
- Seguir las instrucciones para push

```bash
git remote add origin https://github.com/tu-usuario/verifica-sst-cloud.git
git branch -M main
git push -u origin main
```

### Paso 2: Conectar a Vercel

1. Ir a https://vercel.com
2. Hacer login con GitHub
3. Hacer clic en "New Project"
4. Seleccionar el repositorio `verifica-sst-cloud`
5. Configurar variables de entorno

### Paso 3: Configurar Variables de Entorno en Vercel

En el panel de Vercel, ir a Settings → Environment Variables y agregar:

```
NEXT_PUBLIC_SUPABASE_URL=https://kgteuuzqhgbizervsvbl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DEEPSEEK_API_KEY=sk-ee1fd6c320234a9fb93a9980d47e9ace
PAYPAL_API_USERNAME=aimant.digital.ec_api1.gmail.com
PAYPAL_API_PASSWORD=XKG8WKPMWWZ7CRTT
PAYPAL_API_SIGNATURE=Ay.4BQR-smjdd4jqY6t77775i5BZAHZF6ICF3GYPapfL-N7xcOgfLmF5
PAYPAL_MODE=sandbox
NEXT_PUBLIC_APP_URL=https://tu-dominio.vercel.app
```

### Paso 4: Deploy

Vercel desplegará automáticamente cuando hagas push a la rama `main`.

Para desplegar manualmente:
```bash
vercel deploy --prod
```

---

## Configuración de Dominio Personalizado

1. En Vercel, ir a Settings → Domains
2. Agregar tu dominio personalizado
3. Actualizar DNS según las instrucciones de Vercel

---

## Configuración de Supabase para Producción

### 1. Crear Tablas

Ejecutar el script SQL en Supabase:

```sql
-- Copiar el contenido de supabase/migrations/001_create_tables.sql
-- y ejecutarlo en el SQL Editor de Supabase
```

### 2. Configurar Row Level Security (RLS)

Las políticas RLS ya están incluidas en el script SQL.

### 3. Habilitar Autenticación

En Supabase Dashboard:
1. Ir a Authentication → Providers
2. Habilitar Email/Password
3. Configurar URLs de redirección:
   - `https://tu-dominio.vercel.app/auth/callback`
   - `https://tu-dominio.vercel.app/`

---

## Configuración de PayPal para Producción

### 1. Cambiar de Sandbox a Live

En `.env.local` (o variables de Vercel):
```
PAYPAL_MODE=live
```

### 2. Obtener Credenciales Live

1. Ir a https://www.paypal.com/signin
2. Ir a Account Settings → API Signature
3. Copiar las credenciales live

### 3. Configurar Webhooks

En PayPal Dashboard:
1. Ir a Settings → Webhook
2. Agregar webhook URL: `https://tu-dominio.vercel.app/api/webhooks/paypal`
3. Seleccionar eventos:
   - Subscription created
   - Subscription updated
   - Subscription cancelled

---

## Configuración de DeepSeek para Producción

DeepSeek ya está configurado para producción. Solo asegúrate de tener créditos suficientes en tu cuenta.

---

## Monitoreo y Logs

### Vercel Logs
```bash
vercel logs
```

### Supabase Logs
En Supabase Dashboard → Logs

### DeepSeek API Logs
En https://platform.deepseek.com/usage

---

## Backups

### Supabase
Supabase realiza backups automáticos. Para descargar un backup:
1. Ir a Supabase Dashboard → Backups
2. Descargar el backup deseado

### Base de Datos Manual
```bash
pg_dump -h kgteuuzqhgbizervsvbl.supabase.co -U postgres -d postgres > backup.sql
```

---

## Escalabilidad

### Supabase
- Plan Free: Hasta 500MB de almacenamiento
- Plan Pro: Desde $25/mes con almacenamiento ilimitado

### Vercel
- Plan Free: Suficiente para la mayoría de casos
- Plan Pro: Desde $20/mes para mejor rendimiento

### DeepSeek
- Planes pagos según uso de API

---

## Troubleshooting

### Error: "NEXT_PUBLIC_SUPABASE_URL is not defined"
Asegúrate de que las variables de entorno estén configuradas en Vercel.

### Error: "PayPal API error"
Verifica que las credenciales de PayPal sean correctas y que estés usando el modo correcto (sandbox/live).

### Error: "DeepSeek API error"
Verifica que tengas créditos disponibles y que la clave de API sea válida.

---

## Checklist de Despliegue

- [ ] Repositorio creado en GitHub
- [ ] Proyecto conectado a Vercel
- [ ] Variables de entorno configuradas
- [ ] Tablas de Supabase creadas
- [ ] RLS habilitado
- [ ] Autenticación configurada
- [ ] PayPal webhooks configurados
- [ ] Dominio personalizado configurado
- [ ] SSL certificado (automático en Vercel)
- [ ] Backups configurados
- [ ] Monitoreo activado
- [ ] Tests realizados en producción

---

## Contacto de Soporte

Para soporte técnico: support@verificasst.com
