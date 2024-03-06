import { Type } from '@nestjs/common';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

import { JwtStrategyConfigService } from './jwt-strategy-config-service.interface';

export interface JwtExModuleAsyncOptions extends Omit<JwtModuleAsyncOptions, 'inject'> {
  inject: [Type<JwtStrategyConfigService>];
}
