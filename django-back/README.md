# Backend Sistema Electoral UNSA - Django REST API

## 📋 Descripción

Backend completo y profesional desarrollado en Django REST Framework para el sistema electoral universitario de la UNSA. Este backend replica todas las funcionalidades del frontend React/TypeScript, proporcionando una API RESTful robusta y escalable.

## 🚀 Características Principales

### Autenticación y Usuarios
- ✅ Sistema de autenticación con JWT (JSON Web Tokens)
- ✅ Login con email y contraseña
- ✅ Registro de usuarios
- ✅ Modelo de usuario personalizado con roles (Postulante, Administrador)
- ✅ Gestión de perfiles

### Listas Electorales
- ✅ CRUD completo de listas electorales
- ✅ Filtrado avanzado por nombre, tipo y año
- ✅ Búsqueda en tiempo real
- ✅ Paginación automática
- ✅ Relaciones con integrantes y documentos

### Integrantes
- ✅ Gestión de integrantes por lista
- ✅ Información completa (nombre, cargo, año, foto, CV)
- ✅ Ordenamiento personalizable

### Documentos
- ✅ Subida de documentos simulada
- ✅ Descarga de documentos simulada
- ✅ Tipos de documentos (Plan de Trabajo, Plan de Gobierno, etc.)
- ✅ Metadatos completos

### Procesos Electorales
- ✅ Gestión de procesos electorales
- ✅ Etapas del proceso (Convocatoria, Inscripción, Campaña, etc.)
- ✅ Estado activo/inactivo

### Extras
- ✅ Panel de administración Django completo
- ✅ Estadísticas generales
- ✅ CORS configurado para frontend
- ✅ Base de datos SQLite preconfigurada
- ✅ Datos iniciales de ejemplo

## 🛠️ Tecnologías Utilizadas

- **Django 5.2.8** - Framework web
- **Django REST Framework 3.16.1** - API RESTful
- **djangorestframework-simplejwt 5.5.1** - Autenticación JWT
- **django-cors-headers 4.9.0** - Manejo de CORS
- **Pillow 12.0.0** - Procesamiento de imágenes
- **SQLite** - Base de datos

## 📦 Instalación

### Prerrequisitos
- Python 3.10 o superior
- pip (gestor de paquetes de Python)

### Pasos de Instalación

1. **Clonar el repositorio** (si aplica)
```bash
cd django-back
```

2. **Crear y activar entorno virtual**
```bash
# Windows
python -m venv venv
.\venv\Scripts\Activate.ps1

# Linux/Mac
python -m venv venv
source venv/bin/activate
```

3. **Instalar dependencias**
```bash
pip install -r requirements.txt
```

4. **Ejecutar migraciones**
```bash
python manage.py makemigrations
python manage.py migrate
```

5. **Poblar base de datos con datos iniciales**
```bash
python manage.py poblar_datos
```

6. **Crear superusuario adicional (opcional)**
```bash
python manage.py createsuperuser
```

7. **Ejecutar servidor de desarrollo**
```bash
python manage.py runserver
```

El servidor estará disponible en: `http://127.0.0.1:8000/`

## 📚 Endpoints de la API

### Autenticación

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/api/auth/login/` | Login de usuario | No |
| POST | `/api/auth/logout/` | Logout de usuario | Sí |
| POST | `/api/auth/registro/` | Registro de nuevo usuario | No |
| GET | `/api/auth/perfil/` | Obtener perfil del usuario actual | Sí |
| POST | `/api/auth/token/refresh/` | Refrescar token JWT | No |

### Listas Electorales

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/api/listas/` | Listar todas las listas | No |
| GET | `/api/listas/{id}/` | Detalle de lista específica | No |
| POST | `/api/listas/` | Crear nueva lista | Sí |
| PUT | `/api/listas/{id}/` | Actualizar lista completa | Sí |
| PATCH | `/api/listas/{id}/` | Actualizar lista parcial | Sí |
| DELETE | `/api/listas/{id}/` | Eliminar lista | Sí |
| GET | `/api/listas/{id}/integrantes/` | Integrantes de una lista | No |
| GET | `/api/listas/{id}/documentos/` | Documentos de una lista | No |
| GET | `/api/listas/tipos/` | Tipos de elección disponibles | No |
| GET | `/api/listas/anios/` | Años electorales disponibles | No |

**Parámetros de filtrado:**
- `?tipo=Rectorado` - Filtrar por tipo de elección
- `?anio=2025` - Filtrar por año
- `?search=renovacion` - Búsqueda por nombre/descripción

### Integrantes

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/api/integrantes/` | Listar integrantes | No |
| GET | `/api/integrantes/{id}/` | Detalle de integrante | No |
| POST | `/api/integrantes/` | Crear integrante | Sí |
| PUT/PATCH | `/api/integrantes/{id}/` | Actualizar integrante | Sí |
| DELETE | `/api/integrantes/{id}/` | Eliminar integrante | Sí |

### Documentos

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/api/documentos/` | Listar documentos | No |
| GET | `/api/documentos/{id}/` | Detalle de documento | No |
| POST | `/api/documentos/` | Crear documento | Sí |
| GET | `/api/documentos/{id}/descargar/` | Descargar documento (simulado) | No |
| POST | `/api/documentos/subir/` | Subir documento (simulado) | Sí |
| DELETE | `/api/documentos/{id}/` | Eliminar documento | Sí |

### Procesos Electorales

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/api/procesos/` | Listar procesos | No |
| GET | `/api/procesos/actual/` | Proceso electoral actual | No |
| POST | `/api/procesos/` | Crear proceso | Sí |

### Estadísticas

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/api/estadisticas/` | Estadísticas generales del sistema | No |

## 🔐 Autenticación

El sistema utiliza **JWT (JSON Web Tokens)** para la autenticación.

### Ejemplo de Login

```bash
curl -X POST http://127.0.0.1:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jajra@unsa.edu.pe",
    "password": "unsa2025"
  }'
```

**Respuesta:**
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

### Usar el Token en Requests

```bash
curl http://127.0.0.1:8000/api/listas/ \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc..."
```

## 👥 Usuarios Precargados

| Email | Contraseña | Rol |
|-------|-----------|-----|
| jajra@unsa.edu.pe | unsa2025 | Administrador |
| renovacion@unsa.edu.pe | electounsa | Postulante |

## 🗂️ Estructura del Proyecto

```
django-back/
├── speedrun_fsi/           # Configuración principal del proyecto
│   ├── settings.py         # Configuración de Django
│   ├── urls.py            # URLs principales
│   └── wsgi.py            # WSGI para producción
├── api/                   # Aplicación principal
│   ├── models.py          # Modelos de datos
│   ├── serializers.py     # Serializers para la API
│   ├── views.py           # Vistas y lógica de negocio
│   ├── urls.py            # URLs de la API
│   ├── admin.py           # Configuración del admin
│   └── management/        # Comandos personalizados
│       └── commands/
│           └── poblar_datos.py
├── manage.py              # Script de gestión de Django
├── db.sqlite3             # Base de datos SQLite
└── requirements.txt       # Dependencias del proyecto
```

## 🎨 Modelos de Datos

### Usuario
- Email (único, usado para login)
- Username
- Nombre y Apellido
- Es Postulante / Es Admin
- Fecha de Registro

### ListaElectoral
- ID (UUID)
- Nombre
- Tipo (Rectorado, Decanato, Asamblea, Consejo)
- Año
- Subtítulo
- Descripción
- Facultad (opcional)
- Logo
- Estado activo
- Relaciones: Integrantes, Documentos

### Integrante
- ID (UUID)
- Lista Electoral (FK)
- Nombre Completo
- Cargo
- Año
- Foto
- URL de CV
- Orden

### Documento
- ID (UUID)
- Lista Electoral (FK)
- Título
- Descripción
- Tipo
- Archivo
- URL Simulada
- Tamaño

### ProcesoElectoral
- ID (UUID)
- Nombre
- Tipo
- Año
- Etapa Actual
- Fechas de inicio/fin
- Estado activo

## 🔧 Panel de Administración

Acceder en: `http://127.0.0.1:8000/admin/`

**Credenciales:** jajra@unsa.edu.pe / unsa2025

El panel permite:
- Gestionar todos los modelos
- Ver relaciones inline
- Filtrar y buscar registros
- Editar en masa

## 🌐 Configuración CORS

El backend está configurado para aceptar requests desde:
- `http://localhost:5173` (Vite default)
- `http://127.0.0.1:5173`

Para producción, actualizar `CORS_ALLOWED_ORIGINS` en `settings.py`.

## 📝 Comandos Útiles

```bash
# Crear migraciones después de cambios en modelos
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Poblar datos iniciales
python manage.py poblar_datos

# Crear superusuario
python manage.py createsuperuser

# Ejecutar servidor
python manage.py runserver

# Ejecutar en puerto específico
python manage.py runserver 8080

# Shell interactivo de Django
python manage.py shell

# Verificar configuración
python manage.py check
```

## 🚀 Integración con Frontend

### Configuración en Frontend (React/Vite)

Crear archivo `.env` en el frontend:
```env
VITE_API_URL=http://127.0.0.1:8000/api
```

### Ejemplo de Request desde Frontend

```typescript
// Login
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

// Obtener listas
const listasResponse = await fetch('http://127.0.0.1:8000/api/listas/', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
  }
});

const listas = await listasResponse.json();
```

## 🧪 Testing

```bash
# Ejecutar tests
python manage.py test

# Test específico
python manage.py test api.tests.TestListaElectoral

# Con coverage
pip install coverage
coverage run --source='.' manage.py test
coverage report
```

## 📦 Deployment (Producción)

### Preparación

1. **Actualizar settings.py**
```python
DEBUG = False
ALLOWED_HOSTS = ['tu-dominio.com']
CORS_ALLOW_ALL_ORIGINS = False
```

2. **Recolectar archivos estáticos**
```bash
python manage.py collectstatic
```

3. **Usar base de datos PostgreSQL**
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'electoral_db',
        'USER': 'postgres',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

4. **Variables de entorno**
Usar `.env` para secrets:
```bash
pip install python-decouple
```

## 🤝 Contribución

Este backend está completamente estructurado y listo para:
- Conectar con el frontend React existente
- Agregar nuevas funcionalidades
- Escalar con más modelos y endpoints
- Implementar testing completo
- Deploy a producción

## 📄 Licencia

Proyecto académico - Universidad Nacional de San Agustín (UNSA)

## 👨‍💻 Autor

Sistema Electoral UNSA - Backend desarrollado con Django REST Framework

---

**Nota:** Este es un backend completamente funcional con datos simulados. Para implementación real, considerar:
- Storage real para archivos (AWS S3, Azure Blob, etc.)
- Base de datos PostgreSQL
- Redis para caché
- Celery para tareas asíncronas
- Testing exhaustivo
- Logging y monitoring
