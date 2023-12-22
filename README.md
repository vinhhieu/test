# Introduction
Build a web app for signup and login

# Prerequisites
Make sure you have installed all of the following prerequisites on your development machine
* Nodejs
* Reactjs
* Nestjs
* Mysql
* Yarn

# Installation & Configuration
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
  database: 'test',
  entities: [__dirname + '/entities/*.entity{.ts,.js}'],
  synchronize: true,
}
```

4. Start project
```
yarn dev
```
API local will be http://localhost:3000

Frontend: 

1. Back to `root` folder
```
cd ../
```

2. Install packages
```
yarn install
```

3. Change API url from here `src/constant/api.ts` with the same config at backend
```
export const BASE_API_URL = 'http://localhost:3000'
```

4. Start project
```
yarn dev
```

5. Access from web page
```
http://localhost:5173
```
# Testing Your Application

You can run the frontend test with this command
```
yarn test
```
