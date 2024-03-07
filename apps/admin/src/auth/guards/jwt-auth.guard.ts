import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(e: Error, payload: any, info: Error): TUser {
    let error = e ?? info;

    if (error || payload == null) {
      if (error?.name !== TokenExpiredError.name) {
        error = new JsonWebTokenError(error.message);
      }

      throw new UnauthorizedException(error);
    }

    return payload ?? null;
  }
}
