import { TypeOrmLibsModule } from '@libs/typeorm';
import { Module } from '@nestjs/common';

import { SchoolNewsRepository } from './repositories/school-news.repository';
import { SchoolPageRepository } from './repositories/school-page.repository';
import { SubscriptionRepository } from './repositories/subscription.repository';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';

@Module({
  imports: [TypeOrmLibsModule.forFeature([SubscriptionRepository, SchoolPageRepository, SchoolNewsRepository])],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
