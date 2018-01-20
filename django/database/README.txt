Feel free to reformat this! 

Setting up the Developer environment:
$ sudo apt-get update 
Install python 3
Install pip
set up a virtual environment:
$ virtualenv fml –python=python3.6

Activate virtual envirment in current terminal:
$ source fml/bin/activate
$ pip install pip --upgrade
$ pip install Django
$ pip install djangorestframework
$ pip install markdown
$ pip install django-filter 
$ pip install psycopg2
then when you're done: deactivate

To start up the virtual enviroment again run $ source ~/fml/bin/activate

Setting up a local postgres server:

$ sudo apt-get update
$ sudo apt-get install postgresql postgresql-contrib
$ sudo su
# su postgres
$ psql
postgres=# CREATE USER “user” PASSWORD 'admin';

open a new terminal

navigate to  /WebDev/django/database
start dev environment:
$ source ~/fml/bin/activate

do first migration
$ python manage.py migrate

Start server
$ python manage.py runserver

 



