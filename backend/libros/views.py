from rest_framework import viewsets, permissions
from .models import Libro
from .serializers import LibroSerializer

class LibroViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite ver, crear, editar y eliminar Libros.
    """
    queryset = Libro.objects.all().order_by('titulo')
    serializer_class = LibroSerializer
    
    # Opcional: Define permisos. Por ejemplo, solo los admins pueden modificar.
    # Si quieres que cualquiera autenticado pueda modificar, puedes borrar 
    # estas líneas de 'permission_classes'.
    def get_permissions(self):
        # Allow anyone (including anonymous) to list and retrieve libros so the
        # frontend can show available books without login. Only admin users
        # can create/update/delete.
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        # Fallback: require authenticated
        return [permissions.IsAuthenticated()]