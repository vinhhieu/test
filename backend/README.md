# Introduction
Build a web app to manage reservations for a restaurant

# Prerequisites
Make sure you have installed all of the following prerequisites on your development machine
* Nodejs
* Nestjs
* Mysql
* Yarn

# Installation & Configuration
Docker:
```
docker-compose up
```

Manual:

Please use yarn instead of npm

Backend: 

1. Move to `backend` folder
```
cd backend
```

2. Install packages
```
yarn install
```

3. Change DB setting inside this file `ormConfig.ts`
```
export const config: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'reservation',
  entities: [__dirname + '/entities/*.entity{.ts,.js}'],
  synchronize: true,
}
```

4. Start project
```
yarn dev
```
API local will be http://localhost:3000

# API list

Create a user: POST /user with body { "name": "Hieu Tran", "email": "abc@example.com", "password": "123456" }

Fetch users: GET /user

Create a reservation: POST /reservation with body { "userId": 1, "bookTime": "2024-10-18 19:30:00" }

Fetch reservations: GET /reservation?page=1&limit=5