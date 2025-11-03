from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# El router genera automáticamente las URLs para el ViewSet
# GET /api/libros/ (lista)
# POST /api/libros/ (crear)
# GET /api/libros/{id}/ (detalle)
# PUT /api/libros/{id}/ (actualizar)
# DELETE /api/libros/{id}/ (borrar)

router = DefaultRouter()
router.register(r'', views.LibroViewSet, basename='libro')

urlpatterns = [
    path('', include(router.urls)),
]