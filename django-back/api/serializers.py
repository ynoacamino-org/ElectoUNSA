from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import Usuario, ListaElectoral, Integrante, Documento, ProcesoElectoral


class UsuarioSerializer(serializers.ModelSerializer):
    """Serializer para el modelo Usuario"""
    class Meta:
        model = Usuario
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'es_postulante', 'es_admin', 'fecha_registro', 'is_active'
        ]
        read_only_fields = ['id', 'fecha_registro']


class UsuarioRegistroSerializer(serializers.ModelSerializer):
    """Serializer para registro de nuevos usuarios"""
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True, min_length=8)
    
    class Meta:
        model = Usuario
        fields = [
            'username', 'email', 'password', 'password_confirm',
            'first_name', 'last_name', 'es_postulante'
        ]
    
    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({
                "password": "Las contraseñas no coinciden"
            })
        return data
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        password = validated_data.pop('password')
        usuario = Usuario(**validated_data)
        usuario.set_password(password)
        usuario.save()
        return usuario


class LoginSerializer(serializers.Serializer):
    """Serializer para login de usuarios"""
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        
        if email and password:
            # Buscar usuario por email
            try:
                user = Usuario.objects.get(email=email)
                if not user.check_password(password):
                    raise serializers.ValidationError(
                        'Email o contraseña incorrectos'
                    )
                if not user.is_active:
                    raise serializers.ValidationError(
                        'Esta cuenta ha sido desactivada'
                    )
            except Usuario.DoesNotExist:
                raise serializers.ValidationError(
                    'Email o contraseña incorrectos'
                )
            
            data['user'] = user
        else:
            raise serializers.ValidationError(
                'Debe proporcionar email y contraseña'
            )
        
        return data


class IntegranteSerializer(serializers.ModelSerializer):
    """Serializer para integrantes de listas electorales"""
    class Meta:
        model = Integrante
        fields = [
            'id', 'nombre', 'cargo', 'anio', 'foto', 'cv_url', 'orden'
        ]


class DocumentoSerializer(serializers.ModelSerializer):
    """Serializer para documentos de listas electorales"""
    class Meta:
        model = Documento
        fields = [
            'id', 'titulo', 'descripcion', 'tipo', 'archivo',
            'url_simulada', 'fecha_subida', 'tamaño_archivo'
        ]


class ListaElectoralSerializer(serializers.ModelSerializer):
    """Serializer básico para listas electorales"""
    integrantes_count = serializers.SerializerMethodField()
    documentos_count = serializers.SerializerMethodField()
    
    class Meta:
        model = ListaElectoral
        fields = [
            'id', 'nombre', 'tipo', 'anio', 'subtitulo', 'descripcion',
            'facultad', 'logo', 'fecha_creacion', 'fecha_actualizacion',
            'activa', 'integrantes_count', 'documentos_count'
        ]
        read_only_fields = ['id', 'fecha_creacion', 'fecha_actualizacion']
    
    def get_integrantes_count(self, obj):
        return obj.integrantes.count()
    
    def get_documentos_count(self, obj):
        return obj.documentos.count()


class ListaElectoralDetalleSerializer(serializers.ModelSerializer):
    """Serializer detallado para listas electorales con integrantes y documentos"""
    integrantes = IntegranteSerializer(many=True, read_only=True)
    documentos = DocumentoSerializer(many=True, read_only=True)
    usuario_creador_email = serializers.SerializerMethodField()
    
    class Meta:
        model = ListaElectoral
        fields = [
            'id', 'nombre', 'tipo', 'anio', 'subtitulo', 'descripcion',
            'facultad', 'logo', 'fecha_creacion', 'fecha_actualizacion',
            'activa', 'integrantes', 'documentos', 'usuario_creador_email'
        ]
        read_only_fields = ['id', 'fecha_creacion', 'fecha_actualizacion']
    
    def get_usuario_creador_email(self, obj):
        return obj.usuario_creador.email if obj.usuario_creador else None


class ListaElectoralCreateSerializer(serializers.ModelSerializer):
    """Serializer para crear listas electorales"""
    integrantes = IntegranteSerializer(many=True, required=False)
    documentos = DocumentoSerializer(many=True, required=False)
    
    class Meta:
        model = ListaElectoral
        fields = [
            'nombre', 'tipo', 'anio', 'subtitulo', 'descripcion',
            'facultad', 'logo', 'integrantes', 'documentos'
        ]
    
    def create(self, validated_data):
        integrantes_data = validated_data.pop('integrantes', [])
        documentos_data = validated_data.pop('documentos', [])
        
        lista = ListaElectoral.objects.create(**validated_data)
        
        for integrante_data in integrantes_data:
            Integrante.objects.create(lista_electoral=lista, **integrante_data)
        
        for documento_data in documentos_data:
            Documento.objects.create(lista_electoral=lista, **documento_data)
        
        return lista


class ProcesoElectoralSerializer(serializers.ModelSerializer):
    """Serializer para procesos electorales"""
    class Meta:
        model = ProcesoElectoral
        fields = [
            'id', 'nombre', 'tipo', 'anio', 'etapa_actual',
            'fecha_inicio', 'fecha_fin', 'descripcion', 'activo'
        ]
        read_only_fields = ['id']
