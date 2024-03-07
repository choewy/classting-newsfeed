import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const ReqStudent = createParamDecorator(
  (_, context: ExecutionContext): number | null => context.switchToHttp().getRequest().user?.student ?? null,
);
