FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Exponemos el puerto del backend
EXPOSE 4000

# Solo arranca el servidor
CMD ["npm", "run", "dev"]