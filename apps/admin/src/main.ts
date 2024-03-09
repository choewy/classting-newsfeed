import { createBootstrapOptions } from '@libs/bootstrap';
import { WinstonLogger } from '@libs/logger';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = WinstonLogger.create('admin');
  const builder = new DocumentBuilder().setTitle('Classting Admin APIs').addBearerAuth().build();

  const app = await NestFactory.create(AppModule, { logger });

  SwaggerModule.setup('swagger', app, SwaggerModule.createDocument(app, builder));

  const options = createBootstrapOptions(app);

  app.useGlobalFilters(...options.filters);
  app.useGlobalPipes(...options.pipes);
  app.useGlobalInterceptors(...options.interceptors);

  await app.listen(4000);
}

bootstrap();
