#  📚 Sistema web para la gestión de la Biblioteca Bernardino Rivadavia de Tandil
## Este proyecto se desarrolla en el marco de las Prácticas Profesionales de la Tecnicatura Universitaria en Desarrollo de Aplicaciones Informáticas.

## 🚀 Características
- CRUD de las entidades de la biblioteca.
- Obtener listado de entidades.
- Control de préstamos.
- Control de autores.
- Control de libros.
- Control de socios.
- Control de cuotas.
- API REST + Frontend moderno.

## 🛠️ Tecnologías
- React + Vite
- HTML,CSS, Javascript
- PostgreSQL 
- Node.js, Express.js
- Swagger + Postman
- Despliegue en render.

## ⚡ Instalación

1- **Clonar el repositorio**  
- git clone https://github.com/RolandoKirina/PPSLibraryFrontend.git

2- **Entrar en la carpeta del proyecto**
- cd PPSLibraryFrontend

3- **Configuración del Backend**

 El servidor maneja la lógica de negocio y la conexión con la base de datos.

    1- Entrar a la carpeta: cd backend

    2- Instalar dependencias: npm install

    3- Variables de entorno: Crea un archivo .env en la raíz de /backend con los siguientes datos:
        PORT=4000
        DB_HOST=localhost
        DB_NAME=nombre_de_la_base
        DB_PASS=tu_contraseña
        DB_USER=tu_usuario
        DB_DIALECT=postgres
        JWT_SECRET=abc123
        ADMIN_EMAIL=admin@gmail.com
        ADMIN_PASSWORD=1234
        ADMIN_NAME=Administrador
    
    4- Base de Datos (Migraciones y Seeds):
        npm run migrate
        npm run seed

    5- Iniciar Servidor: npm run dev

4- **Configuración del Frontend**

    1- Entrar a la carpeta: (Desde la raíz) cd PPSLibraryFrontend

    2- Instalar dependencias: npm install

    3- Iniciar Aplicación: npm run dev

    4- Acceso: Abre el navegador en http://localhost:5173

📁 Estructura del Repositorio - CORREGIR

PPSLibrary/
├── backend/               # Servidor Node.js + Express
├── config/           # Configuración de Sequelize CLI
│   └── config.cjs    # Usa dotenv para leer variables de entorno
├── migrations/       # Migraciones de base de datos
├── models/           # Modelos Sequelize
│   └── index.js      # Inicialización y relaciones entre modelos
├── seeders/          # Seeders opcionales para datos iniciales
│   └── src/               # Controladores, Rutas y Middlewares
├── frontend/    # Aplicación React + Vite
│   ├── src/components     # Componentes reutilizables
│   └── src/pages          # Vistas principales del sistema
└── README.md              # Documentación general


🧪 Calidad y Testing

El sistema ha superado una fase intensiva de Testing End-to-End manual, validando la integridad de los datos entre el cliente y el servidor, además de pruebas de los Endpoints mediante Postman.




