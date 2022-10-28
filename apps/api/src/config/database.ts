import { join } from 'path';
import { PostgresConnectionOptions, } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { DataSource } from 'typeorm';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

export const dbConfigPg = (): PostgresConnectionOptions => ({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: Number(process.env.TYPEORM_PORT),
  synchronize: false,
  entities: [join(__dirname, '../**/entities/*.entity.ts')],
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
});

export const dbConfigDev = (): SqliteConnectionOptions => ({
  type: 'sqlite',
  database: 'isomera_dev',
  entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  dropSchema: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,
  logging: true,
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
});

export default new DataSource(dbConfigPg());
