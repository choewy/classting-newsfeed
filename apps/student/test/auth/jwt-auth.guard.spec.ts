import { JwtAuthGuard } from '@apps/student/auth';
import { TestingFixture } from '@libs/testing';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';

const ctx = { getClass: () => null, getHandler: () => null } as ExecutionContext;

describe(JwtAuthGuard.name, () => {
  let module: TestingModule;
  let guard: JwtAuthGuard;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [Reflector, JwtAuthGuard],
    }).compile();

    guard = module.get(JwtAuthGuard);
  });

  it('JwtAuthGuard의 인스턴스가 정의되어 있어야 한다.', () => {
    expect(guard).toBeDefined();
  });

  describe('handleRequest(throwError)', () => {
    beforeAll(() => {
      jest.spyOn(module.get(Reflector), 'getAllAndOverride').mockReturnValue(undefined);
    });

    it('JWT 토큰이 유효하지 않으면 UnauthorizedException을 던진다.', () => {
      expect(async () => guard.handleRequest(null, {}, new Error(), ctx)).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('JWT 토큰의 Payload가 null이면 UnauthorizedException을 던진다.', () => {
      expect(async () => guard.handleRequest(null, null, null, ctx)).rejects.toBeInstanceOf(UnauthorizedException);
    });
  });

  describe('handleRequest(ignoreError)', () => {
    beforeAll(() => {
      jest.spyOn(module.get(Reflector), 'getAllAndOverride').mockReturnValue(true);
    });

    it('JWT 토큰이 유효하지 않음에도 불구하고 ignoreError 상태이면 Payload(null)를 반환한다.', () => {
      expect(guard.handleRequest(null, null, TestingFixture.of(Error), ctx)).toBeNull();
    });

    it('JWT 토큰의 Payload가 null임에도 불구하고 ignoreError 상태이면 Payload(null)를 반환한다.', () => {
      expect(guard.handleRequest(null, null, null, ctx)).toBeNull();
    });
  });
});
