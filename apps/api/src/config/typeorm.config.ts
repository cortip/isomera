import { registerAs } from '@nestjs/config'
import { config as dotenvConfig } from 'dotenv'
import { join } from 'path'
import { DataSource, DataSourceOptions } from 'typeorm'

dotenvConfig({ path: '.env' })

const config = {
  type: 'postgres',
  host: `${String(process.env.DATABASE_HOST)}`,
  port: `${String(process.env.DATABASE_PORT)}`,
  username: `${String(process.env.DATABASE_USERNAME)}`,
  password: `${String(process.env.DATABASE_PASSWORD)}`,
  database: `${String(process.env.DATABASE_NAME)}`,
  // entities: ['dist/**/*.entity{.ts,.js}'],
  // migrations: ['dist/migrations/*{.ts,.js}'],

  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, '**', '*.migration.{ts,js}')],
  autoLoadEntities: true,
  synchronize: false
}

export const typeormConfig = registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions)

export default connectionSource
