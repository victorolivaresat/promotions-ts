#!/bin/sh
set -e

echo "⏳ Esperando a que Postgres esté listo…"
until pg_isready -h db -p 5432 > /dev/null 2>&1; do
  sleep 1
done
echo "✅ Postgres listo."

echo "🚀 Ejecutando migraciones…"
npx sequelize-cli db:migrate

echo "🌱 Insertando datos iniciales…"
npx sequelize-cli db:seed:all

echo "▶️ Iniciando la aplicación…"
exec npm start
