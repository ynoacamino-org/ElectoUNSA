from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    login_view, logout_view, registro_view, perfil_view,
    ListaElectoralViewSet, IntegranteViewSet, DocumentoViewSet,
    ProcesoElectoralViewSet, estadisticas_view
)

router = DefaultRouter()
router.register(r'listas', ListaElectoralViewSet, basename='lista')
router.register(r'integrantes', IntegranteViewSet, basename='integrante')
router.register(r'documentos', DocumentoViewSet, basename='documento')
router.register(r'procesos', ProcesoElectoralViewSet, basename='proceso')

urlpatterns = [
    # Autenticación
    path('auth/login/', login_view, name='login'),
    path('auth/logout/', logout_view, name='logout'),
    path('auth/registro/', registro_view, name='registro'),
    path('auth/perfil/', perfil_view, name='perfil'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Estadísticas
    path('estadisticas/', estadisticas_view, name='estadisticas'),
    
    # Router URLs
    path('', include(router.urls)),
]
