import { ConfigExModule } from '@core/config';
import { HealthExModule } from '@core/health';
import { JwtExModule } from '@core/jwt';
import { TypeOrmExModule } from '@core/typeorm';
import { Module } from '@nestjs/common';

import { AdminModule } from './admin';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtConfigService, TypeOrmConfigService } from './config';
import { DomainModule } from './domain';

@Module({
  imports: [
    ConfigExModule.forRoot([TypeOrmConfigService, JwtConfigService]),
    TypeOrmExModule.forRootAsync({
      inject: [TypeOrmConfigService],
      useFactory(typeOrmConfigService: TypeOrmConfigService) {
        return typeOrmConfigService.getModuleOptions();
      },
    }),
    JwtExModule.registerAsync({
      inject: [JwtConfigService],
      useFactory(jwtConfigService: JwtConfigService) {
        return jwtConfigService.getModuleOptions();
      },
    }),
    HealthExModule,
    DomainModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
