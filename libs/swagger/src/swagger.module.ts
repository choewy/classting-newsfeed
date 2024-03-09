import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerLibsModule {
  static builder(title: string) {
    return new DocumentBuilder().setTitle(title).addBearerAuth();
  }

  static setup(path: string, app: INestApplication, title: string) {
    SwaggerModule.setup(path, app, SwaggerModule.createDocument(app, this.builder(title).build()));
  }
}
