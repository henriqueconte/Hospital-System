# Hospital-System

### Opção 1:

1 - Instalar os requirements:

python3 -m pip install -r requirements.txt

2 - Configurar o banco

3 - Comandos:
* Executar -> python manage.py runserver
* Criar migrações quando feitas alterações nos models -> python manage.py makemigrations
* Migrar as migrações existentes para o banco -> python manage.py migrate

```python
DATABASES = {
  'default': {
    'ENGINE': 'django.db.backends.mysql',
    'NAME': 'HospitalSystem',
    'USER': 'ana',
    'PASSWORD': '',
    'HOST': 'localhost',
    'PORT': '3306',
  }
}
```

### Opção 2:
Caso você queira rodar em docker:
1 - Instalar docker

2 - Rodar start_docker.bat ou start_docker.sh. A api e o banco vão subir em containers separados. e as migrações vão ser aplicadas

3 - Conectar em localhost:8000

Opcionalmente, voce pode conectar no banco de dados rodando no container em localhost:3306, com user:root e pass:root
