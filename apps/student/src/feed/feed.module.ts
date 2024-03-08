import { TypeOrmLibsModule } from '@libs/typeorm';
import { Module } from '@nestjs/common';

import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { SchoolNewsRepository } from '../common/repositories';

@Module({
  imports: [TypeOrmLibsModule.forFeature([SchoolNewsRepository])],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
