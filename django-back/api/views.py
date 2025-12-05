from rest_framework import viewsets, status, filters
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Q
from django.http import FileResponse, HttpResponse
from django.shortcuts import get_object_or_404
import base64
import io

from .models import Usuario, ListaElectoral, Integrante, Documento, ProcesoElectoral
from .serializers import (
    UsuarioSerializer, UsuarioRegistroSerializer, LoginSerializer,
    ListaElectoralSerializer, ListaElectoralDetalleSerializer,
    ListaElectoralCreateSerializer, IntegranteSerializer,
    DocumentoSerializer, ProcesoElectoralSerializer
)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """Vista para login de usuarios"""
    serializer = LoginSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.validated_data['user']
        
        # Generar tokens JWT
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'success': True,
            'message': 'Login exitoso',
            'user': {
                'id': str(user.id),
                'email': user.email,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'es_postulante': user.es_postulante,
                'es_admin': user.es_admin,
            },
            'tokens': {
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            }
        }, status=status.HTTP_200_OK)
    
    return Response({
        'success': False,
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """Vista para logout de usuarios"""
    try:
        refresh_token = request.data.get('refresh_token')
        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist()
        
        return Response({
            'success': True,
            'message': 'Logout exitoso'
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            'success': False,
            'message': 'Error al cerrar sesión'
        }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def registro_view(request):
    """Vista para registro de nuevos usuarios"""
    serializer = UsuarioRegistroSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.save()
        
        # Generar tokens JWT
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'success': True,
            'message': 'Usuario registrado exitosamente',
            'user': {
                'id': str(user.id),
                'email': user.email,
                'username': user.username,
            },
            'tokens': {
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            }
        }, status=status.HTTP_201_CREATED)
    
    return Response({
        'success': False,
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def perfil_view(request):
    """Vista para obtener perfil del usuario actual"""
    serializer = UsuarioSerializer(request.user)
    return Response({
        'success': True,
        'user': serializer.data
    })


class ListaElectoralViewSet(viewsets.ModelViewSet):
    """ViewSet para listas electorales con filtrado avanzado"""
    queryset = ListaElectoral.objects.filter(activa=True).prefetch_related('integrantes', 'documentos')
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['nombre', 'descripcion', 'facultad']
    ordering_fields = ['fecha_creacion', 'nombre', 'anio']
    ordering = ['-fecha_creacion']
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ListaElectoralDetalleSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return ListaElectoralCreateSerializer
        return ListaElectoralSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filtro por tipo
        tipo = self.request.query_params.get('tipo', None)
        if tipo:
            queryset = queryset.filter(tipo=tipo)
        
        # Filtro por año
        anio = self.request.query_params.get('anio', None)
        if anio:
            queryset = queryset.filter(anio=anio)
        
        # Filtro por nombre (búsqueda)
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(nombre__icontains=search) |
                Q(descripcion__icontains=search) |
                Q(facultad__icontains=search)
            )
        
        return queryset
    
    def perform_create(self, serializer):
        serializer.save(usuario_creador=self.request.user)
    
    @action(detail=True, methods=['get'])
    def integrantes(self, request, pk=None):
        """Obtener integrantes de una lista específica"""
        lista = self.get_object()
        integrantes = lista.integrantes.all()
        serializer = IntegranteSerializer(integrantes, many=True)
        return Response({
            'success': True,
            'integrantes': serializer.data
        })
    
    @action(detail=True, methods=['get'])
    def documentos(self, request, pk=None):
        """Obtener documentos de una lista específica"""
        lista = self.get_object()
        documentos = lista.documentos.all()
        serializer = DocumentoSerializer(documentos, many=True)
        return Response({
            'success': True,
            'documentos': serializer.data
        })
    
    @action(detail=False, methods=['get'])
    def tipos(self, request):
        """Obtener tipos de elección disponibles"""
        tipos = ListaElectoral.TIPOS_ELECCION
        return Response({
            'success': True,
            'tipos': [{'value': tipo[0], 'label': tipo[1]} for tipo in tipos]
        })
    
    @action(detail=False, methods=['get'])
    def anios(self, request):
        """Obtener años disponibles"""
        anios = ListaElectoral.objects.values_list('anio', flat=True).distinct().order_by('-anio')
        return Response({
            'success': True,
            'anios': list(anios)
        })


class IntegranteViewSet(viewsets.ModelViewSet):
    """ViewSet para integrantes"""
    queryset = Integrante.objects.all()
    serializer_class = IntegranteSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class DocumentoViewSet(viewsets.ModelViewSet):
    """ViewSet para documentos con subida y descarga simulada"""
    queryset = Documento.objects.all()
    serializer_class = DocumentoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    @action(detail=True, methods=['get'])
    def descargar(self, request, pk=None):
        """Simular descarga de documento"""
        documento = self.get_object()
        
        # Simulación: generar contenido PDF ficticio
        contenido_simulado = f"""
        DOCUMENTO: {documento.titulo}
        DESCRIPCIÓN: {documento.descripcion or 'Sin descripción'}
        TIPO: {documento.get_tipo_display()}
        FECHA: {documento.fecha_subida.strftime('%d/%m/%Y')}
        
        Este es un documento simulado del sistema electoral UNSA.
        En un sistema real, aquí estaría el archivo PDF real.
        """
        
        response = HttpResponse(contenido_simulado, content_type='text/plain')
        response['Content-Disposition'] = f'attachment; filename="{documento.titulo}.txt"'
        
        return response
    
    @action(detail=False, methods=['post'])
    def subir(self, request):
        """Simular subida de documento"""
        lista_id = request.data.get('lista_electoral')
        titulo = request.data.get('titulo')
        descripcion = request.data.get('descripcion', '')
        tipo = request.data.get('tipo', 'otro')
        
        if not lista_id or not titulo:
            return Response({
                'success': False,
                'message': 'Faltan datos requeridos'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            lista = ListaElectoral.objects.get(id=lista_id)
            
            # Crear documento simulado
            documento = Documento.objects.create(
                lista_electoral=lista,
                titulo=titulo,
                descripcion=descripcion,
                tipo=tipo,
                url_simulada='#',
                tamaño_archivo='2.5 MB'
            )
            
            serializer = self.get_serializer(documento)
            
            return Response({
                'success': True,
                'message': 'Documento subido exitosamente (simulado)',
                'documento': serializer.data
            }, status=status.HTTP_201_CREATED)
        
        except ListaElectoral.DoesNotExist:
            return Response({
                'success': False,
                'message': 'Lista electoral no encontrada'
            }, status=status.HTTP_404_NOT_FOUND)


class ProcesoElectoralViewSet(viewsets.ModelViewSet):
    """ViewSet para procesos electorales"""
    queryset = ProcesoElectoral.objects.filter(activo=True)
    serializer_class = ProcesoElectoralSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    @action(detail=False, methods=['get'])
    def actual(self, request):
        """Obtener el proceso electoral actual"""
        proceso = self.queryset.filter(activo=True).first()
        if proceso:
            serializer = self.get_serializer(proceso)
            return Response({
                'success': True,
                'proceso': serializer.data
            })
        return Response({
            'success': False,
            'message': 'No hay proceso electoral activo'
        }, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([AllowAny])
def estadisticas_view(request):
    """Vista para obtener estadísticas generales"""
    return Response({
        'success': True,
        'estadisticas': {
            'total_listas': ListaElectoral.objects.filter(activa=True).count(),
            'total_usuarios': Usuario.objects.filter(is_active=True).count(),
            'total_documentos': Documento.objects.count(),
            'listas_por_tipo': {
                tipo[0]: ListaElectoral.objects.filter(tipo=tipo[0], activa=True).count()
                for tipo in ListaElectoral.TIPOS_ELECCION
            }
        }
    })

