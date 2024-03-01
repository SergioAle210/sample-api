# Basketball Blog API

La Basketball Blog API es un servicio RESTful diseñado para gestionar un blog sobre baloncesto. Esta API permite realizar operaciones CRUD (Crear, Leer, Actualizar, Borrar) sobre los posts del blog.

## Características

- Listado de todos los posts de baloncesto.
- Detalle de un post específico sobre baloncesto.
- Creación de nuevos posts de baloncesto.
- Edición de posts de baloncesto existentes.
- Eliminación de posts de baloncesto.
- Soporte para imágenes en formato base64.
- Documentación de API con Swagger.
- Soporte para CORS.

## Requisitos Previos

Necesitarás tener Node.js, npm y Docker instalados en tu sistema para ejecutar este proyecto.

## Instalación

Clona este repositorio y navega al directorio del proyecto:

git clone [GirHub](git@github.com:SergioAle210/sample-api.git)

cd sample-api

## Instalar las dependencias

Instala las dependencias del proyecto:

npm install

## Uso

Para iniciar el server y empezar a hacer los endpoints:

npm start

Esto iniciazará el servidor de Express en [Server](http://127.0.0.1:3000)

## Endpoints

+ ### GET /posts: 
    Retorna un listado de todos los posts.
+ ### GET /posts/:postId: 
    Retorna el detalle de un post.
+ ### POST /posts: 
    Crea un nuevo post.
+ ### PUT /posts/:postId: 
    Modifica un post existente.
+ ### DELETE /posts/:postId: 
    Elimina un post.

## Documentacion

Para conocer la documentación que pertenece a la API se encuentra en [Swager](https://app.swaggerhub.com/home)

## Docker

Para construir y ejecutar el contenedor de la base de datos, debes de utilizar:

1. docker build -t basketball-blog-db . 
2. docker run -d -p 3306:3306 --name basketball_blog_db_container basketball-blog-db

## Licencia

Este proyecto está bajo la licencia de MIT.

