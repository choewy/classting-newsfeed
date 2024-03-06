import { Type } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export class Validator {
  static check<T extends object>(Cls: Type<T>, o: Partial<T>) {
    const instance = plainToInstance(Cls, o, {
      enableImplicitConversion: true,
      enableCircularCheck: true,
    });

    const errors = validateSync(instance, { stopAtFirstError: true });
    return errors.shift() ?? null;
  }
}
