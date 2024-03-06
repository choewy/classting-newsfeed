import { AccountType } from '@common/constants';
import { AdminEntity, StudentEntity } from '@common/entities';
import { AlreadyExistAccountException, NotSamePasswordsException, WrongEmailOrPasswordException } from '@common/implements';
import { AccountRepository } from '@common/repositories';
import { JwtConfigService } from '@config/jwt-config.service';
import { AuthService } from '@domain/auth/auth.service';
import { TokensDto } from '@domain/auth/dtos';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Mock } from '@utils/mock';

import { AuthFixture } from './auth.fixture';

describe('AuthService', () => {
  let module: TestingModule;
  let service: AuthService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [Mock.ConfigService(JwtConfigService), Mock.Repository(AccountRepository), JwtService, AuthService],
    }).compile();

    service = module.get(AuthService);

    const accountRepository = module.get(AccountRepository);
    jest.spyOn(accountRepository, 'createAccountAsAdmin').mockResolvedValue(AuthFixture.Admin);
    jest.spyOn(accountRepository, 'createAccountAsStudent').mockResolvedValue(AuthFixture.Student);

    const jwtConfigService = module.get(JwtConfigService);
    jest.spyOn(jwtConfigService, 'getAccessSignOptions').mockReturnValue({ secret: 'secret', expiresIn: '1h' });
    jest.spyOn(jwtConfigService, 'getRefreshSignOptions').mockReturnValue({ secret: 'secret', expiresIn: '14d' });
  });

  describe('createAccountByType', () => {
    it('type이 admin인 경우 AdminEntity 계정을 생성한다.', async () => {
      const command = AuthFixture.SignupCommand(AccountType.Admin);
      const account = await service.createAccountByType(command);

      expect(account.admin).toBeInstanceOf(AdminEntity);
      expect(account.student).toBeNull();
    });

    it('type이 student인 경우 StudentEntity 계정을 생성한다.', async () => {
      const command = AuthFixture.SignupCommand(AccountType.Student);
      const account = await service.createAccountByType(command);

      expect(account.student).toBeInstanceOf(StudentEntity);
      expect(account.admin).toBeNull();
    });
  });

  describe('signup', () => {
    it('이메일 계정이 이미 존재하는 경우 AlreadyExistAccountException을 던진다.', () => {
      jest.spyOn(module.get(AccountRepository), 'hasByEmail').mockResolvedValue(true);

      const command = AuthFixture.SignupCommand(AccountType.Admin);
      expect(service.signup(command)).rejects.toBeInstanceOf(AlreadyExistAccountException);
    });

    it('password와 confirmPassword가 같지 않은 경우 NotSamePasswordsException을 던진다.', () => {
      jest.spyOn(module.get(AccountRepository), 'hasByEmail').mockResolvedValue(false);

      const command = AuthFixture.SignupCommand(AccountType.Admin, { confirmPassword: 'confirmPassword' });
      expect(service.signup(command)).rejects.toBeInstanceOf(NotSamePasswordsException);
    });

    it('회원가입에 성공하면 TokensDto를 반환한다.', () => {
      const command = AuthFixture.SignupCommand(AccountType.Admin);
      expect(service.signup(command)).resolves.toBeInstanceOf(TokensDto);
    });
  });

  describe('signin', () => {
    it('등록된 이메일 계정이 없으면 WrongEmailOrPasswordException을 던진다.', () => {
      jest.spyOn(module.get(AccountRepository), 'findByEmail').mockResolvedValue(null);

      const command = AuthFixture.SigninCommand();
      expect(service.signin(command)).rejects.toBeInstanceOf(WrongEmailOrPasswordException);
    });

    it('비밀번호가 틀리면 WrongEmailOrPasswordException을 던진다.', () => {
      jest.spyOn(module.get(AccountRepository), 'findByEmail').mockResolvedValue(AuthFixture.Admin);

      const command = AuthFixture.SigninCommand({ password: 'wrong password' });
      expect(service.signin(command)).rejects.toBeInstanceOf(WrongEmailOrPasswordException);
    });

    it('로그인에 성공하면 TokensDto를 반환한다.', () => {
      jest.spyOn(module.get(AccountRepository), 'findByEmail').mockResolvedValue(AuthFixture.Admin);

      const command = AuthFixture.SigninCommand();
      expect(service.signin(command)).resolves.toBeInstanceOf(TokensDto);
    });
  });
});
