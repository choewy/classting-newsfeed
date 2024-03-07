import { SchoolRepository, StudentRepository, SubscribeRepository } from '@common/repositories';
import { TypeOrmExModule } from '@core/typeorm';
import { Module } from '@nestjs/common';

import { SubscribeController } from './subscribe.controller';
import { SubscribeService } from './subscribe.service';

@Module({
  imports: [TypeOrmExModule.forFeature([SchoolRepository, StudentRepository, SubscribeRepository])],
  controllers: [SubscribeController],
  providers: [SubscribeService],
})
export class SubscribeModule {}
