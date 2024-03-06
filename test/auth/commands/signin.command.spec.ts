import { SigninCommand } from '@domain/auth/commands';
import { Validator } from '@utils/validator';
import { ValidationError } from 'class-validator';

describe('SigninCommand', () => {
  it('email 형식에 맞지 않는 경우 ValidationError가 발생한다.', () => {
    const error = Validator.check(SigninCommand, {
      email: 'hello@world',
    });

    expect(error).toBeInstanceOf(ValidationError);
    expect(error.property).toBe('email');
    expect(Object.hasOwn(error.constraints, 'isEmail')).toBe(true);
  });

  it('password의 길이가 8보다 작으면 ValidationError가 발생한다.', () => {
    const error = Validator.check(SigninCommand, {
      email: 'user@example.com',
      password: new Array(7).fill('@').join(''),
    });

    expect(error).toBeInstanceOf(ValidationError);
    expect(error.property).toBe('password');
    expect(Object.hasOwn(error.constraints, 'isLength')).toBe(true);
  });

  it('password의 길이가 50보다 크면 ValidationError가 발생한다.', () => {
    const error = Validator.check(SigninCommand, {
      email: 'user@example.com',
      password: new Array(51).fill('@').join(''),
    });

    expect(error).toBeInstanceOf(ValidationError);
    expect(error.property).toBe('password');
    expect(Object.hasOwn(error.constraints, 'isLength')).toBe(true);
  });

  it('위의 모든 조건을 충족하면 ValdiationError가 발생하지 않는다.', () => {
    const error = Validator.check(SigninCommand, {
      email: 'user@example.com',
      password: new Array(10).fill('@').join(''),
    });

    expect(error).toBeNull();
  });
});
