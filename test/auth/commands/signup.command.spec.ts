import { AccountType } from '@common/constants';
import { SignupCommand } from '@domain/auth/commands';
import { Validator } from '@utils/validator';
import { ValidationError } from 'class-validator';

describe('SignupCommand', () => {
  it('type 값이 없는 경우 ValidationError가 발생한다.', () => {
    const error = Validator.check(SignupCommand, {});

    expect(error).toBeInstanceOf(ValidationError);
    expect(error.property).toBe('type');
    expect(Object.hasOwn(error.constraints, 'isEnum')).toBe(true);
  });

  it('type이 admin 또는 student이 아닌 경우 ValidationError가 발생한다.', () => {
    const error = Validator.check(SignupCommand, {
      type: 'any' as any,
    });

    expect(error).toBeInstanceOf(ValidationError);
    expect(error.property).toBe('type');
    expect(Object.hasOwn(error.constraints, 'isEnum')).toBe(true);
  });

  it('email 형식에 맞지 않는 경우 ValidationError가 발생한다.', () => {
    const error = Validator.check(SignupCommand, {
      type: AccountType.Admin,
      email: 'hello@world',
    });

    expect(error).toBeInstanceOf(ValidationError);
    expect(error.property).toBe('email');
    expect(Object.hasOwn(error.constraints, 'isEmail')).toBe(true);
  });

  it('name의 길이가 1보다 작으면 ValidationError가 발생한다.', () => {
    const error = Validator.check(SignupCommand, {
      type: AccountType.Admin,
      email: 'user@example.com',
      name: '',
    });

    expect(error).toBeInstanceOf(ValidationError);
    expect(error.property).toBe('name');
    expect(Object.hasOwn(error.constraints, 'isLength')).toBe(true);
  });

  it('name의 길이가 10보다 크면 ValidationError가 발생한다.', () => {
    const error = Validator.check(SignupCommand, {
      type: AccountType.Admin,
      email: 'user@example.com',
      name: new Array(11).fill('최').join(''),
    });

    expect(error).toBeInstanceOf(ValidationError);
    expect(error.property).toBe('name');
    expect(Object.hasOwn(error.constraints, 'isLength')).toBe(true);
  });

  it('password의 길이가 8보다 작으면 ValidationError가 발생한다.', () => {
    const error = Validator.check(SignupCommand, {
      type: AccountType.Admin,
      email: 'user@example.com',
      name: 'user',
      password: new Array(7).fill('@').join(''),
    });

    expect(error).toBeInstanceOf(ValidationError);
    expect(error.property).toBe('password');
    expect(Object.hasOwn(error.constraints, 'isLength')).toBe(true);
  });

  it('password의 길이가 50보다 크면 ValidationError가 발생한다.', () => {
    const error = Validator.check(SignupCommand, {
      type: AccountType.Admin,
      email: 'user@example.com',
      name: 'user',
      password: new Array(51).fill('@').join(''),
    });

    expect(error).toBeInstanceOf(ValidationError);
    expect(error.property).toBe('password');
    expect(Object.hasOwn(error.constraints, 'isLength')).toBe(true);
  });

  it('confirmPassword의 길이가 8보다 작으면 ValidationError가 발생한다.', () => {
    const error = Validator.check(SignupCommand, {
      type: AccountType.Admin,
      email: 'user@example.com',
      name: 'user',
      password: new Array(10).fill('@').join(''),
      confirmPassword: new Array(7).fill('@').join(''),
    });

    expect(error).toBeInstanceOf(ValidationError);
    expect(error.property).toBe('confirmPassword');
    expect(Object.hasOwn(error.constraints, 'isLength')).toBe(true);
  });

  it('confirmPassword의 길이가 51보다 크면 ValidationError가 발생한다.', () => {
    const error = Validator.check(SignupCommand, {
      type: AccountType.Admin,
      email: 'user@example.com',
      name: 'user',
      password: new Array(10).fill('@').join(''),
      confirmPassword: new Array(51).fill('@').join(''),
    });

    expect(error).toBeInstanceOf(ValidationError);
    expect(error.property).toBe('confirmPassword');
    expect(Object.hasOwn(error.constraints, 'isLength')).toBe(true);
  });

  it('위의 모든 조건을 충족하면 ValdiationError가 발생하지 않는다.', () => {
    const error = Validator.check(SignupCommand, {
      type: AccountType.Admin,
      email: 'user@example.com',
      name: 'user',
      password: new Array(10).fill('@').join(''),
      confirmPassword: new Array(10).fill('@').join(''),
    });

    expect(error).toBeNull();
  });
});
