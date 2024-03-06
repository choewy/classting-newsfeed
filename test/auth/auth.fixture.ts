import { AccountType } from '@common/constants';
import { AccountEntity, AdminEntity, StudentEntity } from '@common/entities';
import { SigninCommand, SignupCommand } from '@domain/auth/commands';
import { hashSync } from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { DeepPartial } from 'typeorm';

export class AuthFixture {
  static AdminAccount(replaceValues?: DeepPartial<AdminEntity>) {
    return plainToInstance(
      AccountEntity,
      {
        id: 1,
        email: 'user@example.com',
        password: hashSync('password', 10),
        admin: { id: 1 },
        student: null,
        ...replaceValues,
      },
      { enableCircularCheck: true, enableImplicitConversion: true },
    );
  }

  static StudentAccount(replaceValues?: DeepPartial<StudentEntity>) {
    return plainToInstance(
      AccountEntity,
      {
        id: 1,
        email: 'user@example.com',
        password: hashSync('password', 10),
        admin: null,
        student: { id: 1 },
        ...replaceValues,
      },
      { enableCircularCheck: true, enableImplicitConversion: true },
    );
  }

  static SignupCommand(type: AccountType, replaceValues?: Partial<SignupCommand>) {
    return {
      type,
      name: 'user',
      email: 'user@example.com',
      password: 'password',
      confirmPassword: 'password',
      ...replaceValues,
    };
  }

  static SigninCommand(replaceValues?: Partial<SigninCommand>) {
    return {
      email: 'user@example.com',
      password: 'password',
      ...replaceValues,
    };
  }
}
