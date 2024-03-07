import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import { AppFilter } from './app.filter';
import { AppInterceptor } from './app.interceptor';
import { ValidationFailException } from './exceptions';
import { CreateBootstrapOptions } from './interfaces';

export const createBootstrap = async (AppModule: any, options?: CreateBootstrapOptions) => {
  const app = await NestFactory.create(AppModule, { logger: options?.logger });

  if (options.swagger) {
    SwaggerModule.setup('swagger', app, SwaggerModule.createDocument(app, options.swagger.build()));
  }

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
        enableCircularCheck: true,
      },
      exceptionFactory(errors) {
        const message = Object.values(errors.shift().constraints).shift();
        throw new ValidationFailException(message);
      },
    }),
  );

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      enableImplicitConversion: true,
      enableCircularCheck: true,
    }),
    new AppInterceptor(),
  );

  app.useGlobalFilters(new AppFilter());

  return app;
};
