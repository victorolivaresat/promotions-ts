FROM node:22.14.0-alpine

# En desarrollo instalamos todo (incluye sequelize-cli)
ENV NODE_ENV=development
WORKDIR /app

COPY package*.json ./

# 1) Instala deps de Node y el cliente de Postgres
RUN npm ci \
 && apk add --no-cache postgresql-client

COPY . .

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 5000
ENTRYPOINT ["/entrypoint.sh"]
