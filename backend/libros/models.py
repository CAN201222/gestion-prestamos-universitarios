from django.db import models

class Libro(models.Model):
    titulo = models.CharField(max_length=200)
    autor = models.CharField(max_length=100)
    isbn = models.CharField(max_length=20, unique=True)
    editorial = models.CharField(max_length=100)
    año_publicacion = models.IntegerField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    # --- CAMPOS NUEVOS (AÑADIR ESTOS) ---
    stock = models.PositiveIntegerField(default=1, help_text="Cantidad total de este libro")
    disponibles = models.PositiveIntegerField(blank=True, help_text="Cantidad disponible para prestar")

    def __str__(self):
        return f"{self.titulo} - {self.autor} ({self.disponibles} de {self.stock})"

    def save(self, *args, **kwargs):
        # Lógica para que al crear un libro, 'disponibles' sea igual a 'stock'
        if not self.pk: # Si es un libro nuevo (no tiene Primary Key)
            self.disponibles = self.stock
        super().save(*args, **kwargs)