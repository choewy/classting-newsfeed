import { ValidationException } from '@common/implements';
import { WinstonLogger } from '@core/logger';
import { SwaggerExModule } from '@core/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

import { AppFilter } from './app.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const appName = 'NewsFeed';
  const appLogger = WinstonLogger.create(appName);
  const app = await NestFactory.create(AppModule, { logger: appLogger });

  SwaggerExModule.setup(app);

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
        enableCircularCheck: true,
      },
      exceptionFactory(errors) {
        throw new ValidationException(errors);
      },
    }),
  );

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      enableImplicitConversion: true,
      enableCircularCheck: true,
    }),
  );

  app.useGlobalFilters(new AppFilter());

  await app.listen(4000);
}

bootstrap();
