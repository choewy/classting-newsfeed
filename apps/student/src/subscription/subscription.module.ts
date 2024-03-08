import { TypeOrmLibsModule } from '@libs/typeorm';
import { Module } from '@nestjs/common';

import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { SchoolNewsRepository } from '../repositories/school-news.repository';
import { SchoolPageRepository } from '../repositories/school-page.repository';
import { SubscriptionRepository } from '../repositories/subscription.repository';

@Module({
  imports: [TypeOrmLibsModule.forFeature([SubscriptionRepository, SchoolPageRepository, SchoolNewsRepository])],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
