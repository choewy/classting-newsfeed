import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule, JwtModuleAsyncOptions, JwtService } from '@nestjs/jwt';

@Module({})
export class JwtExModule {
  static registerAsync(options: JwtModuleAsyncOptions): DynamicModule {
    return {
      imports: [JwtModule.registerAsync(options)],
      module: JwtExModule,
      providers: [JwtService],
      exports: [JwtService],
      global: true,
    };
  }
}
