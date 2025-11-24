from django.core.management.base import BaseCommand
from django.db import transaction
from api.models import Usuario, ListaElectoral, Integrante, Documento, ProcesoElectoral
from datetime import date


class Command(BaseCommand):
    help = 'Poblar la base de datos con datos iniciales del sistema electoral'

    @transaction.atomic
    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Iniciando población de datos...'))
        
        # Crear usuarios
        self.stdout.write('Creando usuarios...')
        
        admin_user, created = Usuario.objects.get_or_create(
            email='jajra@unsa.edu.pe',
            defaults={
                'username': 'jajra',
                'first_name': 'Juan',
                'last_name': 'Administrador',
                'es_admin': True,
                'is_staff': True,
                'is_superuser': True,
            }
        )
        if created:
            admin_user.set_password('unsa2025')
            admin_user.save()
            self.stdout.write(self.style.SUCCESS(f'✓ Usuario admin creado: {admin_user.email}'))
        
        postulante_user, created = Usuario.objects.get_or_create(
            email='renovacion@unsa.edu.pe',
            defaults={
                'username': 'renovacion',
                'first_name': 'Lista',
                'last_name': 'Renovación',
                'es_postulante': True,
            }
        )
        if created:
            postulante_user.set_password('electounsa')
            postulante_user.save()
            self.stdout.write(self.style.SUCCESS(f'✓ Usuario postulante creado: {postulante_user.email}'))
        
        # Crear listas electorales
        self.stdout.write('Creando listas electorales...')
        
        # Lista 1: Renovación Universitaria
        lista1, created = ListaElectoral.objects.get_or_create(
            nombre='Renovación Universitaria',
            tipo='Rectorado',
            anio='2025',
            defaults={
                'subtitulo': 'Elecciones de Representantes Estudiantiles 2024',
                'descripcion': 'Somos la lista Renovación Universitaria y buscamos representar a estudiantes y docentes, promoviendo participación, transparencia y propuestas concretas para mejorar nuestra universidad.',
                'usuario_creador': postulante_user,
            }
        )
        if created:
            self.stdout.write(self.style.SUCCESS(f'✓ Lista creada: {lista1.nombre}'))
            
            # Integrantes de Renovación Universitaria
            Integrante.objects.create(
                lista_electoral=lista1,
                nombre='Juan Carlos Quinto',
                cargo='Candidato a Asamblea',
                anio='2025',
                orden=1
            )
            Integrante.objects.create(
                lista_electoral=lista1,
                nombre='Maria Fernandez',
                cargo='Candidato a Consejo',
                anio='2025',
                orden=2
            )
            
            # Documentos de Renovación Universitaria
            Documento.objects.create(
                lista_electoral=lista1,
                titulo='Plan de Trabajo 2025 - 2026',
                descripcion='Documento PDF detallando las propuestas.',
                tipo='plan_trabajo',
                url_simulada='#',
                tamaño_archivo='3.2 MB'
            )
            Documento.objects.create(
                lista_electoral=lista1,
                titulo='Propuesta Académica',
                descripcion='Iniciativas y proyectos de la lista.',
                tipo='propuesta_academica',
                url_simulada='#',
                tamaño_archivo='2.8 MB'
            )
        
        # Lista 2: UNSA Integra
        lista2, created = ListaElectoral.objects.get_or_create(
            nombre='UNSA Integra',
            tipo='Decanato',
            anio='2024',
            defaults={
                'subtitulo': 'Unidad y Compromiso por tu Facultad',
                'descripcion': 'Buscamos integrar a todas las escuelas profesionales bajo una misma visión de modernidad y acreditación internacional.',
                'usuario_creador': admin_user,
            }
        )
        if created:
            self.stdout.write(self.style.SUCCESS(f'✓ Lista creada: {lista2.nombre}'))
            
            # Integrantes de UNSA Integra
            Integrante.objects.create(
                lista_electoral=lista2,
                nombre='Dr. Luis Peralta',
                cargo='Candidato a Decano',
                anio='2024',
                orden=1
            )
            Integrante.objects.create(
                lista_electoral=lista2,
                nombre='Dra. Ana Soto',
                cargo='Vicedecana Académica',
                anio='2024',
                orden=2
            )
            
            # Documento de UNSA Integra
            Documento.objects.create(
                lista_electoral=lista2,
                titulo='Plan de Gobierno Decanato',
                descripcion='Propuestas especificas para la facultad.',
                tipo='plan_gobierno',
                url_simulada='#',
                tamaño_archivo='4.5 MB'
            )
        
        # Lista 3: Fuerza Estudiantil
        lista3, created = ListaElectoral.objects.get_or_create(
            nombre='Fuerza Estudiantil',
            tipo='Asamblea',
            anio='2025',
            defaults={
                'subtitulo': 'Voz Activa de los Estudiantes',
                'descripcion': 'Representamos a los estudiantes con propuestas frescas y un compromiso real con la mejora de la calidad educativa y los servicios estudiantiles.',
                'usuario_creador': admin_user,
            }
        )
        if created:
            self.stdout.write(self.style.SUCCESS(f'✓ Lista creada: {lista3.nombre}'))
            
            # Integrantes de Fuerza Estudiantil
            Integrante.objects.create(
                lista_electoral=lista3,
                nombre='Carlos Mendoza',
                cargo='Candidato a Asamblea',
                anio='2025',
                orden=1
            )
            Integrante.objects.create(
                lista_electoral=lista3,
                nombre='Lucia Ramirez',
                cargo='Candidata a Consejo',
                anio='2025',
                orden=2
            )
            
            # Documento de Fuerza Estudiantil
            Documento.objects.create(
                lista_electoral=lista3,
                titulo='Propuestas para la Asamblea 2025',
                descripcion='Iniciativas estudiantiles para el próximo periodo.',
                tipo='plan_trabajo',
                url_simulada='#',
                tamaño_archivo='2.1 MB'
            )
        
        # Crear proceso electoral
        self.stdout.write('Creando proceso electoral...')
        
        proceso, created = ProcesoElectoral.objects.get_or_create(
            nombre='Proceso Electoral Universitario 2025',
            tipo='Rectorado',
            anio='2025',
            defaults={
                'etapa_actual': 'campania',
                'fecha_inicio': date(2025, 1, 1),
                'fecha_fin': date(2025, 12, 31),
                'descripcion': 'Proceso electoral para elegir representantes universitarios del año 2025',
                'activo': True,
            }
        )
        if created:
            self.stdout.write(self.style.SUCCESS(f'✓ Proceso electoral creado: {proceso.nombre}'))
        
        self.stdout.write(self.style.SUCCESS('\n✅ Población de datos completada exitosamente!'))
        self.stdout.write(self.style.WARNING('\nCredenciales de acceso:'))
        self.stdout.write(f'  Admin: jajra@unsa.edu.pe / unsa2025')
        self.stdout.write(f'  Postulante: renovacion@unsa.edu.pe / electounsa')
