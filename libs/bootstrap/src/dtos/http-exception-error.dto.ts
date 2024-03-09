import { ApiResponseProperty } from '@nestjs/swagger';

export class HttpExceptionErrorDto {
  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String })
  message: string;

  constructor(cause: unknown) {
    if (typeof cause === 'object') {
      this.name = cause['name'] ?? null;
      this.message = cause['message'] ?? null;
    }
  }
}
