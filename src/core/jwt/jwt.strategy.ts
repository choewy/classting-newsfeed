import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from 'jsonwebtoken';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtStrategyConfig } from './interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(jwtStrategyConfig: JwtStrategyConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtStrategyConfig.getSecretOrKey(),
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    return payload;
  }
}
