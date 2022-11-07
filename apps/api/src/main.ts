import { NestFactory } from '@nestjs/core';

import { setup } from './setup';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setup(app);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
