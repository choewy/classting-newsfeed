import { HttpExceptionErrorDto, HttpExceptionDto } from '@libs/bootstrap';
import { HttpException, Type, applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiResponseProperty } from '@nestjs/swagger';

class ApiExceptionErrorType implements HttpExceptionErrorDto {
  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String })
  message: string;
}

class ApiExceptionType implements HttpExceptionDto {
  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String })
  message: string;

  @ApiResponseProperty({ type: Number })
  statusCode: number;

  @ApiResponseProperty({ type: ApiExceptionErrorType })
  error: ApiExceptionErrorType;
}

export const ApiException = (...Exceptions: Type<HttpException>[]) => {
  const maps: Record<string, string[]> = {};

  for (const Exception of Exceptions) {
    const e = new Exception();

    const status = String(e.getStatus());
    const name = `\`${e.name}\``;

    if (maps[status]) {
      maps[status].push(name);
    } else {
      maps[status] = [name];
    }
  }

  const decorators: MethodDecorator[] = [];

  for (const [status, names] of Object.entries(maps)) {
    decorators.push(
      ApiResponse({
        type: ApiExceptionType,
        status: Number(status),
        description: names.join('\n'),
      }),
    );
  }

  return applyDecorators(...decorators);
};
