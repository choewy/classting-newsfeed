import { AccountRepository } from '@common/repositories';
import { TypeOrmExModule } from '@core/typeorm';
import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmExModule.forFeature([AccountRepository])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
