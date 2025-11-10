# Variables de Entorno para Vercel - Verifica SST Cloud

## 📋 Lista Completa de Variables

Copia y pega estas variables en Vercel: **Settings → Environment Variables**

### 1. Supabase Configuration

```
NEXT_PUBLIC_SUPABASE_URL=https://kgteuuzqhgbizervsvbl.supabase.co
```

**Descripción:** URL del proyecto Supabase**Tipo:** Public (NEXT_PUBLIC_)**Origen:** Supabase Dashboard → Settings → API

---

```
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtndGV1dXpxaGdiaXplcnZzdmJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMDI0MTEsImV4cCI6MjA3NzY3ODQxMX0.VjreNWcNiy1HAKCSHjQYJao1U_yE3Ww4l1_k-t_DhrY
```

**Descripción:** Clave anónima de Supabase (para cliente)**Tipo:** Public (NEXT_PUBLIC_)**Origen:** Supabase Dashboard → Settings → API → anon key

---

```
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtndGV1dXpxaGdiaXplcnZzdmJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMDI0MTEsImV4cCI6MjA3NzY3ODQxMX0.VjreNWcNiy1HAKCSHjQYJao1U_yE3Ww4l1_k-t_DhrY
```

**Descripción:** Clave de servicio de Supabase (para servidor)**Tipo:** Secret (privada)**Origen:** Supabase Dashboard → Settings → API → service_role key**⚠️ IMPORTANTE:** Nunca compartas esta clave públicamente

---

### 2. DeepSeek Configuration (IA)

```
DEEPSEEK_API_KEY=sk-ee1fd6c320234a9fb93a9980d47e9ace
```

**Descripción:** Clave de API de DeepSeek para generación de informes y chat IA**Tipo:** Secret (privada)**Origen:** DeepSeek Platform → API Keys**⚠️ IMPORTANTE:** Nunca compartas esta clave públicamente

---

### 3. PayPal Configuration

```
PAYPAL_API_USERNAME=aimant.digital.ec_api1.gmail.com
```

**Descripción:** Nombre de usuario de API de PayPal**Tipo:** Secret (privada)**Origen:** PayPal Merchant Account → API Signature**⚠️ IMPORTANTE:** Nunca compartas esta clave públicamente

---

```
PAYPAL_API_PASSWORD=XKG8WKPMWWZ7CRTT
```

**Descripción:** Contraseña de API de PayPal**Tipo:** Secret (privada)**Origen:** PayPal Merchant Account → API Signature**⚠️ IMPORTANTE:** Nunca compartas esta clave públicamente

---

```
PAYPAL_API_SIGNATURE=Ay.4BQR-smjdd4jqY6t77775i5BZAHZF6ICF3GYPapfL-N7xcOgfLmF5
```

**Descripción:** Firma de API de PayPal**Tipo:** Secret (privada)**Origen:** PayPal Merchant Account → API Signature**⚠️ IMPORTANTE:** Nunca compartas esta clave públicamente

---

```
PAYPAL_MODE=sandbox
```

**Descripción:** Modo de PayPal (sandbox para pruebas, live para producción)**Tipo:** Public**Valores válidos:** `sandbox` o `live`**Nota:** Cambiar a `live` cuando estés listo para producción

---

### 4. Application Configuration

```
NEXT_PUBLIC_APP_URL=https://verifica-sst-cloud.vercel.app
```

**Descripción:** URL de la aplicación (usada para redirecciones)**Tipo:** Public (NEXT_PUBLIC_)**Nota:** Reemplaza `verifica-sst-cloud` con el nombre de tu proyecto en Vercel**Para dominio personalizado:** `https://tu-dominio.com`

---

```
NODE_ENV=production
```

**Descripción:** Ambiente de ejecución**Tipo:** Public**Valor:** `production` (Vercel lo establece automáticamente)

---

## 📝 Tabla Resumen

| Variable | Tipo | Origen | Descripción |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Supabase | URL del proyecto |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Supabase | Clave anónima |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret | Supabase | Clave de servicio |
| `DEEPSEEK_API_KEY` | Secret | DeepSeek | Clave de API |
| `PAYPAL_API_USERNAME` | Secret | PayPal | Usuario de API |
| `PAYPAL_API_PASSWORD` | Secret | PayPal | Contraseña de API |
| `PAYPAL_API_SIGNATURE` | Secret | PayPal | Firma de API |
| `PAYPAL_MODE` | Public | Manual | Modo (sandbox/live) |
| `NEXT_PUBLIC_APP_URL` | Public | Manual | URL de la app |
| `NODE_ENV` | Public | Auto | Ambiente |

---

## 🔧 Cómo Configurar en Vercel

### Paso 1: Acceder a Vercel

1. Abre [https://vercel.com](https://vercel.com)

1. Inicia sesión con tu cuenta

1. Selecciona tu proyecto `verifica-sst-cloud`

### Paso 2: Ir a Settings

1. Haz clic en **Settings** (en la barra superior)

1. En el menú izquierdo, haz clic en **Environment Variables**

### Paso 3: Agregar Variables

1. Haz clic en **Add New**

1. Ingresa el nombre de la variable (ej: `NEXT_PUBLIC_SUPABASE_URL`)

1. Ingresa el valor

1. Selecciona los ambientes: **Production**, **Preview**, **Development**

1. Haz clic en **Save**

### Paso 4: Repetir para Todas las Variables

Repite el paso 3 para cada variable en la lista

### Paso 5: Redeploy

1. Ve a **Deployments**

1. Haz clic en el deployment más reciente

1. Haz clic en **Redeploy** para aplicar las nuevas variables

---

## ✅ Checklist de Configuración

- [x] `NEXT_PUBLIC_SUPABASE_URL` - Agregada

- [x] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Agregada

- [x] `SUPABASE_SERVICE_ROLE_KEY` - Agregada

- [ ] `DEEPSEEK_API_KEY` - Agregada

- [ ] `PAYPAL_API_USERNAME` - Agregada

- [ ] `PAYPAL_API_PASSWORD` - Agregada

- [ ] `PAYPAL_API_SIGNATURE` - Agregada

- [ ] `PAYPAL_MODE` - Agregada (sandbox)

- [ ] `NEXT_PUBLIC_APP_URL` - Agregada

- [ ] Todas las variables están en los ambientes correctos

- [ ] Redeploy completado

---

## 🔐 Seguridad

### Variables Public (NEXT_PUBLIC_)

- Se envían al navegador

- Visibles en el código fuente

- Solo para datos no sensibles

- Ejemplos: URLs, claves públicas

### Variables Secret (sin NEXT_PUBLIC_)

- No se envían al navegador

- Solo disponibles en el servidor

- Para datos sensibles

- Ejemplos: claves de API, contraseñas

### Mejores Prácticas

1. ✅ Nunca commits variables secretas a Git

1. ✅ Usa `.env.local` para desarrollo local

1. ✅ Usa Vercel Environment Variables para producción

1. ✅ Rota las claves regularmente

1. ✅ Usa diferentes claves para sandbox y live

---

## 🚨 Troubleshooting

### Error: "Cannot find module"

- Verifica que todas las variables estén configuradas

- Redeploy el proyecto

- Revisa los logs en Vercel

### Error: "Supabase connection failed"

- Verifica que las URLs y claves sean correctas

- Asegúrate de que Supabase esté accesible

- Revisa que RLS no esté bloqueando el acceso

### Error: "PayPal API error"

- Verifica que las credenciales sean correctas

- Asegúrate de estar usando el modo correcto (sandbox/live)

- Revisa que PayPal no esté en mantenimiento

### Error: "DeepSeek API error"

- Verifica que la clave de API sea válida

- Asegúrate de tener créditos disponibles

- Revisa los logs de DeepSeek

---

## 📚 Referencias

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

- [Supabase API Keys](https://supabase.com/docs/guides/api)

- [DeepSeek API](https://platform.deepseek.com/api)

- [PayPal API Signature](https://developer.paypal.com/docs/nvp-soap-api/signature-certificates/)

---

## 💡 Notas Importantes

1. **Cambios en Variables:** Después de cambiar variables, Vercel redesplegará automáticamente

1. **Desarrollo Local:** Copia `.env.example` a `.env.local` para desarrollo

1. **Producción:** Usa diferentes credenciales (especialmente PayPal)

1. **Monitoreo:** Revisa los logs en Vercel si hay problemas

1. **Backup:** Guarda tus credenciales en un lugar seguro

---

¿Necesitas ayuda con alguna variable específica?

