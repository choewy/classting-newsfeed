import { CallHandler, ExecutionContext, HttpStatus, Logger, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { tap } from 'rxjs';

export class AppInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    context.switchToHttp().getRequest().context = context.getClass()?.name;
    context.switchToHttp().getRequest().handler = context.getHandler()?.name;

    return next.handle().pipe(
      tap(() => {
        const http = context.switchToHttp();
        const req = http.getRequest<Request>();
        const res = http.getResponse<Response>();

        const status = Object.entries(HttpStatus).find(([_, v]) => v === res.statusCode);

        Logger.verbose({
          method: req.method,
          path: req.path,
          params: req.params,
          query: req.query,
          status: status?.[1],
          message: status?.[0],
          ip: req.ip,
          xforwaredfor: req.header['x-forwared-for'],
          context: req['context'],
          handler: req['handler'],
        });
      }),
    );
  }
}
