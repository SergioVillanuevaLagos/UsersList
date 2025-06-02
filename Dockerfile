# Etapa 1: Compilación de Angular
FROM node:18-alpine AS build

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios
COPY package*.json ./
COPY angular.json ./
COPY tsconfig*.json ./
COPY . .

# Instalar dependencias
RUN npm install

# Compilar la aplicación Angular
RUN npm run build -- --configuration production

# Etapa 2: Servir app con Nginx
FROM nginx:alpine

# Copiar configuración de Nginx (opcional si tienes una personalizada)
COPY --from=build /app/dist/benef-fornt /usr/share/nginx/html

# Exponer el puerto
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
