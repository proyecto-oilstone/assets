## Backend
Run migrations: 
- ./node_modules/.bin/sequelize db:migrate --env config

Create migrations: 
- docker exec -it assets_oilstone-backend_1 bash
- sequelize migration:create --name (migration name)