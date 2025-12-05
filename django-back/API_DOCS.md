# API Endpoints - Sistema Electoral UNSA

## Base URL
```
http://127.0.0.1:8000/api
```

## Autenticación

### Login
```http
POST /api/auth/login/
Content-Type: application/json

{
  "email": "jajra@unsa.edu.pe",
  "password": "unsa2025"
}
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Login exitoso",
  "user": {
    "id": "uuid",
    "email": "jajra@unsa.edu.pe",
    "username": "jajra",
    "first_name": "Juan",
    "last_name": "Administrador",
    "es_postulante": false,
    "es_admin": true
  },
  "tokens": {
    "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
  }
}
```

### Logout
```http
POST /api/auth/logout/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### Registro
```http
POST /api/auth/registro/
Content-Type: application/json

{
  "username": "nuevo_usuario",
  "email": "nuevo@unsa.edu.pe",
  "password": "password123",
  "password_confirm": "password123",
  "first_name": "Nombre",
  "last_name": "Apellido",
  "es_postulante": true
}
```

### Perfil del Usuario
```http
GET /api/auth/perfil/
Authorization: Bearer {access_token}
```

### Refrescar Token
```http
POST /api/auth/token/refresh/
Content-Type: application/json

{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

## Listas Electorales

### Listar todas las listas
```http
GET /api/listas/
```

**Parámetros opcionales:**
- `?tipo=Rectorado` - Filtrar por tipo
- `?anio=2025` - Filtrar por año
- `?search=renovacion` - Buscar por nombre/descripción
- `?page=1` - Paginación

**Respuesta:**
```json
{
  "count": 3,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": "uuid",
      "nombre": "Renovación Universitaria",
      "tipo": "Rectorado",
      "anio": "2025",
      "subtitulo": "Elecciones de Representantes...",
      "descripcion": "Somos la lista...",
      "facultad": null,
      "logo": null,
      "fecha_creacion": "2024-11-24T...",
      "fecha_actualizacion": "2024-11-24T...",
      "activa": true,
      "integrantes_count": 2,
      "documentos_count": 2
    }
  ]
}
```

### Detalle de una lista
```http
GET /api/listas/{id}/
```

**Respuesta:**
```json
{
  "id": "uuid",
  "nombre": "Renovación Universitaria",
  "tipo": "Rectorado",
  "anio": "2025",
  "subtitulo": "Elecciones de Representantes...",
  "descripcion": "Somos la lista...",
  "facultad": null,
  "logo": null,
  "fecha_creacion": "2024-11-24T...",
  "fecha_actualizacion": "2024-11-24T...",
  "activa": true,
  "integrantes": [
    {
      "id": "uuid",
      "nombre": "Juan Carlos Quinto",
      "cargo": "Candidato a Asamblea",
      "anio": "2025",
      "foto": null,
      "cv_url": null,
      "orden": 1
    }
  ],
  "documentos": [
    {
      "id": "uuid",
      "titulo": "Plan de Trabajo 2025 - 2026",
      "descripcion": "Documento PDF detallando...",
      "tipo": "plan_trabajo",
      "archivo": null,
      "url_simulada": "#",
      "fecha_subida": "2024-11-24T...",
      "tamaño_archivo": "3.2 MB"
    }
  ],
  "usuario_creador_email": "renovacion@unsa.edu.pe"
}
```

### Crear lista electoral
```http
POST /api/listas/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "nombre": "Nueva Lista",
  "tipo": "Rectorado",
  "anio": "2025",
  "subtitulo": "Subtítulo de la lista",
  "descripcion": "Descripción completa...",
  "facultad": "Ingeniería",
  "integrantes": [
    {
      "nombre": "Juan Pérez",
      "cargo": "Candidato",
      "anio": "2025",
      "orden": 1
    }
  ],
  "documentos": [
    {
      "titulo": "Plan de Trabajo",
      "descripcion": "Nuestro plan...",
      "tipo": "plan_trabajo",
      "url_simulada": "#"
    }
  ]
}
```

### Actualizar lista
```http
PUT /api/listas/{id}/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "nombre": "Lista Actualizada",
  "tipo": "Rectorado",
  "anio": "2025",
  "descripcion": "Nueva descripción..."
}
```

### Actualización parcial
```http
PATCH /api/listas/{id}/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "descripcion": "Solo actualizar descripción"
}
```

### Eliminar lista
```http
DELETE /api/listas/{id}/
Authorization: Bearer {access_token}
```

### Integrantes de una lista
```http
GET /api/listas/{id}/integrantes/
```

### Documentos de una lista
```http
GET /api/listas/{id}/documentos/
```

### Tipos de elección disponibles
```http
GET /api/listas/tipos/
```

**Respuesta:**
```json
{
  "success": true,
  "tipos": [
    {"value": "Rectorado", "label": "Rectorado"},
    {"value": "Decanato", "label": "Decanato"},
    {"value": "Asamblea", "label": "Asamblea"},
    {"value": "Consejo", "label": "Consejo"}
  ]
}
```

### Años disponibles
```http
GET /api/listas/anios/
```

## Integrantes

### Listar integrantes
```http
GET /api/integrantes/
```

### Detalle de integrante
```http
GET /api/integrantes/{id}/
```

### Crear integrante
```http
POST /api/integrantes/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "lista_electoral": "uuid-de-lista",
  "nombre": "María García",
  "cargo": "Candidata a Consejo",
  "anio": "2025",
  "orden": 2
}
```

### Actualizar integrante
```http
PUT /api/integrantes/{id}/
Authorization: Bearer {access_token}
```

### Eliminar integrante
```http
DELETE /api/integrantes/{id}/
Authorization: Bearer {access_token}
```

## Documentos

### Listar documentos
```http
GET /api/documentos/
```

### Detalle de documento
```http
GET /api/documentos/{id}/
```

### Descargar documento (simulado)
```http
GET /api/documentos/{id}/descargar/
```

### Subir documento (simulado)
```http
POST /api/documentos/subir/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "lista_electoral": "uuid-de-lista",
  "titulo": "Nuevo Documento",
  "descripcion": "Descripción del documento",
  "tipo": "plan_trabajo"
}
```

### Eliminar documento
```http
DELETE /api/documentos/{id}/
Authorization: Bearer {access_token}
```

## Procesos Electorales

### Listar procesos
```http
GET /api/procesos/
```

### Proceso actual
```http
GET /api/procesos/actual/
```

### Crear proceso
```http
POST /api/procesos/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "nombre": "Proceso Electoral 2026",
  "tipo": "Rectorado",
  "anio": "2026",
  "etapa_actual": "convocatoria",
  "fecha_inicio": "2026-01-01",
  "fecha_fin": "2026-12-31",
  "descripcion": "Proceso electoral...",
  "activo": true
}
```

## Estadísticas

### Estadísticas generales
```http
GET /api/estadisticas/
```

**Respuesta:**
```json
{
  "success": true,
  "estadisticas": {
    "total_listas": 3,
    "total_usuarios": 2,
    "total_documentos": 4,
    "listas_por_tipo": {
      "Rectorado": 1,
      "Decanato": 1,
      "Asamblea": 1,
      "Consejo": 0
    }
  }
}
```

## Códigos de Estado HTTP

- `200 OK` - Solicitud exitosa
- `201 Created` - Recurso creado exitosamente
- `204 No Content` - Eliminación exitosa
- `400 Bad Request` - Datos inválidos
- `401 Unauthorized` - No autenticado
- `403 Forbidden` - No autorizado
- `404 Not Found` - Recurso no encontrado
- `500 Internal Server Error` - Error del servidor

## Ejemplos con cURL

### Login
```bash
curl -X POST http://127.0.0.1:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"jajra@unsa.edu.pe","password":"unsa2025"}'
```

### Obtener listas con filtros
```bash
curl http://127.0.0.1:8000/api/listas/?tipo=Rectorado&anio=2025
```

### Crear lista (con autenticación)
```bash
curl -X POST http://127.0.0.1:8000/api/listas/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Nueva Lista","tipo":"Rectorado","anio":"2025","descripcion":"Descripción"}'
```

## Ejemplos con JavaScript/Fetch

### Login
```javascript
const login = async () => {
  const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'jajra@unsa.edu.pe',
      password: 'unsa2025'
    })
  });
  
  const data = await response.json();
  localStorage.setItem('access_token', data.tokens.access);
  return data;
};
```

### Obtener listas
```javascript
const getListas = async () => {
  const response = await fetch('http://127.0.0.1:8000/api/listas/');
  const data = await response.json();
  return data.results;
};
```

### Crear lista (autenticado)
```javascript
const createLista = async (listaData) => {
  const token = localStorage.getItem('access_token');
  
  const response = await fetch('http://127.0.0.1:8000/api/listas/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(listaData)
  });
  
  return await response.json();
};
```
