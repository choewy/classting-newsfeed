import { ArgumentsHost, Catch, HttpException, InternalServerErrorException, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';

@Catch()
export class AppFilter extends BaseExceptionFilter {
  catch(e: Error | HttpException, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const req = http.getRequest<Request>();
    const log = {
      method: req.method,
      path: req.path,
      params: req.params,
      query: req.query,
      status: -1,
      message: '',
      ip: req.ip,
      xforwaredfor: req.header['x-forwared-for'],
      context: req['context'],
      handler: req['handler'],
      error: undefined,
      exception: undefined,
    };

    let exception = e as HttpException;

    if (e instanceof HttpException === false) {
      exception = new InternalServerErrorException();
      exception.cause = { name: e.name, message: e.message };

      log.status = 500;
      log.message = exception.name;
      log.exception = exception;
      log.error = {
        name: e.name,
        message: e.message,
        stack: e.stack,
      };

      Logger.error(log);
    } else {
      log.status = e.getStatus();
      log.message = exception.name;
      log.exception = e;

      Logger.warn(log);
    }

    host.switchToHttp().getResponse<Response>().status(exception.getStatus()).send({
      name: exception.name,
      message: exception.message,
      statusCode: exception.getStatus(),
      error: exception.cause,
    });
  }
}
