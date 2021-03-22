## Opção 1:

Importante: Todos esses comandos devem ser executados com python3, se o seu sistema estiver com o python2 como default, faça um alias para o python3, para facilitar o uso.

*alias python=python3*

**1 - Instalar os requirements:**

*python -m pip install -r requirements.txt*

**2 - Configurar o banco local nesta parte no arquivo "Hospital-System/Backend/HospitalSystem/HospitalSystem/settings.py", colocando sua senha e usuário:**

```
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

**3 - Execute o comando abaixo, ele vai subir o serviço e servirá somente para testar se a conexão configurada no passo anterior funcionou.**

*python manage.py runserver*

**4 - Se não ocorreu nenhum erro, pare o serviço e execute o comando que fará a criação das tabelas no banco de dados:**

*python manage.py migrate*

**5 - [Opcional] Se quiser popular sua tabela com dados falsos, use o comando:**

*python setup/dbsetup.py *

**6 - Suba o serviço novamente com o comando:**

*python manage.py runserver*



## Opção 2:

**Caso você queira rodar em docker:**

**1 - Instalar docker**

**2 - Rodar start_docker.bat ou start_docker.sh. A api e o banco vão subir em containers separados**

**3 - Conectar em localhost:8000**
