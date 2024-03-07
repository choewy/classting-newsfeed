import { AccountType } from '@common/constants';
import { SET_ACCOUNT_TYPE_MEDATA_KEY } from '@common/decorators';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AccountGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const type = (context.switchToHttp().getRequest().user?.type ?? null) as AccountType | null;
    const accountType = this.reflector.getAllAndOverride<AccountType | null>(SET_ACCOUNT_TYPE_MEDATA_KEY, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (type === accountType) {
      return true;
    }

    throw new ForbiddenException();
  }
}
