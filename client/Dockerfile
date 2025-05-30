# Etapa 1: Build
FROM node:22.14.0-alpine as build

# Directorio de trabajo
WORKDIR /app

# Copiamos package.json y package-lock.json
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos todo el código
COPY . .

# Build de producción de Vite
RUN npm run build

# Etapa 2: NGINX
FROM nginx:stable-alpine

# Copiamos la build generada al directorio público de nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiamos una configuración personalizada de nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exponemos el puerto 80
EXPOSE 80

# Comando por defecto de nginx
CMD ["nginx", "-g", "daemon off;"]
