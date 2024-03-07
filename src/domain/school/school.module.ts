import { AdminRepository, SchoolRepository } from '@common/repositories';
import { TypeOrmExModule } from '@core/typeorm';
import { Module } from '@nestjs/common';

import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';

@Module({
  imports: [TypeOrmExModule.forFeature([AdminRepository, SchoolRepository])],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
