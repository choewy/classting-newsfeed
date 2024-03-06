import { AccountType } from '@common/constants';
import { AccountEntity } from '@common/entities';
import { SigninCommand, SignupCommand } from '@domain/auth/commands';
import { hashSync } from 'bcrypt';
import { plainToInstance } from 'class-transformer';

export class AuthFixture {
  static readonly Admin = plainToInstance(
    AccountEntity,
    {
      id: 1,
      email: 'user@example.com',
      password: hashSync('password', 10),
      admin: { id: 1 },
      student: null,
    },
    { enableCircularCheck: true, enableImplicitConversion: true },
  );

  static readonly Student = plainToInstance(
    AccountEntity,
    {
      id: 1,
      email: 'user@example.com',
      password: hashSync('password', 10),
      admin: null,
      student: { id: 1 },
    },
    { enableCircularCheck: true, enableImplicitConversion: true },
  );

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
