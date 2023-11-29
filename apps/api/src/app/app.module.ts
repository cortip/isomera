import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { typeOrmConfig } from '../config/typeorm.config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TerminusModule } from '@nestjs/terminus'

@Module({
  imports: [
    TerminusModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          ...configService.get('typeorm'),
          /**
           * This is temporary for development
           */
          logging: 'all',
          logger: 'advanced-console'
        }
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
