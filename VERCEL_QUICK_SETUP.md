# Guía Rápida: Conectar Vercel con GitHub

## ✅ Lo que ya está hecho

- ✅ Repositorio `verifica-sst-cloud` creado en GitHub
- ✅ Todo el código subido a GitHub
- ✅ Rama `main` configurada

## 🚀 Próximos Pasos (Solo 3 pasos)

### Paso 1: Crear Cuenta en Vercel

1. Abre https://vercel.com
2. Haz clic en **Sign Up**
3. Selecciona **Continue with GitHub**
4. Autoriza Vercel para acceder a tu GitHub

### Paso 2: Importar Proyecto

1. En el dashboard de Vercel, haz clic en **Add New**
2. Selecciona **Project**
3. Busca `verifica-sst-cloud` en la lista
4. Haz clic en **Import**

### Paso 3: Configurar Variables de Entorno

En la pantalla de configuración, ve a **Environment Variables** y agrega estas 9 variables:

#### 1. NEXT_PUBLIC_SUPABASE_URL
```
https://kgteuuzqhgbizervsvbl.supabase.co
```

#### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtndGV1dXpxaGdiaXplcnZzdmJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMDI0MTEsImV4cCI6MjA3NzY3ODQxMX0.VjreNWcNiy1HAKCSHjQYJao1U_yE3Ww4l1_k-t_DhrY
```

#### 3. SUPABASE_SERVICE_ROLE_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtndGV1dXpxaGdiaXplcnZzdmJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMDI0MTEsImV4cCI6MjA3NzY3ODQxMX0.VjreNWcNiy1HAKCSHjQYJao1U_yE3Ww4l1_k-t_DhrY
```

#### 4. DEEPSEEK_API_KEY
```
sk-ee1fd6c320234a9fb93a9980d47e9ace
```

#### 5. PAYPAL_API_USERNAME
```
aimant.digital.ec_api1.gmail.com
```

#### 6. PAYPAL_API_PASSWORD
```
XKG8WKPMWWZ7CRTT
```

#### 7. PAYPAL_API_SIGNATURE
```
Ay.4BQR-smjdd4jqY6t77775i5BZAHZF6ICF3GYPapfL-N7xcOgfLmF5
```

#### 8. PAYPAL_MODE
```
sandbox
```

#### 9. NEXT_PUBLIC_APP_URL
```
https://verifica-sst-cloud.vercel.app
```

### Paso 4: Deploy

1. Haz clic en **Deploy**
2. Espera 2-3 minutos
3. ¡Listo! Tu sitio estará en línea

---

## 📍 Tu Repositorio GitHub

https://github.com/aimantdigitalec-wq/verifica-sst-cloud

---

## 🎉 ¡Eso es todo!

Tu aplicación estará disponible en: `https://verifica-sst-cloud.vercel.app`

Cada vez que hagas cambios en GitHub, Vercel desplegará automáticamente.

---

## 📝 Comandos Útiles para Futuras Actualizaciones

```bash
# Hacer cambios
cd /home/ubuntu/verifica-sst-cloud
# ... edita archivos ...

# Subir a GitHub
git add .
git commit -m "Descripción de cambios"
git push origin main

# Vercel desplegará automáticamente
```

---

¿Necesitas ayuda con algún paso?
