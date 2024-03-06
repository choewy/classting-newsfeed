import { ConfigExModule } from '@core/config';
import { TypeOrmExModule } from '@core/typeorm';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigService } from './config';

@Module({
  imports: [
    ConfigExModule.forRoot(),
    TypeOrmExModule.forRootAsync({
      imports: [ConfigExModule.forFeature([TypeOrmConfigService])],
      inject: [TypeOrmConfigService],
      useFactory(typeOrmConfigService: TypeOrmConfigService) {
        return typeOrmConfigService.getModuleOptions();
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
