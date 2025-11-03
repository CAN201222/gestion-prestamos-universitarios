from django.db import models
from usuarios.models import Usuario
from libros.models import Libro

class Prestamo(models.Model):
    ESTADO_PRESTAMO = [
        ('activo', 'Activo'),
        ('devuelto', 'Devuelto'),
        ('vencido', 'Vencido'),
    ]
    
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE)
    fecha_prestamo = models.DateTimeField(auto_now_add=True)
    fecha_devolucion_prevista = models.DateTimeField()
    fecha_devolucion_real = models.DateTimeField(null=True, blank=True)
    estado = models.CharField(max_length=20, choices=ESTADO_PRESTAMO, default='activo')
    
    class Meta:
        ordering = ['-fecha_prestamo']
    
    def __str__(self):
        return f"Préstamo: {self.libro.titulo} - {self.usuario.username}"