import { ExceptionResponseDto } from '@common/implements';
import { ArgumentsHost, Catch, HttpException, InternalServerErrorException, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

@Catch()
export class AppFilter extends BaseExceptionFilter {
  catch(e: Error | HttpException, host: ArgumentsHost): void {
    let exception = e as HttpException;

    if (e instanceof HttpException === false) {
      exception = new InternalServerErrorException(e);
      Logger.error(e);
    } else {
      Logger.warn(e);
    }

    host.switchToHttp().getResponse<Response>().status(exception.getStatus()).send(new ExceptionResponseDto(exception));
  }
}
