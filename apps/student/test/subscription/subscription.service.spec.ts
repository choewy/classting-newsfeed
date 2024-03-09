import { SchoolNewsRepository, SchoolPageRepository, SubscriptionRepository } from '@apps/student/common/repositories';
import { SubscribedSchoolNewsListDto, SubscribedSchoolPageListDto } from '@apps/student/subscription/dtos';
import { GetSubscribedSchoolNewsListQuery, GetSubscribedSchoolPageListQuery } from '@apps/student/subscription/queries';
import { SubscriptionService } from '@apps/student/subscription/subscription.service';
import { SubscriptionEntity } from '@libs/entity';
import { TestingFixture, TestingRepository } from '@libs/testing';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DeleteResult } from 'typeorm';

describe(SubscriptionService.name, () => {
  let module: TestingModule;
  let service: SubscriptionService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        SubscriptionService,
        TestingRepository.mock(SchoolPageRepository),
        TestingRepository.mock(SchoolNewsRepository),
        TestingRepository.mock(SubscriptionRepository),
      ],
    }).compile();

    service = module.get(SubscriptionService);
  });

  it('SubscriptionService의 인스턴스가 정의되어야 한다.', () => {
    expect(service).toBeDefined();
  });

  describe('getSubscribedSchoolPageList', () => {
    const query = TestingFixture.of(GetSubscribedSchoolPageListQuery, { skip: 0, take: 10 });

    it('구독 중인 SchoolPage 목록을 조회하면 SubscribedSchoolPageListDto를 반환한다.', () => {
      jest.spyOn(module.get(SubscriptionRepository), 'findManyAndCount').mockResolvedValue([[], 0]);

      expect(service.getSubscribedSchoolPageList(1, query)).resolves.toBeInstanceOf(SubscribedSchoolPageListDto);
    });
  });

  describe('getSubscribedSchoolNewsList', () => {
    const query = TestingFixture.of(GetSubscribedSchoolNewsListQuery, { skip: 0, take: 10 });

    it('존재하지 않는 SchoolPage의 News를 조회 시 NotFoundException을 던진다.', () => {
      jest.spyOn(module.get(SchoolPageRepository), 'existsById').mockResolvedValue(false);

      expect(service.getSubscribedSchoolNewsList(1, 1, query)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('구독 중이지 않은 SchoolPage의 News를 조회 시 ForbiddenException을 던진다.', () => {
      jest.spyOn(module.get(SchoolPageRepository), 'existsById').mockResolvedValue(true);
      jest.spyOn(module.get(SubscriptionRepository), 'existsByStudentAndSchoolPage').mockResolvedValue(false);

      expect(service.getSubscribedSchoolNewsList(1, 1, query)).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('구독 중인 SchoolPage의 News 목록 조회에 성공하면 SubscribedSchoolNewsListDto를 반환한다.', () => {
      jest.spyOn(module.get(SchoolPageRepository), 'existsById').mockResolvedValue(true);
      jest.spyOn(module.get(SubscriptionRepository), 'existsByStudentAndSchoolPage').mockResolvedValue(true);
      jest.spyOn(module.get(SchoolNewsRepository), 'findManyAndCountBySchoolPage').mockResolvedValue([[], 0]);

      expect(service.getSubscribedSchoolNewsList(1, 1, query)).resolves.toBeInstanceOf(SubscribedSchoolNewsListDto);
    });
  });

  describe('subscribeSchoolPage', () => {
    let deleteOne: jest.SpyInstance<Promise<DeleteResult>, [studentId: number, schoolPageId: number]>;
    let insertAndIncreaseCount: jest.SpyInstance<Promise<void>, [studentId: number, schoolPageId: number]>;

    beforeEach(() => {
      if (deleteOne) {
        deleteOne.mockClear();
      }

      if (insertAndIncreaseCount) {
        insertAndIncreaseCount.mockClear();
      }

      deleteOne = jest.spyOn(module.get(SubscriptionRepository), 'deleteOne').mockResolvedValue({ affected: 1, raw: {} });
      insertAndIncreaseCount = jest.spyOn(module.get(SubscriptionRepository), 'insertAndIncreaseCount').mockResolvedValue(undefined);
    });

    it('존재하지 않는 SchoolPage를 구독하면 NotFoundException을 던진다.', () => {
      jest.spyOn(module.get(SchoolPageRepository), 'existsById').mockResolvedValue(false);

      expect(service.subscribeSchoolPage(1, 1)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('이미 구독 중인 SchoolPage를 구독하면 즉시 함수 실행을 종료한다.', async () => {
      jest.spyOn(module.get(SchoolPageRepository), 'existsById').mockResolvedValue(true);
      jest
        .spyOn(module.get(SubscriptionRepository), 'findOneByStudentAndSchoolPage')
        .mockResolvedValue(TestingFixture.of(SubscriptionEntity, { status: true }));

      const result = await service.subscribeSchoolPage(1, 1);

      expect(result).toBeUndefined();
      expect(deleteOne).toHaveReturnedTimes(0);
      expect(insertAndIncreaseCount).toHaveReturnedTimes(0);
    });

    it('구독 취소한 SchoolPage를 구독하면 SubscriptionEntity을 삭제 후 추가한다.', async () => {
      jest.spyOn(module.get(SchoolPageRepository), 'existsById').mockResolvedValue(true);
      jest
        .spyOn(module.get(SubscriptionRepository), 'findOneByStudentAndSchoolPage')
        .mockResolvedValue(TestingFixture.of(SubscriptionEntity, { status: false }));

      const result = await service.subscribeSchoolPage(1, 1);

      expect(result).toBeUndefined();
      expect(deleteOne).toHaveBeenCalledTimes(1);
      expect(insertAndIncreaseCount).toHaveBeenCalledTimes(1);
    });

    it('구독 취소한 적 없는 SchoolPage를 구독하면 SubscriptionEntity을 삭제 과정 없이 추가한다.', async () => {
      jest.spyOn(module.get(SchoolPageRepository), 'existsById').mockResolvedValue(true);
      jest.spyOn(module.get(SubscriptionRepository), 'findOneByStudentAndSchoolPage').mockResolvedValue(null);

      const result = await service.subscribeSchoolPage(1, 1);

      expect(result).toBeUndefined();
      expect(deleteOne).toHaveBeenCalledTimes(0);
      expect(insertAndIncreaseCount).toHaveBeenCalledTimes(1);
    });
  });

  describe('unsubscribeSchoolPage', () => {
    let updateAndDecreaseCount: jest.SpyInstance<Promise<void>, [studentId: number, schoolPageId: number]>;

    beforeEach(() => {
      if (updateAndDecreaseCount) {
        updateAndDecreaseCount.mockClear();
      }

      updateAndDecreaseCount = jest.spyOn(module.get(SubscriptionRepository), 'updateAndDecreaseCount').mockResolvedValue(undefined);
    });

    it('존재하지 않는 SchoolPage 구독을 취소하면 NotFoundException을 던진다.', () => {
      jest.spyOn(module.get(SchoolPageRepository), 'existsById').mockResolvedValue(false);

      expect(service.unsubscribeSchoolPage(1, 1)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('구독한 적 없는 SchoolPage 구독을 취소하면 즉시 함수 실행을 종료한다.', async () => {
      jest.spyOn(module.get(SchoolPageRepository), 'existsById').mockResolvedValue(true);
      jest.spyOn(module.get(SubscriptionRepository), 'findOneByStudentAndSchoolPage').mockResolvedValue(null);

      const result = await service.unsubscribeSchoolPage(1, 1);

      expect(result).toBeUndefined();
      expect(updateAndDecreaseCount).toHaveBeenCalledTimes(0);
    });

    it('이미 구독 취소한 SchoolPage 구독을 취소하면 즉시 함수 실행을 종료한다.', async () => {
      jest.spyOn(module.get(SchoolPageRepository), 'existsById').mockResolvedValue(true);
      jest
        .spyOn(module.get(SubscriptionRepository), 'findOneByStudentAndSchoolPage')
        .mockResolvedValue(TestingFixture.of(SubscriptionEntity, { status: false }));

      const result = await service.unsubscribeSchoolPage(1, 1);

      expect(result).toBeUndefined();
      expect(updateAndDecreaseCount).toHaveBeenCalledTimes(0);
    });

    it('구독 중인 SchoolPage 구독을 취소하면 SubscriptionEntity의 status를 false로 변경한다.', async () => {
      jest.spyOn(module.get(SchoolPageRepository), 'existsById').mockResolvedValue(true);
      jest
        .spyOn(module.get(SubscriptionRepository), 'findOneByStudentAndSchoolPage')
        .mockResolvedValue(TestingFixture.of(SubscriptionEntity, { status: true }));

      const result = await service.unsubscribeSchoolPage(1, 1);

      expect(result).toBeUndefined();
      expect(updateAndDecreaseCount).toHaveBeenCalledTimes(1);
    });
  });
});
