import { BadRequestException, ConflictException } from '@nestjs/common';

export class AlreadyExistsAccountException extends ConflictException {}
export class NotSamePasswordsException extends BadRequestException {}
