import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { DataSource } from 'typeorm';

export const dbConfigPg = (): PostgresConnectionOptions => ({
  type: process.env.TYPEORM_DRIVER as never,
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: Number(process.env.TYPEORM_PORT),
  synchronize: false,
  entities: [join(__dirname, '../**/entities/*.entity.ts')],
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')]
});

export const dbConfigDev = () => ({
  type: process.env.TYPEORM_DRIVER as never,
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: Number(process.env.TYPEORM_PORT),
  synchronize: process.env.TYPEORM_SYNCRONIZE === 'true',
  entities: [join(__dirname, '../**/entities/*.entity.ts')],
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')]
});

export default new DataSource(dbConfigPg());
