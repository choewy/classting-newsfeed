import { WinstonLogger } from '@core/logger';
import { SwaggerExModule } from '@core/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

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
    }),
  );

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      enableImplicitConversion: true,
      enableCircularCheck: true,
    }),
  );

  await app.listen(4000);
}

bootstrap();
