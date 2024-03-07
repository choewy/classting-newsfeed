import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const ReqAdmin = createParamDecorator(
  (_, context: ExecutionContext): number | null => context.switchToHttp().getRequest().user?.admin ?? null,
);
