import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError } from 'jsonwebtoken';

import { IGNORE_JWT_AUTH_GUARD_ERROR } from '../decorators/ignore-jwt-auth-guard-error';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  handleRequest<TUser = any>(e: Error, payload: any, info: Error, ctx: ExecutionContext): TUser {
    const ignoreError = this.reflector.getAllAndOverride<boolean>(IGNORE_JWT_AUTH_GUARD_ERROR, [ctx.getClass(), ctx.getHandler()]);

    let error = e ?? info;

    if (error) {
      if (ignoreError === true) {
        return payload ?? null;
      }

      if (error?.name !== TokenExpiredError.name) {
        error = new JsonWebTokenError(error.message);
      }

      throw new UnauthorizedException(error);
    }

    if (payload == null) {
      if (ignoreError === true) {
        return payload ?? null;
      }

      throw new UnauthorizedException();
    }

    return payload ?? null;
  }
}
