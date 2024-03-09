import { SchoolPageRepository } from '@apps/student/common/repositories';
import { SchoolPageListDto } from '@apps/student/school-page/dtos';
import { GetSchoolPageListQuery } from '@apps/student/school-page/queries';
import { SchoolPageService } from '@apps/student/school-page/school-page.service';
import { SchoolPageEntity, SubscriptionEntity } from '@libs/entity';
import { TestingFixture, TestingRepository } from '@libs/testing';
import { Test, TestingModule } from '@nestjs/testing';

describe(SchoolPageService.name, () => {
  let module: TestingModule;
  let service: SchoolPageService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [SchoolPageService, TestingRepository.mock(SchoolPageRepository)],
    }).compile();

    service = module.get(SchoolPageService);
  });

  it('SchoolPageService의 인스턴스가 정의되어 있어야 한다.', () => {
    expect(service).toBeDefined();
  });

  describe('getSchoolPageList', () => {
    const query = TestingFixture.of(GetSchoolPageListQuery, { skip: 0, take: 0 });

    it('SchoolPage 목록 조회 시 SchoolPageListDto를 반환한다.', () => {
      jest.spyOn(module.get(SchoolPageRepository), 'findManyAndCount').mockResolvedValue([[], 1]);

      expect(service.getSchoolPageList(null, query)).resolves.toBeInstanceOf(SchoolPageListDto);
    });

    it('비로그인 상태에서 SchoolPage 목록 조회 시 subscription은 false이어야 한다.', async () => {
      jest
        .spyOn(module.get(SchoolPageRepository), 'findManyAndCount')
        .mockResolvedValue([[TestingFixture.of(SchoolPageEntity, { subscription: null })], 1]);

      const dto = await service.getSchoolPageList(null, query);

      expect(dto).toBeInstanceOf(SchoolPageListDto);
      expect(dto.rows.length).toBe(1);
      expect(dto.rows[0].subscription).toBe(false);
    });

    it('로그인 상태에서 SchoolPage 목록 조회 시 구독 중인 SchoolPage의 subscription은 true이어야 한다.', async () => {
      jest
        .spyOn(module.get(SchoolPageRepository), 'findManyAndCount')
        .mockResolvedValue([[TestingFixture.of(SchoolPageEntity, { subscription: TestingFixture.of(SubscriptionEntity) })], 1]);

      const dto = await service.getSchoolPageList(null, query);

      expect(dto).toBeInstanceOf(SchoolPageListDto);
      expect(dto.rows.length).toBe(1);
      expect(dto.rows[0].subscription).toBe(true);
    });
  });
});
