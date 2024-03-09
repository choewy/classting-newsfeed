import { SchoolNewsRepository } from '@apps/student/common/repositories';
import { NewsFeedListDto } from '@apps/student/feed/dtos';
import { FeedService } from '@apps/student/feed/feed.service';
import { GetSchoolNewsFeedListQuery } from '@apps/student/feed/queries';
import { TestingFixture, TestingRepository } from '@libs/testing';
import { Test, TestingModule } from '@nestjs/testing';

describe(FeedService.name, () => {
  let module: TestingModule;
  let service: FeedService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [FeedService, TestingRepository.mock(SchoolNewsRepository)],
    }).compile();

    service = module.get(FeedService);
  });

  it('FeedService의 인스턴스가 정의되어야 한다.', () => {
    expect(service).toBeDefined();
  });

  describe('getSchoolNewsFeedList', () => {
    const query = TestingFixture.of(GetSchoolNewsFeedListQuery, { skip: 0, take: 10 });

    it('뉴스피드 목록을 조회하면 NewsFeedListDto을 반환한다.', () => {
      jest.spyOn(module.get(SchoolNewsRepository), 'findManyAndCountByStudent').mockResolvedValue([[], 0]);

      expect(service.getSchoolNewsFeedList(1, query)).resolves.toBeInstanceOf(NewsFeedListDto);
    });
  });
});
