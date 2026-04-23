FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

# Vite necesita --host para permitir conexiones externas al contenedor
CMD ["npm", "run", "dev", "--", "--host"]