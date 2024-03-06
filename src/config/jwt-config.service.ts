import { AbstractConfigService } from '@core/config';
import { JwtStrategyConfig } from '@core/jwt';
import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class JwtConfigService extends AbstractConfigService implements JwtStrategyConfig {
  private readonly JWT_ACCESS_SECRET = this.configService.get<string>('JWT_ACCESS_SECRET');
  private readonly JWT_REFRESH_SECRET = this.configService.get<string>('JWT_REFRESH_SECRET');

  getSecretOrKey() {
    return this.JWT_ACCESS_SECRET;
  }

  getModuleOptions(): JwtModuleOptions {
    return {
      secret: this.JWT_ACCESS_SECRET,
      signOptions: this.getAccessSignOptions(),
    };
  }

  getAccessSignOptions(): JwtSignOptions {
    return {
      secret: this.JWT_ACCESS_SECRET,
      expiresIn: '1h',
    };
  }

  getRefreshSignOptions(): JwtSignOptions {
    return {
      secret: this.JWT_REFRESH_SECRET,
      expiresIn: '14d',
    };
  }
}
