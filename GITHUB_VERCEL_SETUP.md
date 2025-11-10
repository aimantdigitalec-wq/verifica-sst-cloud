# Guía Completa: GitHub + Vercel - Verifica SST Cloud

## 📋 Tabla de Contenidos

1. [Crear Cuenta en GitHub](#crear-cuenta-en-github)
2. [Crear Repositorio en GitHub](#crear-repositorio-en-github)
3. [Subir Código a GitHub](#subir-código-a-github)
4. [Crear Cuenta en Vercel](#crear-cuenta-en-vercel)
5. [Conectar GitHub con Vercel](#conectar-github-con-vercel)
6. [Configurar Variables de Entorno](#configurar-variables-de-entorno)
7. [Deploy](#deploy)
8. [Troubleshooting](#troubleshooting)

---

## 1. Crear Cuenta en GitHub

### Paso 1.1: Ir a GitHub
1. Abre tu navegador
2. Ve a https://github.com
3. Haz clic en **Sign up** (esquina superior derecha)

### Paso 1.2: Completar el Registro
1. Ingresa tu **email**
2. Crea una **contraseña** fuerte
3. Elige un **nombre de usuario** (ej: `tu-nombre-usuario`)
4. Selecciona si quieres recibir actualizaciones (opcional)
5. Haz clic en **Create account**

### Paso 1.3: Verificar Email
1. GitHub te enviará un email de verificación
2. Abre tu email y haz clic en el enlace de verificación
3. Completa el CAPTCHA si es necesario
4. ¡Tu cuenta está lista!

---

## 2. Crear Repositorio en GitHub

### Paso 2.1: Ir a Crear Repositorio
1. Inicia sesión en GitHub
2. Haz clic en el **+** (esquina superior derecha)
3. Selecciona **New repository**

### Paso 2.2: Configurar Repositorio
Completa los siguientes campos:

**Repository name:**
```
verifica-sst-cloud
```

**Description:**
```
Plataforma SaaS para cumplimiento de SST en Ecuador
```

**Visibility:**
- Selecciona **Public** (para que Vercel pueda acceder)

**Initialize this repository with:**
- ☐ NO marques "Add a README file"
- ☐ NO marques "Add .gitignore"
- ☐ NO marques "Choose a license"

### Paso 2.3: Crear Repositorio
Haz clic en **Create repository**

### Paso 2.4: Copiar la URL
Verás una pantalla con instrucciones. Copia la URL que aparece:
```
https://github.com/TU_USUARIO/verifica-sst-cloud.git
```

Reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub.

---

## 3. Subir Código a GitHub

### Paso 3.1: Abrir Terminal
1. Abre una terminal en tu computadora
2. Navega a la carpeta del proyecto:
```bash
cd /home/ubuntu/verifica-sst-cloud
```

### Paso 3.2: Configurar Git (si es la primera vez)
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@example.com"
```

### Paso 3.3: Inicializar Repositorio (si no está inicializado)
```bash
git init
```

### Paso 3.4: Agregar Archivos
```bash
git add .
```

### Paso 3.5: Crear Commit Inicial
```bash
git commit -m "Initial commit: Verifica SST Cloud SaaS"
```

### Paso 3.6: Cambiar Rama a main
```bash
git branch -M main
```

### Paso 3.7: Agregar Remoto
Reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub:
```bash
git remote add origin https://github.com/TU_USUARIO/verifica-sst-cloud.git
```

### Paso 3.8: Subir Código
```bash
git push -u origin main
```

Te pedirá autenticación. Tienes dos opciones:

#### Opción A: Usar Token de Acceso Personal (Recomendado)

1. En GitHub, ve a **Settings → Developer settings → Personal access tokens**
2. Haz clic en **Generate new token**
3. Dale un nombre: `vercel-deployment`
4. Selecciona estos permisos:
   - ☑ repo (acceso completo a repositorios)
   - ☑ workflow
5. Haz clic en **Generate token**
6. **Copia el token** (no lo perderás de vista)
7. En la terminal, cuando te pida contraseña, pega el token

#### Opción B: Usar SSH (Avanzado)

Si prefieres usar SSH, sigue esta guía: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

### Paso 3.9: Verificar que se Subió
1. Ve a tu repositorio en GitHub: `https://github.com/TU_USUARIO/verifica-sst-cloud`
2. Deberías ver todos tus archivos

---

## 4. Crear Cuenta en Vercel

### Paso 4.1: Ir a Vercel
1. Abre tu navegador
2. Ve a https://vercel.com
3. Haz clic en **Sign Up** (esquina superior derecha)

### Paso 4.2: Seleccionar Método de Registro
Haz clic en **Continue with GitHub**

### Paso 4.3: Autorizar Vercel
1. GitHub te pedirá que autorices a Vercel
2. Haz clic en **Authorize Vercel**
3. Se abrirá Vercel y estarás registrado

---

## 5. Conectar GitHub con Vercel

### Paso 5.1: Importar Proyecto
1. En el dashboard de Vercel, haz clic en **Add New**
2. Selecciona **Project**

### Paso 5.2: Seleccionar Repositorio
1. Vercel te mostrará una lista de tus repositorios de GitHub
2. Busca **verifica-sst-cloud**
3. Haz clic en **Import**

### Paso 5.3: Configurar Proyecto
1. **Project Name:** `verifica-sst-cloud` (o el que prefieras)
2. **Framework Preset:** Vercel debería detectar **Next.js** automáticamente
3. **Root Directory:** `.` (punto - raíz del proyecto)
4. Haz clic en **Continue**

### Paso 5.4: Configurar Build Settings
Vercel debería detectar automáticamente:
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

Si no está correcto, corrígelo manualmente.

---

## 6. Configurar Variables de Entorno

### Paso 6.1: Ir a Environment Variables
1. En la pantalla de configuración, verás una sección **Environment Variables**
2. O si ya estás en el proyecto, ve a **Settings → Environment Variables**

### Paso 6.2: Agregar Variables
Para cada variable, haz clic en **Add New** y completa:

#### Variable 1: Supabase URL
- **Name:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** `https://kgteuuzqhgbizervsvbl.supabase.co`
- **Environments:** Selecciona todos (Production, Preview, Development)
- Haz clic en **Save**

#### Variable 2: Supabase Anon Key
- **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtndGV1dXpxaGdiaXplcnZzdmJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMDI0MTEsImV4cCI6MjA3NzY3ODQxMX0.VjreNWcNiy1HAKCSHjQYJao1U_yE3Ww4l1_k-t_DhrY`
- **Environments:** Selecciona todos
- Haz clic en **Save**

#### Variable 3: Supabase Service Role Key
- **Name:** `SUPABASE_SERVICE_ROLE_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtndGV1dXpxaGdiaXplcnZzdmJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMDI0MTEsImV4cCI6MjA3NzY3ODQxMX0.VjreNWcNiy1HAKCSHjQYJao1U_yE3Ww4l1_k-t_DhrY`
- **Environments:** Selecciona todos
- Haz clic en **Save**

#### Variable 4: DeepSeek API Key
- **Name:** `DEEPSEEK_API_KEY`
- **Value:** `sk-ee1fd6c320234a9fb93a9980d47e9ace`
- **Environments:** Selecciona todos
- Haz clic en **Save**

#### Variable 5: PayPal Username
- **Name:** `PAYPAL_API_USERNAME`
- **Value:** `aimant.digital.ec_api1.gmail.com`
- **Environments:** Selecciona todos
- Haz clic en **Save**

#### Variable 6: PayPal Password
- **Name:** `PAYPAL_API_PASSWORD`
- **Value:** `XKG8WKPMWWZ7CRTT`
- **Environments:** Selecciona todos
- Haz clic en **Save**

#### Variable 7: PayPal Signature
- **Name:** `PAYPAL_API_SIGNATURE`
- **Value:** `Ay.4BQR-smjdd4jqY6t77775i5BZAHZF6ICF3GYPapfL-N7xcOgfLmF5`
- **Environments:** Selecciona todos
- Haz clic en **Save**

#### Variable 8: PayPal Mode
- **Name:** `PAYPAL_MODE`
- **Value:** `sandbox`
- **Environments:** Selecciona todos
- Haz clic en **Save**

#### Variable 9: App URL
- **Name:** `NEXT_PUBLIC_APP_URL`
- **Value:** `https://verifica-sst-cloud.vercel.app`
- **Environments:** Selecciona todos
- Haz clic en **Save**

### Paso 6.3: Verificar Variables
Deberías ver 9 variables en total en la lista.

---

## 7. Deploy

### Opción A: Deploy Automático (Recomendado)

Si configuraste las variables antes de hacer clic en Deploy:

1. Haz clic en **Deploy**
2. Vercel comenzará a compilar tu proyecto
3. Espera a que se complete (normalmente 2-3 minutos)
4. Verás un mensaje "Congratulations! Your project has been successfully deployed"

### Opción B: Redeploy (Si ya hiciste Deploy)

Si ya hiciste Deploy sin variables:

1. Ve a **Deployments**
2. Haz clic en el deployment más reciente
3. Haz clic en **Redeploy**
4. Selecciona **Use existing Environment Variables**
5. Haz clic en **Redeploy**

---

## 8. Verificar el Deploy

### Paso 8.1: Obtener URL
1. Después del deploy, verás tu URL en Vercel
2. Normalmente es: `https://verifica-sst-cloud.vercel.app`
3. Haz clic en ella para abrir tu sitio

### Paso 8.2: Probar la Aplicación
1. Deberías ver la landing page
2. Intenta ir a `/login` para probar la autenticación
3. Intenta registrarte para verificar que Supabase funciona

### Paso 8.3: Revisar Logs
Si hay algún error:
1. Ve a **Deployments**
2. Haz clic en el deployment
3. Ve a **Logs** para ver los errores

---

## 9. Troubleshooting

### Error: "Cannot find module"
**Solución:**
1. Verifica que `package.json` tenga todas las dependencias
2. En Vercel, ve a **Settings → Build & Development Settings**
3. Haz clic en **Redeploy**

### Error: "Build failed"
**Solución:**
1. Revisa los logs en Vercel
2. Verifica que todas las variables de entorno estén configuradas
3. Asegúrate de que el código no tenga errores de TypeScript

### Error: "Supabase connection failed"
**Solución:**
1. Verifica que las URLs y claves sean correctas
2. Asegúrate de que Supabase esté accesible
3. Revisa que RLS no esté bloqueando el acceso

### Error: "GitHub authentication failed"
**Solución:**
1. Verifica que el token de acceso personal sea válido
2. Asegúrate de que el token tenga permisos de `repo`
3. Intenta generar un nuevo token

### Error: "Vercel can't access GitHub"
**Solución:**
1. Ve a GitHub → Settings → Applications → Authorized OAuth Apps
2. Busca Vercel
3. Haz clic en **Grant** para autorizar nuevamente

---

## 📝 Checklist Final

- [ ] Cuenta de GitHub creada
- [ ] Repositorio `verifica-sst-cloud` creado
- [ ] Código subido a GitHub
- [ ] Cuenta de Vercel creada
- [ ] Repositorio importado en Vercel
- [ ] 9 variables de entorno configuradas
- [ ] Deploy completado
- [ ] Sitio accesible en Vercel
- [ ] Autenticación funcionando
- [ ] Base de datos conectada

---

## 🎉 ¡Listo!

Tu aplicación está desplegada en Vercel y conectada a GitHub. Ahora:

1. **Cada vez que hagas cambios:** 
   ```bash
   git add .
   git commit -m "Descripción de cambios"
   git push origin main
   ```

2. **Vercel desplegará automáticamente** los cambios

3. **Puedes ver el progreso** en Vercel → Deployments

---

## 📚 Referencias

- [GitHub Documentation](https://docs.github.com)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)

---

## 💡 Tips Útiles

1. **Usa branches:** Crea ramas para nuevas características
   ```bash
   git checkout -b feature/nueva-caracteristica
   git push origin feature/nueva-caracteristica
   ```

2. **Pull Requests:** Haz PR antes de mergear a main
   - Permite revisar cambios
   - Vercel crea una preview automáticamente

3. **Monitoreo:** Revisa los logs en Vercel regularmente

4. **Backups:** Mantén backups de tus credenciales en un lugar seguro

---

¿Necesitas ayuda con algún paso específico?
