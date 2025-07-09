# Install package
Run `npm install`

# Run api
Run `npm run start`

# Rename file `.env.example` to `.env`

# DB Migrations example
Run `cd backend/modules/core`

Run `npx sequelize-cli db:migrate --config=../../configs/config.json`

## Migration Skeleton
Run `npx sequelize-cli migration:generate --name {file_name}`

## Create Model
`npx sequelize-cli model:generate --name User --attributes realName:string,address:string --models-path=../models`

# Running seed all
`npx sequelize-cli db:seed:all --config=../../configs/config.json --debug`

# Running seed with file name
`npx sequelize-cli db:seed --seed {file_name} --config=../../configs/config.json --debug`

# Run jwt keygen
`npm run keygen-jwt`

