# Documentación de API - Verifica SST Cloud

## Endpoints Disponibles

### Reportes

#### Generar Informe
**POST** `/api/reportes/generar`

Genera un informe automático basado en las verificaciones de la empresa.

**Request Body:**
```json
{
  "empresaId": "uuid-de-la-empresa"
}
```

**Response:**
```json
{
  "success": true,
  "informe": {
    "id": "uuid",
    "empresa_id": "uuid",
    "titulo": "Informe de Cumplimiento SST - 04/11/2024",
    "contenido": "Contenido del informe generado por IA...",
    "porcentaje_cumplimiento": 75,
    "fecha_generacion": "2024-11-04T10:30:00Z"
  },
  "porcentajesCumplimiento": {
    "general": 75,
    "cumple": 52,
    "noCumple": 10,
    "noAplica": 7
  }
}
```

**Errores:**
- `400`: empresaId es requerido
- `404`: Empresa no encontrada
- `500`: Error al generar el informe

---

### Chat - Asistente SST AI

#### Enviar Mensaje
**POST** `/api/chat/sst-ai`

Envía un mensaje al asistente SST AI y obtiene una respuesta basada en la normativa ecuatoriana.

**Request Body:**
```json
{
  "mensaje": "¿Cuáles son los requisitos para un comité paritario?",
  "usuarioId": "uuid-del-usuario"
}
```

**Response:**
```json
{
  "success": true,
  "respuesta": "Según el Acuerdo Ministerial 196 y el Decreto Ejecutivo 255, los requisitos para un comité paritario son..."
}
```

**Errores:**
- `400`: mensaje y usuarioId son requeridos
- `500`: Error en el procesamiento de la IA

---

### Suscripciones

#### Crear Suscripción
**POST** `/api/suscripciones/crear`

Inicia el proceso de suscripción y redirige a PayPal.

**Request Body:**
```json
{
  "empresaId": "uuid-de-la-empresa",
  "planId": "microempresa"
}
```

**Planes disponibles:**
- `microempresa`: $15/mes (1-10 trabajadores)
- `pequeña`: $35/mes (11-50 trabajadores)
- `mediana`: $75/mes (51-200 trabajadores)
- `grande`: $150/mes (200+ trabajadores)

**Response:**
```json
{
  "success": true,
  "checkoutUrl": "https://www.sandbox.paypal.com/checkoutnow?token=EC-XXXXXXXXXX"
}
```

**Errores:**
- `400`: empresaId y planId son requeridos
- `404`: Empresa no encontrada
- `500`: Error al crear la suscripción

---

## Autenticación

Todos los endpoints requieren autenticación con Supabase. El token debe incluirse en el header `Authorization`:

```
Authorization: Bearer <token-de-supabase>
```

---

## Tablas de Base de Datos

### empresas
```sql
- id (UUID)
- ruc (VARCHAR)
- razon_social (VARCHAR)
- actividad_economica (VARCHAR)
- codigo_ciiu (VARCHAR)
- nivel_riesgo (VARCHAR)
- numero_trabajadores (INTEGER)
- plan_suscripcion (VARCHAR)
- estado_suscripcion (VARCHAR)
```

### usuarios
```sql
- id (UUID)
- email (VARCHAR)
- nombre (VARCHAR)
- apellido (VARCHAR)
- role (VARCHAR)
- empresa_id (UUID)
- activo (BOOLEAN)
```

### verificaciones
```sql
- id (UUID)
- empresa_id (UUID)
- numero (INTEGER)
- pregunta (TEXT)
- categoria (VARCHAR)
- referencia_normativa (TEXT)
- estado (VARCHAR)
- observaciones (TEXT)
```

### evidencias
```sql
- id (UUID)
- verificacion_id (UUID)
- nombre_archivo (VARCHAR)
- tipo_archivo (VARCHAR)
- url_archivo (TEXT)
- descripcion (TEXT)
- cargado_por_id (UUID)
```

### informes
```sql
- id (UUID)
- empresa_id (UUID)
- titulo (VARCHAR)
- contenido (TEXT)
- porcentaje_cumplimiento (INTEGER)
- fecha_generacion (TIMESTAMP)
```

### mensajes_chat
```sql
- id (UUID)
- usuario_id (UUID)
- contenido (TEXT)
- es_usuario (BOOLEAN)
- creado_en (TIMESTAMP)
```

---

## Ejemplos de Uso

### Generar Informe con cURL
```bash
curl -X POST http://localhost:3001/api/reportes/generar \
  -H "Content-Type: application/json" \
  -d '{
    "empresaId": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

### Chat con Asistente con cURL
```bash
curl -X POST http://localhost:3001/api/chat/sst-ai \
  -H "Content-Type: application/json" \
  -d '{
    "mensaje": "¿Qué es un delegado de SST?",
    "usuarioId": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

### Crear Suscripción con cURL
```bash
curl -X POST http://localhost:3001/api/suscripciones/crear \
  -H "Content-Type: application/json" \
  -d '{
    "empresaId": "550e8400-e29b-41d4-a716-446655440000",
    "planId": "mediana"
  }'
```

---

## Códigos de Estado HTTP

- `200`: Éxito
- `400`: Solicitud inválida
- `401`: No autenticado
- `403`: No autorizado
- `404`: Recurso no encontrado
- `500`: Error interno del servidor

---

## Rate Limiting

Actualmente no hay rate limiting implementado. Se recomienda implementar en producción.

---

## Versionado

La API está en versión `v1`. Los cambios futuros se indicarán en el path: `/api/v2/...`

---

## Soporte

Para soporte técnico, contactar a: support@verificasst.com
