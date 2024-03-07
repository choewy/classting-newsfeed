import { HealthLibsModule } from '@libs/health';
import { TypeOrmLibsModule } from '@libs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtConfig, TypeormConfig } from './configs';
import { SchoolNewsModule } from './school-news/school-news.module';
import { SchoolPageModule } from './school-page/school-page.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [TypeormConfig, JwtConfig],
    }),
    TypeOrmLibsModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return configService.get('typeorm');
      },
    }),
    HealthLibsModule,
    AuthModule,
    SchoolPageModule,
    SchoolNewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
