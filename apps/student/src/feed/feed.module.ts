import { TypeOrmLibsModule } from '@libs/typeorm';
import { Module } from '@nestjs/common';

import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { SchoolNewsRepository } from '../repositories/school-news.repository';
import { SubscriptionRepository } from '../repositories/subscription.repository';

@Module({
  imports: [TypeOrmLibsModule.forFeature([SchoolNewsRepository, SubscriptionRepository])],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
