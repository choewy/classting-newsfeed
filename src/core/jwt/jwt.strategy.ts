import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from 'jsonwebtoken';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtStrategyConfigService } from './interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(jwtStrategyConfigService: JwtStrategyConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtStrategyConfigService.getSecretOrKey(),
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    return payload;
  }
}
