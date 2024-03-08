import { TypeOrmLibsModule } from '@libs/typeorm';
import { Module } from '@nestjs/common';

import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { SchoolNewsRepository } from '../common/repositories/school-news.repository';
import { SchoolPageRepository } from '../common/repositories/school-page.repository';
import { SubscriptionRepository } from '../common/repositories/subscription.repository';

@Module({
  imports: [TypeOrmLibsModule.forFeature([SubscriptionRepository, SchoolPageRepository, SchoolNewsRepository])],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
