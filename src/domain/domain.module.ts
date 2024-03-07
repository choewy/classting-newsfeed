import { Module } from '@nestjs/common';

import { AuthModule } from './auth';
import { SchoolModule } from './school';
import { SubscribeModule } from './subsribe';

@Module({
  imports: [AuthModule, SchoolModule, SubscribeModule],
})
export class DomainModule {}
