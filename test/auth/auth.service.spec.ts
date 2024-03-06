import { AccountEntity, AdminEntity, StudentEntity } from '@common/entities';
import { AlreadyExistsAccountException, NotSamePasswordsException } from '@common/implements';
import { AccountRepository } from '@common/repositories';
import { JwtConfigService } from '@config/jwt-config.service';
import { AuthService } from '@domain/auth/auth.service';
import { SignupType } from '@domain/auth/commands';
import { TokensDto } from '@domain/auth/dtos';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Mock } from '@utils/mock';
import { plainToInstance } from 'class-transformer';

const adminSignupCommand = {
  type: SignupType.Admin,
  name: 'user',
  email: 'user@example.com',
  password: 'password',
  confirmPassword: 'password',
};

const studentSignupCommand = {
  type: SignupType.Student,
  name: 'user',
  email: 'user@example.com',
  password: 'password',
  confirmPassword: 'password',
};

describe('AuthService', () => {
  let module: TestingModule;
  let service: AuthService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [Mock.ConfigService(JwtConfigService), Mock.Repository(AccountRepository), JwtService, AuthService],
    }).compile();

    service = module.get(AuthService);

    const accountRepository = module.get(AccountRepository);

    jest
      .spyOn(accountRepository, 'createAccountAsAdmin')
      .mockResolvedValue(plainToInstance(AccountEntity, { id: 1, admin: new AdminEntity(), student: null }));

    jest
      .spyOn(accountRepository, 'createAccountAsStudent')
      .mockResolvedValue(plainToInstance(AccountEntity, { id: 1, admin: null, student: new StudentEntity() }));

    const jwtConfigService = module.get(JwtConfigService);

    jest.spyOn(jwtConfigService, 'getAccessSignOptions').mockReturnValue({
      secret: 'jwt-access-secret',
      expiresIn: '1h',
    });

    jest.spyOn(jwtConfigService, 'getRefreshSignOptions').mockReturnValue({
      secret: 'jwt-refresh-secret',
      expiresIn: '14d',
    });
  });

  describe('createAccountByType', () => {
    it('type이 admin인 경우 AdminEntity 계정을 생성한다.', async () => {
      const account = await service.createAccountByType(adminSignupCommand);

      expect(account.admin).toBeInstanceOf(AdminEntity);
      expect(account.student).toBeNull();
    });

    it('type이 student인 경우 StudentEntity 계정을 생성한다.', async () => {
      const account = await service.createAccountByType(studentSignupCommand);

      expect(account.student).toBeInstanceOf(StudentEntity);
      expect(account.admin).toBeNull();
    });
  });

  describe('signup', () => {
    it('이메일 계정이 이미 존재하는 경우 AlreadyExistsAccountException을 던진다.', () => {
      jest.spyOn(module.get(AccountRepository), 'hasByEmail').mockResolvedValue(true);

      expect(service.signup(adminSignupCommand)).rejects.toBeInstanceOf(AlreadyExistsAccountException);
    });
  });

  it('password와 confirmPassword가 같지 않은 경우 NotSamePasswordsException을 던진다.', () => {
    jest.spyOn(module.get(AccountRepository), 'hasByEmail').mockResolvedValue(false);

    expect(service.signup({ ...adminSignupCommand, confirmPassword: 'confirmPassword' })).rejects.toBeInstanceOf(NotSamePasswordsException);
  });

  it('회원가입에 성공하면 TokensDto를 반환한다.', () => {
    expect(service.signup(adminSignupCommand)).resolves.toBeInstanceOf(TokensDto);
  });
});
