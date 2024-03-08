import { TypeOrmLibsModule } from '@libs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtAuthStrategy } from './strategies/jwt-auth.strategy';
import { JwtConfigReturnType } from '../configs';
import { StudentRepository } from '../repositories/student.repository';

@Module({
  imports: [
    PassportModule,
    TypeOrmLibsModule.forFeature([StudentRepository]),
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
