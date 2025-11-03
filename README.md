# Gestión Préstamos Universitarios

Proyecto fullstack con backend Django (REST API) y frontend Angular.

Archivos importantes:
- `backend/` : código Django
- `frontend/` : código Angular
- `.env.example` : plantilla de variables de entorno (NO subir secretos)
- `.gitignore` : archivos/dirs ignorados por git

Cómo preparar (local, sin Docker):

1. Clona el repo:

```powershell
git clone <repo-url>
cd <repo-folder>
```

2. Backend (desde la carpeta `backend`):

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy ..\.env.example .env
# Edita backend/.env con valores reales
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

3. Frontend (desde la carpeta `frontend`):

```powershell
cd frontend
npm install
ng serve
```

No subas nunca tu `.env` ni secretos al repositorio público. Usa `.env.example` como plantilla.
"# Sistema de Gesti�n de Pr�stamos Universitarios" 
