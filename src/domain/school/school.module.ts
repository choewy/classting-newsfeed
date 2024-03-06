import { SchoolRepository } from '@common/repositories';
import { TypeOrmExModule } from '@core/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmExModule.forFeature([SchoolRepository])],
})
export class SchoolModule {}
