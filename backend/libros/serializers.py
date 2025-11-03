from rest_framework import serializers
from .models import Libro

class LibroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Libro
        # Asegúrate de incluir 'stock' y 'disponibles'
        fields = [
            'id', 'titulo', 'autor', 'isbn', 'editorial', 
            'año_publicacion', 'fecha_creacion', 'stock', 'disponibles'
        ]
        # El usuario no debe poder editar los disponibles, solo el sistema
        read_only_fields = ['disponibles']