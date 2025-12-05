# Script de inicialización rápida del backend
# Ejecutar con: .\setup.ps1

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Backend Sistema Electoral UNSA" -ForegroundColor Cyan
Write-Host "Inicializando..." -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si existe el entorno virtual
if (Test-Path "venv") {
    Write-Host "✓ Entorno virtual encontrado" -ForegroundColor Green
} else {
    Write-Host "× Entorno virtual no encontrado" -ForegroundColor Red
    Write-Host "Creando entorno virtual..." -ForegroundColor Yellow
    python -m venv venv
    Write-Host "✓ Entorno virtual creado" -ForegroundColor Green
}

Write-Host ""
Write-Host "Activando entorno virtual..." -ForegroundColor Yellow
.\venv\Scripts\Activate.ps1

Write-Host ""
Write-Host "Instalando dependencias..." -ForegroundColor Yellow
pip install -q -r requirements.txt

Write-Host ""
Write-Host "Ejecutando migraciones..." -ForegroundColor Yellow
python manage.py migrate --no-input

Write-Host ""
Write-Host "Poblando base de datos con datos iniciales..." -ForegroundColor Yellow
python manage.py poblar_datos

Write-Host ""
Write-Host "==================================" -ForegroundColor Green
Write-Host "✅ Backend inicializado correctamente!" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green
Write-Host ""
Write-Host "Credenciales de acceso:" -ForegroundColor Cyan
Write-Host "  Admin: jajra@unsa.edu.pe / unsa2025" -ForegroundColor White
Write-Host "  Postulante: renovacion@unsa.edu.pe / electounsa" -ForegroundColor White
Write-Host ""
Write-Host "Para iniciar el servidor:" -ForegroundColor Cyan
Write-Host "  python manage.py runserver" -ForegroundColor White
Write-Host ""
Write-Host "Panel de administración:" -ForegroundColor Cyan
Write-Host "  http://127.0.0.1:8000/admin/" -ForegroundColor White
Write-Host ""
Write-Host "API base:" -ForegroundColor Cyan
Write-Host "  http://127.0.0.1:8000/api/" -ForegroundColor White
Write-Host ""
