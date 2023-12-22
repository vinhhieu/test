import { DataSource, DataSourceOptions } from 'typeorm'

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

export default new DataSource(config)
