import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const ReqUser = createParamDecorator((_, ctx: ExecutionContext): number | null => ctx.switchToHttp().getRequest().user?.id ?? null);
