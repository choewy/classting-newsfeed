import { TypeOrmLibsModule } from '@libs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeormConfig } from './configs';
import { InitializerService } from './initializer.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [TypeormConfig] }),
    TypeOrmLibsModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return configService.get('typeorm');
      },
    }),
  ],
  providers: [InitializerService],
})
export class InitializerModule {}
