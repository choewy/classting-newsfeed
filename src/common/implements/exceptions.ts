import { BadRequestException, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';

export class AlreadyExistAccountException extends ConflictException {}
export class NotSamePasswordsException extends BadRequestException {}
export class WrongEmailOrPasswordException extends UnauthorizedException {}
export class AlreadyHasSchoolException extends ConflictException {}
export class AlreadyExistSchoolException extends ConflictException {}
export class NotFoundSchoolNewsException extends NotFoundException {}
