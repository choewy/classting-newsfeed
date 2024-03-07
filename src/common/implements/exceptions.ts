import { BadRequestException, ConflictException, ForbiddenException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class ValidationException extends BadRequestException {
  constructor(errors: ValidationError[]) {
    super();

    const error = errors.shift();

    if (error) {
      this.message = Object.values(error.constraints).shift();
    }
  }
}

export class AlreadyExistAccountException extends ConflictException {}
export class NotSamePasswordsException extends BadRequestException {}
export class WrongEmailOrPasswordException extends UnauthorizedException {}
export class AlreadyHasSchoolException extends ConflictException {}
export class AlreadyExistSchoolException extends ConflictException {}
export class NotFoundSchoolNewsException extends NotFoundException {}
export class RequriedSchoolExistException extends NotFoundException {}
export class CannotAccessShoolNewsException extends ForbiddenException {}
export class NotFoundStudentException extends NotFoundException {}
export class NotFoundSchoolException extends NotFoundException {}
