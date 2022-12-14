import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { DataSource } from 'typeorm';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import dotenv from 'dotenv';
import { User } from '../user/entities/user.entity';
import { Profile } from '../user/entities/profile.entity';
import { ConfirmCode } from '../user/entities/confirm-code.entity';

if (process.env.TYPEORM_HOST === undefined) {
  dotenv.config();
}

export const dbConfigPg = (): PostgresConnectionOptions => ({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: Number(process.env.TYPEORM_PORT),
  synchronize: false,
  entities: [join(__dirname, '../**/*.entity.ts'), User, Profile, ConfirmCode],
  migrations: [join(__dirname, '../migrations/*.ts')],
});

export const dbConfigDev = ():
  | SqliteConnectionOptions
  | PostgresConnectionOptions => ({
  ...dbConfigPg(),
  synchronize: true,
});

export default new DataSource(dbConfigPg());
