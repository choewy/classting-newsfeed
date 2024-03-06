import { HttpException } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';

export class ExceptionResponseDto {
  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String })
  message: string;

  @ApiResponseProperty({ type: String })
  error: string | null;

  @ApiResponseProperty({ type: Number })
  statusCode: number;

  constructor(exception: HttpException) {
    this.name = exception.name;
    this.message = exception.message;
    this.statusCode = exception.getStatus();
  }
}
