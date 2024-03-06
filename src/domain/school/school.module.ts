import { SchoolRepository } from '@common/repositories';
import { TypeOrmExModule } from '@core/typeorm';
import { AdminModule } from '@domain/admin';
import { Module } from '@nestjs/common';

import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';

@Module({
  imports: [AdminModule, TypeOrmExModule.forFeature([SchoolRepository])],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
