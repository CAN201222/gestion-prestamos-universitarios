from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):
    TIPO_USUARIO = [
        ('admin', 'Administrador'),
        ('estudiante', 'Estudiante'),
        ('profesor', 'Profesor'),
    ]
    
    tipo_usuario = models.CharField(max_length=20, choices=TIPO_USUARIO, default='estudiante')
    matricula = models.CharField(max_length=20, unique=True, null=True, blank=True)
    telefono = models.CharField(max_length=15, blank=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.username} - {self.get_tipo_usuario_display()}"