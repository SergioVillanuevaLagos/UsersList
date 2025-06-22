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

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=build /app/dist/benef-fornt /usr/share/nginx/html

# Expose port and start Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
