import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtAuthStrategy } from './strategies/jwt-auth.strategy';
import { JwtConfigReturnType } from '../configs';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return configService.get<JwtConfigReturnType>('jwt').access;
      },
    }),
    PassportModule,
  ],
  providers: [JwtAuthStrategy, JwtAuthGuard],
  exports: [JwtAuthStrategy, JwtAuthGuard],
})
export class AuthModule {}
