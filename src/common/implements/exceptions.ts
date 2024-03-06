import { BadRequestException, ConflictException, UnauthorizedException } from '@nestjs/common';

export class AlreadyExistsAccountException extends ConflictException {}
export class NotSamePasswordsException extends BadRequestException {}
export class WrongEmailOrPasswordException extends UnauthorizedException {}
