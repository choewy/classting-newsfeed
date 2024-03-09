import { createBootstrapOptions } from '@libs/bootstrap';
import { WinstonLogger } from '@libs/logger';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = WinstonLogger.create('student');
  const app = await NestFactory.create(AppModule, { logger });

  const builder = new DocumentBuilder().setTitle('Classting Student APIs').addBearerAuth();
  const document = SwaggerModule.createDocument(app, builder.build());

  SwaggerModule.setup('swagger', app, document);

  const options = createBootstrapOptions(app);

  app.useGlobalFilters(...options.filters);
  app.useGlobalPipes(...options.pipes);
  app.useGlobalInterceptors(...options.interceptors);

  await app.listen(4001);
}

bootstrap();
