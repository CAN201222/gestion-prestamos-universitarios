from rest_framework import serializers
from .models import Prestamo, Libro

class PrestamoSerializer(serializers.ModelSerializer):
    # Para mostrar los detalles del libro y usuario, no solo los IDs
    usuario_username = serializers.ReadOnlyField(source='usuario.username')
    libro_titulo = serializers.ReadOnlyField(source='libro.titulo')

    class Meta:
        model = Prestamo
        fields = [
            'id', 'usuario', 'libro', 'fecha_prestamo', 
            'fecha_devolucion_prevista', 'fecha_devolucion_real', 
            'estado', 'usuario_username', 'libro_titulo'
        ]
        # Hacemos que 'usuario' sea de solo lectura en la creación, 
        # se asignará automáticamente al usuario que hace la petición.
        read_only_fields = ['usuario', 'fecha_prestamo']

    def validate_libro(self, libro):
        """
        Verifica que el libro esté disponible antes de crear el préstamo.
        """
        if libro.disponibles <= 0:
            raise serializers.ValidationError("No hay copias disponibles de este libro.")
        return libro