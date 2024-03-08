import { NestFactory } from '@nestjs/core';

import { InitializerModule } from './initializer.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(InitializerModule);
  await app.close();
}

bootstrap();
