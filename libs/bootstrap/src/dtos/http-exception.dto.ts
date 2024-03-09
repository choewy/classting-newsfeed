import { HttpException } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';

import { HttpExceptionErrorDto } from './http-exception-error.dto';

export class HttpExceptionDto {
  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String })
  message: string;

  @ApiResponseProperty({ type: Number })
  statusCode: number;

  @ApiResponseProperty({ type: HttpExceptionErrorDto })
  error: HttpExceptionErrorDto | null;

  constructor(e: HttpException) {
    this.name = e.name;
    this.message = e.message;
    this.statusCode = e.getStatus();
    this.error = e.cause ? new HttpExceptionErrorDto(e.cause) : null;
  }
}
