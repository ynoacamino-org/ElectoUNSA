from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario, ListaElectoral, Integrante, Documento, ProcesoElectoral


@admin.register(Usuario)
class UsuarioAdmin(UserAdmin):
    """Administración de usuarios"""
    list_display = ['email', 'username', 'first_name', 'last_name', 'es_postulante', 'es_admin', 'is_active']
    list_filter = ['es_postulante', 'es_admin', 'is_active', 'fecha_registro']
    search_fields = ['email', 'username', 'first_name', 'last_name']
    ordering = ['-fecha_registro']
    
    fieldsets = UserAdmin.fieldsets + (
        ('Información Electoral', {
            'fields': ('es_postulante', 'es_admin', 'fecha_registro')
        }),
    )
    
    readonly_fields = ['fecha_registro']


class IntegranteInline(admin.TabularInline):
    """Inline para integrantes en la lista electoral"""
    model = Integrante
    extra = 1
    fields = ['nombre', 'cargo', 'anio', 'foto', 'orden']


class DocumentoInline(admin.TabularInline):
    """Inline para documentos en la lista electoral"""
    model = Documento
    extra = 1
    fields = ['titulo', 'tipo', 'descripcion', 'archivo']


@admin.register(ListaElectoral)
class ListaElectoralAdmin(admin.ModelAdmin):
    """Administración de listas electorales"""
    list_display = ['nombre', 'tipo', 'anio', 'activa', 'fecha_creacion', 'usuario_creador']
    list_filter = ['tipo', 'anio', 'activa', 'fecha_creacion']
    search_fields = ['nombre', 'descripcion', 'facultad']
    readonly_fields = ['id', 'fecha_creacion', 'fecha_actualizacion']
    inlines = [IntegranteInline, DocumentoInline]
    
    fieldsets = (
        ('Información Básica', {
            'fields': ('id', 'nombre', 'tipo', 'anio', 'subtitulo')
        }),
        ('Descripción', {
            'fields': ('descripcion', 'facultad', 'logo')
        }),
        ('Estado y Metadata', {
            'fields': ('activa', 'usuario_creador', 'fecha_creacion', 'fecha_actualizacion')
        }),
    )
    
    def save_model(self, request, obj, form, change):
        if not change:
            obj.usuario_creador = request.user
        super().save_model(request, obj, form, change)


@admin.register(Integrante)
class IntegranteAdmin(admin.ModelAdmin):
    """Administración de integrantes"""
    list_display = ['nombre', 'cargo', 'lista_electoral', 'anio', 'orden']
    list_filter = ['cargo', 'anio']
    search_fields = ['nombre', 'cargo', 'lista_electoral__nombre']
    ordering = ['lista_electoral', 'orden', 'nombre']


@admin.register(Documento)
class DocumentoAdmin(admin.ModelAdmin):
    """Administración de documentos"""
    list_display = ['titulo', 'tipo', 'lista_electoral', 'fecha_subida', 'tamaño_archivo']
    list_filter = ['tipo', 'fecha_subida']
    search_fields = ['titulo', 'descripcion', 'lista_electoral__nombre']
    readonly_fields = ['id', 'fecha_subida']
    ordering = ['-fecha_subida']


@admin.register(ProcesoElectoral)
class ProcesoElectoralAdmin(admin.ModelAdmin):
    """Administración de procesos electorales"""
    list_display = ['nombre', 'tipo', 'anio', 'etapa_actual', 'activo', 'fecha_inicio', 'fecha_fin']
    list_filter = ['tipo', 'etapa_actual', 'activo', 'anio']
    search_fields = ['nombre', 'descripcion']
    readonly_fields = ['id']
    
    fieldsets = (
        ('Información General', {
            'fields': ('id', 'nombre', 'tipo', 'anio')
        }),
        ('Estado del Proceso', {
            'fields': ('etapa_actual', 'activo')
        }),
        ('Fechas', {
            'fields': ('fecha_inicio', 'fecha_fin')
        }),
        ('Descripción', {
            'fields': ('descripcion',)
        }),
    )

