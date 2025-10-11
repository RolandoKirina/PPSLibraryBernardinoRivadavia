PPSLibrary Backend
Este proyecto contiene el backend de la aplicación PPSLibrary, construido con Node.js, Express, Sequelize y PostgreSQL. Utiliza Sequelize CLI para manejar migraciones, modelos y seeders.

🚀 Requisitos previos
Node.js ≥ 18

PostgreSQL corriendo localmente o en servidor

Acceso al archivo .env con credenciales de base de datos

⚙️ Instalación
1.Cloná el repositorio:

git clone https://github.com/tu-usuario/tu-repo.git
cd backend

2.Instalá las dependencias:
npm install

3.Configurá el archivo .env en la raíz del backend:

DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_de_la_base
DB_HOST=localhost

4.Verificá que el archivo config/config.cjs esté presente y use dotenv para leer las variables.

🛠️ Migraciones
Para crear las tablas y estructuras necesarias en la base de datos:

npx sequelize-cli db:migrate --config=config/config.cjs

Este comando aplica todas las migraciones definidas en migrations/.

🧪 Scripts útiles
Podés agregar estos scripts en package.json para facilitar el uso:

"scripts": {
  "dev": "nodemon src/server.js",
  "migrate": "npx sequelize-cli db:migrate --config=config/config.cjs",
  "seed": "npx sequelize-cli db:seed:all --config=config/config.cjs"
}

Entonces podés correr:

npm run migrate
npm run seed
npm run dev

📁 Estructura del proyecto
backend/
├── config/           # Configuración de Sequelize CLI
│   └── config.cjs    # Usa dotenv para leer variables de entorno
├── migrations/       # Migraciones de base de datos
├── models/           # Modelos Sequelize
│   └── index.js      # Inicialización y relaciones entre modelos
├── seeders/          # Seeders opcionales para datos iniciales
├── src/              # Código fuente del servidor
│   ├── server.js     # Punto de entrada del backend
│   └── ...           # Controladores, servicios, rutas, etc.
├── .env              # Variables de entorno
├── .sequelizerc      # Rutas personalizadas para Sequelize CLI
├── package.json      # Dependencias y scripts