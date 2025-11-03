from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        # Exponer también is_staff (y opcionalmente is_superuser) para que el
        # frontend pueda mostrar/ocultar funcionalidades de administrador.
        fields = (
            'id', 'username', 'email', 'tipo_usuario', 'matricula', 'telefono',
            'first_name', 'last_name', 'is_staff', 'is_superuser'
        )

class RegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = Usuario
        fields = ('username', 'email', 'password', 'tipo_usuario', 'matricula', 'telefono', 'first_name', 'last_name')
    
    def create(self, validated_data):
        user = Usuario.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            tipo_usuario=validated_data.get('tipo_usuario', 'estudiante'),
            matricula=validated_data.get('matricula'),
            telefono=validated_data.get('telefono'),
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    
    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        
        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                if user.is_active:
                    data['user'] = user
                else:
                    raise serializers.ValidationError('Cuenta deshabilitada')
            else:
                raise serializers.ValidationError('Credenciales inválidas')
        else:
            raise serializers.ValidationError('Debe proporcionar username y password')
        return data