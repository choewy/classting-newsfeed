import { Module } from '@nestjs/common';

import { AuthModule } from './auth';
import { SchoolModule } from './school';

@Module({
  imports: [AuthModule, SchoolModule],
})
export class DomainModule {}
