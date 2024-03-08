import { AuthService } from '@apps/student/auth/auth.service';
import { SignInCommand, SignUpCommand } from '@apps/student/auth/commands';
import { JwtTokensDto } from '@apps/student/auth/dtos';
import { JwtConfigReturnType } from '@apps/student/common/configs';
import { StudentRepository } from '@apps/student/common/repositories';
import { StudentEntity } from '@libs/entity';
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
      providers: [ConfigService, AuthService, JwtService, TestingRepository.mock(StudentRepository)],
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
      email: 'student@example.com',
      password: 'password',
    });

    it('학생 이메일 계정이 존재하지 않는 경우 UnauthorizedException을 던진다.', () => {
      jest.spyOn(module.get(StudentRepository), 'findOneByEmail').mockResolvedValue(null);

      expect(service.signIn(command)).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('학생 이메일 계정의 비밀번호가 일치하지 않는 경우 UnauthorizedException을 던진다.', () => {
      jest
        .spyOn(module.get(StudentRepository), 'findOneByEmail')
        .mockResolvedValue(TestingFixture.of(StudentEntity, { password: hashSync('p@ssW0rd', 10) }));

      expect(service.signIn(command)).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('학생 이메일 계정 로그인에 성공하면 JwtTokensDto를 반환한다.', () => {
      jest
        .spyOn(module.get(StudentRepository), 'findOneByEmail')
        .mockResolvedValue(TestingFixture.of(StudentEntity, { password: hashSync('password', 10) }));

      expect(service.signIn(command)).resolves.toBeInstanceOf(JwtTokensDto);
    });
  });

  describe('signUp', () => {
    const command = TestingFixture.of(SignUpCommand, {
      email: 'student@example.com',
      name: 'student',
      password: 'password',
      confirmPassword: 'password',
    });

    it('password와 confirmPassword가 같지 않은 경우 BadRequestException을 던진다.', () => {
      expect(service.signUp({ ...command, confirmPassword: 'confirmPassword' })).rejects.toBeInstanceOf(BadRequestException);
    });

    it('학생 이메일 계정이 존재하는 경우 ConflictException을 던진다.', () => {
      jest.spyOn(module.get(StudentRepository), 'existsByEmail').mockResolvedValue(true);

      expect(service.signUp(command)).rejects.toBeInstanceOf(ConflictException);
    });

    it('학생 이메일 계정 회원가입에 성공하면 JwtTokensDto를 반환한다.', () => {
      jest.spyOn(module.get(StudentRepository), 'existsByEmail').mockResolvedValue(false);
      jest.spyOn(module.get(StudentRepository), 'insertOne').mockResolvedValue(TestingFixture.of(StudentEntity, { id: 1 }));

      expect(service.signUp(command)).resolves.toBeInstanceOf(JwtTokensDto);
    });
  });
});
