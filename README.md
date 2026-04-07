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
│   ├── config/            # Configuración de Sequelize CLI
│   │   └── config.cjs     # Usa dotenv para leer variables de entorno
│   ├── migrations/        # Migraciones de base de datos
│   ├── models/            # Modelos Sequelize
│   │   └── index.js       # Inicialización y relaciones entre modelos
│   ├── seeders/           # Seeders opcionales para datos iniciales
│   └── src/               # Código fuente principal
│       ├── configs/       # Configuraciones internas de la app
│       ├── controllers/   # Lógica de controladores
│       ├── docs/          # Documentación interna de la API
│       ├── https/         # Configuración de codigos de servidor HTTPS
│       ├── middlewares/   # Middlewares personalizados
│       ├── models/        # Modelos adicionales (separados por dominio)
│       ├── repositories/  # Acceso a datos y queries
│       ├── routes/        # Definición de rutas Express
│       ├── services/      # Lógica de negocio
│       └── utils/         # Funciones utilitarias
├── frontend/              # Aplicación React + Vite
│   ├── public/            # Archivos estáticos públicos
│   └── src/               # Código fuente principal del frontend
│       ├── assets/        # Recursos estáticos (imágenes, íconos, estilos)
│       ├── auth/          # Lógica de autenticación y contexto
│       ├── components/    # Componentes reutilizables
│       ├── data/          # Datos mock o constantes
│       ├── hooks/         # Custom hooks de React
│       ├── layout/        # Componentes de estructura/layout
│       ├── pages/         # Vistas principales del sistema
│       └── utils/         # Funciones utilitarias
│       ├── App.jsx        # Componente raíz de la aplicación
│       ├── index.css      # Estilos globales
│       └── main.jsx       # Punto de entrada de React
└── README.md              # Documentación general


🧪 Calidad y Testing

El sistema ha superado una fase intensiva de Testing End-to-End manual, validando la integridad de los datos entre el cliente y el servidor, además de pruebas de los Endpoints mediante Postman.




