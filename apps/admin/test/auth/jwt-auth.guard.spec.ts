import { JwtAuthGuard } from '@apps/admin/auth';
import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe(JwtAuthGuard.name, () => {
  let module: TestingModule;
  let guard: JwtAuthGuard;

  beforeAll(async () => {
    module = await Test.createTestingModule({ providers: [JwtAuthGuard] }).compile();
    guard = module.get(JwtAuthGuard);
  });

  it('JwtAuthGuard의 인스턴스가 정의되어 있어야 한다.', () => {
    expect(guard).toBeDefined();
  });

  describe('handleRequest', () => {
    it('JWT 토큰이 유효하지 않으면 UnauthorizedException을 던진다.', () => {
      expect(async () => guard.handleRequest(null, {}, new Error())).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('JWT 토큰의 Payload가 null이면 UnauthorizedException을 던진다.', () => {
      expect(async () => guard.handleRequest(null, null, null)).rejects.toBeInstanceOf(UnauthorizedException);
    });
  });
});
