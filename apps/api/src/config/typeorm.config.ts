import { registerAs } from '@nestjs/config'
import { config as dotenvConfig } from 'dotenv'
import { join } from 'path'
import { getMetadataArgsStorage } from 'typeorm'

dotenvConfig({ path: '.env' })

console.log(getMetadataArgsStorage().tables)

export const config = {
  type: 'postgres',
  host: `${String(process.env.DATABASE_HOST)}`,
  port: `${String(process.env.DATABASE_PORT)}`,
  username: `${String(process.env.DATABASE_USERNAME)}`,
  password: `${String(process.env.DATABASE_PASSWORD)}`,
  database: `${String(process.env.DATABASE_NAME)}`,
  // entities: ['dist/**/*.entity{.ts,.js}'],
  // migrations: ['dist/migrations/*{.ts,.js}'],

  // entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  // entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
  migrations: [join(__dirname, '..', 'migrations', '*.{ts,js}')],
  autoLoadEntities: true,
  synchronize: false
}

export const typeOrmConfig = registerAs('typeorm', () => config)
