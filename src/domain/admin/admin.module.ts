import { AdminRepository } from '@common/repositories';
import { TypeOrmExModule } from '@core/typeorm';
import { Module } from '@nestjs/common';

import { AdminInterceptor } from './admin.interceptor';

const AdminTypeOrmModule = TypeOrmExModule.forFeature([AdminRepository]);

@Module({
  imports: [AdminTypeOrmModule],
  exports: [AdminTypeOrmModule],
  providers: [AdminInterceptor],
})
export class AdminModule {}
