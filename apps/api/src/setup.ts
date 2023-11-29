import { ValidationPipe, HttpStatus, INestApplication } from '@nestjs/common'
import { useContainer } from 'class-validator'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import connectPgSimple from 'connect-pg-simple'
import { AppModule } from './app/app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import helmet from 'helmet'
import passport from 'passport'

export function setup(app: INestApplication): INestApplication {
  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)
  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production' ? undefined : false,
      crossOriginEmbedderPolicy:
        process.env.NODE_ENV === 'production' ? undefined : false
    })
  )

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    })
  )

  app.use(cookieParser(process.env.APP_SECRET))

  app.use(
    session({
      secret: process.env.APP_SECRET as string,
      resave: false,
      saveUninitialized: false,
      store:
        process.env.NODE_ENV === 'production'
          ? new (connectPgSimple(session))()
          : new session.MemoryStore(),
      cookie: {
        httpOnly: true,
        signed: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
      }
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())

  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(/\s*,\s*/) ?? '*',
    credentials: true,
    exposedHeaders: ['Authorization']
  })

  const config = new DocumentBuilder()
    .setTitle('Isomera')
    .setDescription('API router')
    .setVersion('1.0')
    .addTag('base')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)

  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  return app
}
