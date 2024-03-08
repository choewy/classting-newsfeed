import { SchoolNewsRepository, SchoolPageRepository } from '@apps/admin/common/repositories';
import { CreateSchoolNewsCommad, UpdateSchoolNewsCommad } from '@apps/admin/school-news/commands';
import { SchoolNewsDto, SchoolNewsListDto } from '@apps/admin/school-news/dtos';
import { GetSchoolNewsListQuery } from '@apps/admin/school-news/queries';
import { SchoolNewsService } from '@apps/admin/school-news/school-news.service';
import { SchoolNewsEntity, SchoolPageEntity } from '@libs/entity';
import { TestingFixture, TestingRepository } from '@libs/testing';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe(SchoolNewsService.name, () => {
  let module: TestingModule;
  let service: SchoolNewsService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [SchoolNewsService, TestingRepository.mock(SchoolPageRepository), TestingRepository.mock(SchoolNewsRepository)],
    }).compile();

    service = module.get(SchoolNewsService);
  });

  it('SchoolNewsService 인스턴스가 정의되어 있어야 한다.', () => {
    expect(service).toBeDefined();
  });

  describe('getSchoolNewsList', () => {
    const query = TestingFixture.of(GetSchoolNewsListQuery, { skip: 0, take: 10 });

    it('관리자가 SchoolPage를 생성하지 않았다면 NotFoundException을 던진다.', () => {
      jest.spyOn(module.get(SchoolPageRepository), 'findOneByAdminId').mockResolvedValue(null);

      expect(service.getSchoolNewsList(1, query)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('관리자 SchoolPage의 News 목록 조회에 성공하면 SchoolNewsListDto를 반환한다.', () => {
      jest.spyOn(module.get(SchoolPageRepository), 'findOneByAdminId').mockResolvedValue(TestingFixture.of(SchoolPageEntity));
      jest.spyOn(module.get(SchoolNewsRepository), 'findManyAndCountBySchoolPageId').mockResolvedValue([[], 0]);

      expect(service.getSchoolNewsList(1, query)).resolves.toBeInstanceOf(SchoolNewsListDto);
    });
  });

  describe('createSchoolNews', () => {
    const command = TestingFixture.of(CreateSchoolNewsCommad, { title: 'News', contents: 'News Contents', hidden: false });

    it('관리자가 SchoolPage를 생성하지 않았다면 NotFoundException을 던진다.', () => {
      jest.spyOn(module.get(SchoolPageRepository), 'findOneByAdminId').mockResolvedValue(null);

      expect(service.createSchoolNews(1, command)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('관리자가 SchoolPage에 새로운 News 발행에 성공했다면 SchoolNewsDto를 반환한다.', () => {
      jest.spyOn(module.get(SchoolPageRepository), 'findOneByAdminId').mockResolvedValue(TestingFixture.of(SchoolPageEntity));
      jest.spyOn(module.get(SchoolNewsRepository), 'insertOne').mockResolvedValue(TestingFixture.of(SchoolNewsEntity));

      expect(service.createSchoolNews(1, command)).resolves.toBeInstanceOf(SchoolNewsDto);
    });
  });

  describe('updateSchoolNews', () => {
    const command = TestingFixture.of(UpdateSchoolNewsCommad, { title: 'News', contents: 'News Contents', hidden: false });

    it('관리자가 SchoolPage를 생성하지 않았다면 NotFoundException을 던진다.', () => {
      jest.spyOn(module.get(SchoolPageRepository), 'findOneByAdminId').mockResolvedValue(null);

      expect(service.updateSchoolNews(1, 1, command)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('수정하려는 News가 존재하지 않는다면 NotFoundException을 던진다.', () => {
      jest.spyOn(module.get(SchoolPageRepository), 'findOneByAdminId').mockResolvedValue(TestingFixture.of(SchoolPageEntity));
      jest.spyOn(module.get(SchoolNewsRepository), 'findOneById').mockResolvedValue(null);

      expect(service.updateSchoolNews(1, 1, command)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('수정하려는 News가 관리자의 SchoolPage에 해당하는 News가 아니라면 ForbiddenException을 반환한다.', () => {
      jest.spyOn(module.get(SchoolPageRepository), 'findOneByAdminId').mockResolvedValue(TestingFixture.of(SchoolPageEntity, { id: 1 }));
      jest
        .spyOn(module.get(SchoolNewsRepository), 'findOneById')
        .mockResolvedValue(TestingFixture.of(SchoolNewsEntity, { schoolPage: TestingFixture.of(SchoolPageEntity, { id: 2 }) }));

      expect(service.updateSchoolNews(1, 1, command)).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('관리자가 발행한 News의 수정이 완료되면 SchoolNewsDto을 반환한다.', () => {
      jest.spyOn(module.get(SchoolPageRepository), 'findOneByAdminId').mockResolvedValue(TestingFixture.of(SchoolPageEntity, { id: 1 }));
      jest
        .spyOn(module.get(SchoolNewsRepository), 'findOneById')
        .mockResolvedValue(TestingFixture.of(SchoolNewsEntity, { schoolPage: TestingFixture.of(SchoolPageEntity, { id: 1 }) }));
      jest.spyOn(module.get(SchoolNewsRepository), 'updateOne').mockResolvedValue(TestingFixture.of(SchoolNewsEntity));

      expect(service.updateSchoolNews(1, 1, command)).resolves.toBeInstanceOf(SchoolNewsDto);
    });
  });

  describe('deleteSchoolNews', () => {
    it('관리자가 SchoolPage를 생성하지 않았다면 NotFoundException을 던진다.', () => {
      jest.spyOn(module.get(SchoolPageRepository), 'findOneByAdminId').mockResolvedValue(null);

      expect(service.deleteSchoolNews(1, 1)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('삭제하려는 News가 존재하지 않는다면 NotFoundException을 던진다.', () => {
      jest.spyOn(module.get(SchoolPageRepository), 'findOneByAdminId').mockResolvedValue(TestingFixture.of(SchoolPageEntity));
      jest.spyOn(module.get(SchoolNewsRepository), 'findOneById').mockResolvedValue(null);

      expect(service.deleteSchoolNews(1, 1)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('삭제하려는 News가 관리자의 SchoolPage에 해당하는 News가 아니라면 ForbiddenException을 반환한다.', () => {
      jest.spyOn(module.get(SchoolPageRepository), 'findOneByAdminId').mockResolvedValue(TestingFixture.of(SchoolPageEntity, { id: 1 }));
      jest
        .spyOn(module.get(SchoolNewsRepository), 'findOneById')
        .mockResolvedValue(TestingFixture.of(SchoolNewsEntity, { schoolPage: TestingFixture.of(SchoolPageEntity, { id: 2 }) }));

      expect(service.deleteSchoolNews(1, 1)).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('관리자가 발행한 News의 삭제가 완료되면 아무것도 반환하지 않는다.', () => {
      jest.spyOn(module.get(SchoolPageRepository), 'findOneByAdminId').mockResolvedValue(TestingFixture.of(SchoolPageEntity, { id: 1 }));
      jest
        .spyOn(module.get(SchoolNewsRepository), 'findOneById')
        .mockResolvedValue(TestingFixture.of(SchoolNewsEntity, { schoolPage: TestingFixture.of(SchoolPageEntity, { id: 1 }) }));
      jest.spyOn(module.get(SchoolNewsRepository), 'delete').mockResolvedValue({ affected: 1, raw: {} });

      expect(service.deleteSchoolNews(1, 1)).resolves.toBeUndefined();
    });
  });
});
