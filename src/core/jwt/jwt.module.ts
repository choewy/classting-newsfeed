import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtExModuleAsyncOptions, JwtStrategyConfig } from './interfaces';
import { JwtGuard } from './jwt.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({})
export class JwtExModule {
  static registerAsync(options: JwtExModuleAsyncOptions): DynamicModule {
    const providers = [
      {
        ...options,
        provide: JwtStrategy,
        useFactory(jwtStrategyConfig: JwtStrategyConfig) {
          return new JwtStrategy(jwtStrategyConfig);
        },
      },
      JwtService,
      JwtGuard,
    ];

    return {
      module: JwtExModule,
      imports: [PassportModule, JwtModule.registerAsync(options)],
      providers: providers,
      exports: providers,
      global: true,
    };
  }
}
