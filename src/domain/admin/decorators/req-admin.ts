import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const ReqAdmin = createParamDecorator((_, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest().admin;
});
