from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Prestamo, Libro
from .serializers import PrestamoSerializer
from django.utils import timezone

class PrestamoViewSet(viewsets.ModelViewSet):
    """
    API endpoint para gestionar Préstamos.
    """
    queryset = Prestamo.objects.all().order_by('-fecha_prestamo')
    serializer_class = PrestamoSerializer
    permission_classes = [permissions.IsAuthenticated] # Solo usuarios logueados

    def get_queryset(self):
        """
        Filtra los préstamos:
        - Los admin ven todos.
        - Los usuarios normales solo ven los suyos.
        """
        user = self.request.user
        if user.is_staff or user.tipo_usuario == 'admin':
            return Prestamo.objects.all()
        return Prestamo.objects.filter(usuario=user)

    def perform_create(self, serializer):
        """
        Al crear un préstamo:
        1. Asigna el préstamo al usuario actual.
        2. Cambia el estado del libro a 'prestado'.
        """
        libro = serializer.validated_data['libro']

        # 1. Asigna el usuario
        prestamo = serializer.save(usuario=self.request.user)

        # 2. Actualiza el estado del libro
        libro.disponibles -= 1
        libro.save()

    def update(self, request, *args, **kwargs):
        """
        Al actualizar un préstamo (ej. para devolverlo):
        1. Si el estado cambia a 'devuelto', actualiza la fecha de devolución.
        2. Cambia el estado del libro de nuevo a 'disponible'.
        """
        prestamo = self.get_object()
        nuevo_estado = request.data.get('estado')

        # Si se está devolviendo el libro
        if nuevo_estado == 'devuelto' and prestamo.estado != 'devuelto':
            prestamo.fecha_devolucion_real = timezone.now()

            # Cambia el estado del libro a disponible
            libro = prestamo.libro
            libro.disponibles += 1
            libro.save()

        return super().update(request, *args, **kwargs)