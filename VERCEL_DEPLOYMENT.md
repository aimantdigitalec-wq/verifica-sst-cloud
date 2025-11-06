# Guía de Despliegue en Vercel - Verifica SST Cloud

## Paso 1: Crear Repositorio en GitHub

### 1.1 Crear cuenta en GitHub (si no tienes)
- Ir a https://github.com
- Hacer clic en "Sign up"
- Completar el registro

### 1.2 Crear nuevo repositorio
1. Ir a https://github.com/new
2. Nombre del repositorio: `verifica-sst-cloud`
3. Descripción: `Plataforma SaaS para cumplimiento de SST en Ecuador`
4. Seleccionar **Public** (para que Vercel pueda acceder)
5. Hacer clic en **Create repository**

### 1.3 Subir código a GitHub

En tu terminal, ejecuta:

```bash
cd /home/ubuntu/verifica-sst-cloud

# Cambiar rama a main
git branch -M main

# Agregar remoto de GitHub
git remote add origin https://github.com/TU_USUARIO/verifica-sst-cloud.git

# Subir código
git push -u origin main
```

Reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub.

---

## Paso 2: Conectar a Vercel

### 2.1 Ir a Vercel
1. Abre https://vercel.com
2. Haz clic en **Sign Up** (o inicia sesión si ya tienes cuenta)
3. Selecciona **GitHub** como método de autenticación
4. Autoriza Vercel para acceder a tu cuenta de GitHub

### 2.2 Crear nuevo proyecto
1. En el dashboard de Vercel, haz clic en **Add New...**
2. Selecciona **Project**
3. Busca `verifica-sst-cloud` en la lista de repositorios
4. Haz clic en **Import**

### 2.3 Configurar proyecto
1. **Project Name:** `verifica-sst-cloud` (o el que prefieras)
2. **Framework Preset:** Vercel debería detectar **Next.js** automáticamente
3. **Root Directory:** `.` (raíz del proyecto)
4. Haz clic en **Continue**

---

## Paso 3: Configurar Variables de Entorno

En la pantalla de configuración de variables de entorno, agrega las siguientes:

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

**Nota:** Reemplaza `verifica-sst-cloud` con el nombre de tu proyecto en Vercel si es diferente.

---

## Paso 4: Deploy

1. Haz clic en **Deploy**
2. Vercel comenzará a compilar y desplegar tu proyecto
3. Espera a que se complete (normalmente toma 2-3 minutos)
4. Verás un mensaje "Congratulations! Your project has been successfully deployed"

---

## Paso 5: Configurar Dominio Personalizado (Opcional)

### 5.1 Agregar dominio en Vercel
1. En el proyecto de Vercel, ve a **Settings**
2. Haz clic en **Domains**
3. Ingresa tu dominio personalizado (ej: `verificasst.com`)
4. Haz clic en **Add**

### 5.2 Configurar DNS
Vercel te mostrará los registros DNS que necesitas agregar. Sigue las instrucciones según tu proveedor de dominio.

---

## Paso 6: Actualizar URLs en Supabase

Ahora que tienes tu dominio en Vercel, actualiza las URLs de redirección en Supabase:

1. Ve a Supabase Dashboard
2. **Authentication → Providers → Email**
3. En **Redirect URLs**, agrega:
   - `https://tu-dominio.vercel.app/auth/callback`
   - `https://tu-dominio.vercel.app`

---

## Paso 7: Cambiar PayPal a Modo Live (Opcional)

Cuando estés listo para producción:

1. En Vercel, ve a **Settings → Environment Variables**
2. Edita `PAYPAL_MODE` y cambia de `sandbox` a `live`
3. Actualiza `PAYPAL_API_USERNAME`, `PAYPAL_API_PASSWORD` y `PAYPAL_API_SIGNATURE` con tus credenciales live de PayPal
4. Haz clic en **Save**
5. Vercel redesplegará automáticamente

---

## Verificación Final

1. Abre tu URL de Vercel: `https://verifica-sst-cloud.vercel.app`
2. Deberías ver la landing page
3. Intenta registrarte para verificar que todo funciona
4. Revisa los logs en Vercel si hay algún problema

---

## Monitoreo y Logs

### Ver logs en Vercel
1. En tu proyecto de Vercel, ve a **Deployments**
2. Haz clic en el deployment más reciente
3. Ve a **Logs** para ver los logs de construcción y ejecución

### Ver errores en tiempo real
En la sección **Functions** puedes ver los logs de las API routes.

---

## Actualizaciones Futuras

Cada vez que hagas push a la rama `main` en GitHub, Vercel desplegará automáticamente:

```bash
git add .
git commit -m "Descripción de cambios"
git push origin main
```

---

## Troubleshooting

### Error: "Build failed"
- Revisa los logs en Vercel
- Asegúrate de que todas las variables de entorno estén configuradas
- Verifica que el `package.json` tenga todos los scripts necesarios

### Error: "Cannot find module"
- Asegúrate de haber ejecutado `npm install` localmente
- Verifica que todas las dependencias estén en `package.json`

### Error: "Supabase connection failed"
- Verifica que las URLs y claves de Supabase sean correctas
- Asegúrate de que Supabase esté accesible desde Vercel

### Error: "PayPal API error"
- Verifica que las credenciales de PayPal sean correctas
- Asegúrate de estar usando el modo correcto (sandbox/live)

---

## Escalabilidad

### Vercel
- **Plan Free:** Suficiente para comenzar
- **Plan Pro:** $20/mes para mejor rendimiento y más funciones

### Supabase
- **Plan Free:** Hasta 500MB de almacenamiento
- **Plan Pro:** $25/mes para almacenamiento ilimitado

### DeepSeek
- Paga según uso de API

---

## Documentación de Referencia

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## Contacto de Soporte

Para soporte técnico: support@verificasst.com
