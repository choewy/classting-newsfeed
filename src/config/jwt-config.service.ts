import { AbstractConfigService } from '@core/config';
import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class JwtConfigService extends AbstractConfigService {
  private readonly JWT_ACCESS_SECRET = this.configService.get<string>('JWT_ACCESS_SECRET');
  private readonly JWT_REFRESH_SECRET = this.configService.get<string>('JWT_REFRESH_SECRET');

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
