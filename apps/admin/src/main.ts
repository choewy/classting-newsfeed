import { createBootstrap } from '@libs/bootstrap';
import { WinstonLogger } from '@libs/logger';
import { DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await createBootstrap(AppModule, {
    logger: WinstonLogger.create('admin'),
    swagger: new DocumentBuilder().setTitle('Classting Admin APIs').addBearerAuth(),
  });

  await app.listen(4000);
}

bootstrap();
