# promotions-ts

Este sistema está diseñado para validar promociones de teleservicios. Incluye las siguientes funcionalidades principales:

- **Login de usuarios**: Permite la autenticación de usuarios para acceder al sistema.
- **Validador de bonos**: Verifica y valida los bonos asociados a las promociones.
- **Conexión al API de consultas.pe**: Se conecta al servicio externo para realizar consultas relacionadas con las promociones.

## Requisitos

- **PostgreSQL**: Versión 17.
- **Node.js**: Versión 22.14.0.
- **npm**: Versión 10.9.2.

## Migraciones de la Base de Datos

Para gestionar las migraciones de la base de datos, utiliza los siguientes comandos:

1. Ejecutar las migraciones:
   ```bash
   npx sequelize-cli db:migrate
   ```

2. Insertar datos iniciales (seeders):
   ```bash
   npx sequelize-cli db:seed:all
   ```

3. Revertir todas las migraciones:
   ```bash
   npx sequelize-cli db:migrate:undo:all
   ```

## Notas

- Asegúrate de configurar correctamente el archivo `config.json` de Sequelize para conectar con tu base de datos PostgreSQL.
- Este sistema utiliza la versión 17 de PostgreSQL, por lo que es importante que tu entorno esté configurado con esta versión para evitar problemas de compatibilidad.
