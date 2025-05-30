#!/bin/sh
set -e

echo "⏳ Esperando a que Postgres esté listo…"
timeout=60
while ! pg_isready -h db -p 5432 > /dev/null 2>&1; do
  sleep 1
  timeout=$((timeout - 1))
  if [ $timeout -le 0 ]; then
    echo "❌ Timeout esperando a Postgres"
    exit 1
  fi
done
echo "✅ Postgres listo."

echo "🚀 Ejecutando migraciones…"
npx sequelize-cli db:migrate

echo "🌱 Insertando datos iniciales…"
npx sequelize-cli db:seed:all

echo "▶️ Iniciando la aplicación…"
exec npm start
