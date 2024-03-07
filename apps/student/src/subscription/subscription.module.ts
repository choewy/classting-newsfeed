import { TypeOrmLibsModule } from '@libs/typeorm';
import { Module } from '@nestjs/common';

import { SchoolPageRepository } from './repositories/school-page.repository';
import { StudentRepository } from './repositories/student.repository';
import { SubscriptionRepository } from './repositories/subscription.repository';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';

@Module({
  imports: [TypeOrmLibsModule.forFeature([StudentRepository, SchoolPageRepository, SubscriptionRepository])],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
