import { createBootstrapOptions } from '@libs/bootstrap';
import { WinstonLogger } from '@libs/logger';
import { SwaggerLibsModule } from '@libs/swagger';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = WinstonLogger.create('student');
  const app = await NestFactory.create(AppModule, { logger });

  SwaggerLibsModule.setup('swagger', app, 'Classting Student APIs');

  const options = createBootstrapOptions(app);

  app.useGlobalFilters(...options.filters);
  app.useGlobalPipes(...options.pipes);
  app.useGlobalInterceptors(...options.interceptors);

  await app.listen(4001);
}

bootstrap();
