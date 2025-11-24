from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import EmailValidator
import uuid


class Usuario(AbstractUser):
    """Modelo de usuario personalizado para el sistema electoral"""
    email = models.EmailField(
        unique=True,
        validators=[EmailValidator()],
        verbose_name="Correo Electrónico"
    )
    es_postulante = models.BooleanField(default=False, verbose_name="¿Es Postulante?")
    es_admin = models.BooleanField(default=False, verbose_name="¿Es Administrador?")
    fecha_registro = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de Registro")
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    class Meta:
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"
        ordering = ['-fecha_registro']
    
    def __str__(self):
        return self.email


class ListaElectoral(models.Model):
    """Modelo para listas electorales"""
    TIPOS_ELECCION = [
        ('Rectorado', 'Rectorado'),
        ('Decanato', 'Decanato'),
        ('Asamblea', 'Asamblea'),
        ('Consejo', 'Consejo'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=200, verbose_name="Nombre de la Lista")
    tipo = models.CharField(
        max_length=50,
        choices=TIPOS_ELECCION,
        verbose_name="Tipo de Elección"
    )
    anio = models.CharField(max_length=4, verbose_name="Año Electoral")
    subtitulo = models.CharField(
        max_length=300,
        blank=True,
        null=True,
        verbose_name="Subtítulo"
    )
    descripcion = models.TextField(verbose_name="Descripción")
    facultad = models.CharField(
        max_length=200,
        blank=True,
        null=True,
        verbose_name="Facultad"
    )
    logo = models.ImageField(
        upload_to='logos/',
        blank=True,
        null=True,
        verbose_name="Logo"
    )
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    activa = models.BooleanField(default=True, verbose_name="Lista Activa")
    usuario_creador = models.ForeignKey(
        'Usuario',
        on_delete=models.SET_NULL,
        null=True,
        related_name='listas_creadas',
        verbose_name="Creado por"
    )
    
    class Meta:
        verbose_name = "Lista Electoral"
        verbose_name_plural = "Listas Electorales"
        ordering = ['-fecha_creacion']
        indexes = [
            models.Index(fields=['tipo', 'anio']),
            models.Index(fields=['nombre']),
        ]
    
    def __str__(self):
        return f"{self.nombre} - {self.tipo} {self.anio}"


class Integrante(models.Model):
    """Modelo para integrantes de las listas electorales"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    lista_electoral = models.ForeignKey(
        ListaElectoral,
        on_delete=models.CASCADE,
        related_name='integrantes',
        verbose_name="Lista Electoral"
    )
    nombre = models.CharField(max_length=200, verbose_name="Nombre Completo")
    cargo = models.CharField(max_length=200, verbose_name="Cargo")
    anio = models.CharField(max_length=4, verbose_name="Año")
    foto = models.ImageField(
        upload_to='fotos_integrantes/',
        blank=True,
        null=True,
        verbose_name="Foto"
    )
    cv_url = models.URLField(
        blank=True,
        null=True,
        verbose_name="URL de CV"
    )
    orden = models.IntegerField(default=0, verbose_name="Orden de Visualización")
    
    class Meta:
        verbose_name = "Integrante"
        verbose_name_plural = "Integrantes"
        ordering = ['orden', 'nombre']
    
    def __str__(self):
        return f"{self.nombre} - {self.cargo}"


class Documento(models.Model):
    """Modelo para documentos oficiales de las listas"""
    TIPOS_DOCUMENTO = [
        ('plan_trabajo', 'Plan de Trabajo'),
        ('plan_gobierno', 'Plan de Gobierno'),
        ('propuesta_academica', 'Propuesta Académica'),
        ('hoja_vida', 'Hoja de Vida'),
        ('declaracion_jurada', 'Declaración Jurada'),
        ('otro', 'Otro'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    lista_electoral = models.ForeignKey(
        ListaElectoral,
        on_delete=models.CASCADE,
        related_name='documentos',
        verbose_name="Lista Electoral"
    )
    titulo = models.CharField(max_length=300, verbose_name="Título del Documento")
    descripcion = models.TextField(
        blank=True,
        null=True,
        verbose_name="Descripción"
    )
    tipo = models.CharField(
        max_length=50,
        choices=TIPOS_DOCUMENTO,
        default='otro',
        verbose_name="Tipo de Documento"
    )
    archivo = models.FileField(
        upload_to='documentos/',
        blank=True,
        null=True,
        verbose_name="Archivo"
    )
    url_simulada = models.URLField(
        blank=True,
        null=True,
        verbose_name="URL Simulada"
    )
    fecha_subida = models.DateTimeField(auto_now_add=True)
    tamaño_archivo = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        verbose_name="Tamaño del Archivo"
    )
    
    class Meta:
        verbose_name = "Documento"
        verbose_name_plural = "Documentos"
        ordering = ['-fecha_subida']
    
    def __str__(self):
        return f"{self.titulo} - {self.lista_electoral.nombre}"


class ProcesoElectoral(models.Model):
    """Modelo para gestionar los procesos electorales y sus etapas"""
    ETAPAS = [
        ('convocatoria', 'Convocatoria'),
        ('inscripcion', 'Inscripción de Listas'),
        ('subsanacion', 'Subsanación'),
        ('tachas', 'Periodo de Tachas'),
        ('publicacion', 'Publicación de Listas Hábiles'),
        ('campania', 'Campaña Electoral'),
        ('votacion', 'Jornada Electoral'),
        ('escrutinio', 'Escrutinio'),
        ('proclamacion', 'Proclamación de Resultados'),
        ('impugnaciones', 'Impugnaciones'),
        ('credenciales', 'Entrega de Credenciales'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=300, verbose_name="Nombre del Proceso")
    tipo = models.CharField(max_length=50, verbose_name="Tipo de Elección")
    anio = models.CharField(max_length=4, verbose_name="Año")
    etapa_actual = models.CharField(
        max_length=50,
        choices=ETAPAS,
        default='convocatoria',
        verbose_name="Etapa Actual"
    )
    fecha_inicio = models.DateField(verbose_name="Fecha de Inicio")
    fecha_fin = models.DateField(verbose_name="Fecha de Fin")
    descripcion = models.TextField(blank=True, null=True)
    activo = models.BooleanField(default=True, verbose_name="Proceso Activo")
    
    class Meta:
        verbose_name = "Proceso Electoral"
        verbose_name_plural = "Procesos Electorales"
        ordering = ['-fecha_inicio']
    
    def __str__(self):
        return f"{self.nombre} - {self.anio}"
