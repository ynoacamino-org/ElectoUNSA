# ElectoUNSA

ElectoUNSA es una aplicación web para la gestión y visualización de procesos electorales universitarios. El proyecto está dividido en un backend Django (django-back) y un frontend moderno con Vite (vite-front). En la raíz del repositorio también hay documentación y un informe final en PDF.

Nota rápida: he consultado el repositorio para generar este README. La consulta de commits devolvió resultados limitados y puede estar incompleta; para ver más commits en la interfaz de GitHub visita: https://github.com/ynoacamino-org/ElectoUNSA/commits

## Vista rápida / Links
- Repositorio: https://github.com/ynoacamino-org/ElectoUNSA
- Demo (si está desplegado): https://speedrun-fsi.vercel.app

## Características
- Gestión de listas y candidatos
- Visualización de hojas de vida de candidatos
- Interfaz frontend con Vite (TypeScript)
- API REST construida con Django
- Archivos y recursos multimedia incluidos (logos, imágenes)
- Informe final (PDF) incluido en la raíz del repo

## Tecnologías

Estas son las tecnologías principales utilizadas en el proyecto:

<p align="left">
  <img alt="Django" src=".github/assets/django.svg" width="64" height="64" />
  <img alt="Vite" src=".github/assets/vite.svg" width="64" height="64" />
  <img alt="TypeScript" src=".github/assets/typescript.svg" width="64" height="64" />
  <img alt="PostgreSQL" src=".github/assets/postgres.svg" width="64" height="64" />
  <img alt="Python" src=".github/assets/python.svg" width="64" height="64" />
</p>

## Arquitectura / Estructura del repositorio
- django-back/    → Código del backend (Django)
- vite-front/     → Código del frontend (Vite + TypeScript/React presumible)
- ENTREGABLE FINAL - FUNDAMENTOS DE SISTEMAS DE LA INFORMACIÓN (1).pdf → Informe final del proyecto

## Tech stack (estimado)
- Backend: Python, Django, Django REST Framework (puede cambiar según el contenido real)
- Frontend: Vite, TypeScript, (posible uso de React)
- Base de datos: PostgreSQL (recomendado) o SQLite para desarrollo
- Despliegue: Vercel para frontend (ejemplo), Heroku/DigitalOcean/GCP/Render para backend

## Requisitos previos
- Python 3.9+ (o la versión usada en el proyecto)
- Node.js 16+ y npm/yarn
- PostgreSQL (recomendado) o SQLite para pruebas locales
- git

## Instalación y ejecución (local)

### Backend (django-back)
1. Crear y activar un entorno virtual:
   - python -m venv .venv
   - source .venv/bin/activate  (Linux/macOS) o .venv\Scripts\activate (Windows)
2. Instalar dependencias:
   - pip install -r requirements.txt
   (Si no existe requirements.txt, instalar Django y DRF: pip install django djangorestframework python-dotenv)
3. Configurar variables de entorno
   - Crear un archivo `.env` o usar variables de entorno. Variables habituales:
     - DJANGO_SECRET_KEY=tu_clave_secreta
     - DEBUG=True
     - DATABASE_URL=postgres://USER:PASS@HOST:PORT/DBNAME  (o configurar settings para SQLite)
     - ALLOWED_HOSTS=localhost,127.0.0.1
4. Migraciones y datos iniciales:
   - python manage.py migrate
   - python manage.py loaddata initial_data.json  (si existe)
   - python manage.py createsuperuser
5. Ejecutar servidor:
   - python manage.py runserver

### Frontend (vite-front)
1. Entrar al directorio:
   - cd vite-front
2. Instalar dependencias:
   - npm install  (o yarn)
3. Configurar variables (ej. `.env` en frontend):
   - VITE_API_URL=http://localhost:8000/api
4. Ejecutar en desarrollo:
   - npm run dev
5. Crear build de producción:
   - npm run build
   - npm run preview

## Variables de entorno recomendadas
- Backend (.env)
  - DJANGO_SECRET_KEY
  - DEBUG
  - DATABASE_URL
  - ALLOWED_HOSTS
  - EMAIL_* (si se configura envío de correos)
- Frontend (.env)
  - VITE_API_URL

## Base de datos y migraciones
- Usar `python manage.py migrate` para aplicar migraciones del backend.
- Para producción se recomienda usar PostgreSQL y configurar DATABASE_URL apropiadamente.

## Tests
- Backend: pytest o el runner de Django
  - pytest
  - o python manage.py test
- Frontend:
  - npm test (si hay tests configurados)

## Despliegue
- Frontend: Vercel, Netlify o similar (Vite produce una carpeta `dist`/`build`)
- Backend: Gunicorn + Nginx con PostgreSQL en Heroku, Render, DigitalOcean, GCP o similar
- Configurar variables de entorno en la plataforma elegida y asegurarse de las migraciones y archivos estáticos.

## Contribuir
1. Hacer fork del repositorio.
2. Crear una rama feature/mi-cambio.
3. Hacer commits claros y descriptivos.
4. Abrir un Pull Request describiendo los cambios.
5. Mantener pruebas y linters si están configurados.

## Mantenedores / Autores (según commits)
- Yenaro Joel Noa Camino (ynoacamino)
- Johann-1498
- FernandoGarambelM
- VelmorK
- WilliamLawrence25

(Estos nombres aparecen en los commits recientes; la lista puede no estar completa.)

## Archivos importantes
- django-back/      → código del backend
- vite-front/       → código del frontend
- ENTREGABLE FINAL - FUNDAMENTOS DE SISTEMAS DE LA INFORMACIÓN (1).pdf → Informe del proyecto
