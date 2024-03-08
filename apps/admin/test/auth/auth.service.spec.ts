import { AuthService } from '@apps/admin/auth/auth.service';
import { SignInCommand, SignUpCommand } from '@apps/admin/auth/commands';
import { JwtTokensDto } from '@apps/admin/auth/dtos';
import { JwtConfigReturnType } from '@apps/admin/common/configs';
import { AdminRepository } from '@apps/admin/common/repositories';
import { AdminEntity } from '@libs/entity';
import { TestingFixture, TestingRepository } from '@libs/testing';
import { BadRequestException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { hashSync } from 'bcrypt';

describe(AuthService.name, () => {
  let module: TestingModule;
  let service: AuthService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [ConfigService, AuthService, JwtService, TestingRepository.mock(AdminRepository)],
    }).compile();

    service = module.get(AuthService);

    jest.spyOn(module.get(ConfigService), 'get').mockReturnValue({
      access: { secret: 'access', signOptions: {} },
      refresh: { secret: 'refresh', signOptions: {} },
    } as JwtConfigReturnType);
  });

  it('AuthService 인스턴스가 정의되어야 한다.', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    const command = TestingFixture.of(SignInCommand, {
      email: 'admin@example.com',
      password: 'password',
    });

    it('관리자 이메일이 존재하지 않는 경우 UnauthorizedException을 던진다.', () => {
      jest.spyOn(module.get(AdminRepository), 'findOneByEmail').mockResolvedValue(null);

      expect(service.signIn(command)).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('관리자 계정의 비밀번호가 일치하지 않는 경우 UnauthorizedException을 던진다.', () => {
      jest
        .spyOn(module.get(AdminRepository), 'findOneByEmail')
        .mockResolvedValue(TestingFixture.of(AdminEntity, { password: hashSync('p@ssW0rd', 10) }));

      expect(service.signIn(command)).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('관리자 로그인에 성공하면 JwtTokensDto를 반환한다.', () => {
      jest
        .spyOn(module.get(AdminRepository), 'findOneByEmail')
        .mockResolvedValue(TestingFixture.of(AdminEntity, { password: hashSync('password', 10) }));

      expect(service.signIn(command)).resolves.toBeInstanceOf(JwtTokensDto);
    });
  });

  describe('signUp', () => {
    const command = TestingFixture.of(SignUpCommand, {
      email: 'admin@example.com',
      name: 'admin',
      password: 'password',
      confirmPassword: 'password',
    });

    it('password와 confirmPassword가 같지 않은 경우 BadRequestException을 던진다.', () => {
      expect(service.signUp({ ...command, confirmPassword: 'confirmPassword' })).rejects.toBeInstanceOf(BadRequestException);
    });

    it('관리자 이메일이 존재하는 경우 ConflictException을 던진다.', () => {
      jest.spyOn(module.get(AdminRepository), 'existsByEmail').mockResolvedValue(true);

      expect(service.signUp(command)).rejects.toBeInstanceOf(ConflictException);
    });

    it('관리자 회원가입에 성공하면 JwtTokensDto를 반환한다.', () => {
      jest.spyOn(module.get(AdminRepository), 'existsByEmail').mockResolvedValue(false);
      jest.spyOn(module.get(AdminRepository), 'insertOne').mockResolvedValue(TestingFixture.of(AdminEntity, { id: 1 }));

      expect(service.signUp(command)).resolves.toBeInstanceOf(JwtTokensDto);
    });
  });
});
