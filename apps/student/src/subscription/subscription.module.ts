import { TypeOrmLibsModule } from '@libs/typeorm';
import { Module } from '@nestjs/common';

import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { SchoolPageRepository, SchoolNewsRepository, SubscriptionRepository } from '../common/repositories';

@Module({
  imports: [TypeOrmLibsModule.forFeature([SubscriptionRepository, SchoolPageRepository, SchoolNewsRepository])],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
