import { TypeOrmLibsModule } from '@libs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards';
import { JwtAuthStrategy } from './strategies';
import { JwtConfigReturnType } from '../common/configs';
import { AdminRepository } from '../common/repositories';

@Module({
  imports: [
    PassportModule,
    TypeOrmLibsModule.forFeature([AdminRepository]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return configService.get<JwtConfigReturnType>('jwt').access;
      },
    }),
  ],
  controllers: [AuthController],
  providers: [JwtService, JwtAuthStrategy, JwtAuthGuard, AuthService],
  exports: [JwtAuthStrategy, JwtAuthGuard],
})
export class AuthModule {}
