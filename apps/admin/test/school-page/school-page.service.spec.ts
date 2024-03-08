import { SchoolPageRepository } from '@apps/admin/common/repositories';
import { CreateSchoolPageCommand, UpdateSchoolPageCommand } from '@apps/admin/school-page/commands';
import { SchoolPageDto } from '@apps/admin/school-page/dtos';
import { SchoolPageService } from '@apps/admin/school-page/school-page.service';
import { SchoolPageEntity } from '@libs/entity';
import { TestingFixture, TestingRepository } from '@libs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
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

  it('SchoolPageService가 정의되어 있어야 한다.', () => {
    expect(service).toBeDefined();
  });

  describe('getSchoolPage', () => {
    it('SchoolPage가 존재하지 않으면 NotFoundException을 던진다.', () => {
      jest.spyOn(module.get(SchoolPageRepository), 'findOneByAdminId').mockResolvedValue(null);

      expect(service.getSchoolPage(1)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('SchoolPage가 존재하면 SchoolPageDto을 반환한다.', () => {
      jest.spyOn(module.get(SchoolPageRepository), 'findOneByAdminId').mockResolvedValue(TestingFixture.of(SchoolPageEntity));

      expect(service.getSchoolPage(1)).resolves.toBeInstanceOf(SchoolPageDto);
    });
  });

  describe('createSchoolPage', () => {
    const command = TestingFixture.of(CreateSchoolPageCommand, {
      name: 'My School Page',
      location: 'Korea Seoul',
    });

    it('관리자의 SchoolPage가 이미 존재하면 ConflictException를 던진다.', () => {
      jest.spyOn(module.get(SchoolPageRepository), 'existsByAdminId').mockResolvedValue(true);

      expect(service.createSchoolPage(1, command)).rejects.toBeInstanceOf(ConflictException);
    });

    it('관리자의 SchoolPage가 생성되면 SchoolPageDto를 반환한다.', () => {
      jest.spyOn(module.get(SchoolPageRepository), 'existsByAdminId').mockResolvedValue(false);
      jest.spyOn(module.get(SchoolPageRepository), 'createOne').mockResolvedValue(TestingFixture.of(SchoolPageEntity));

      expect(service.createSchoolPage(1, command)).resolves.toBeInstanceOf(SchoolPageDto);
    });
  });

  describe('updateSchoolPage', () => {
    const command = TestingFixture.of(UpdateSchoolPageCommand, {
      name: 'My School Page',
      location: 'Korea Seoul',
    });

    it('관리자의 SchoolPage가 존재하지 않으면 NotFoundException를 던진다.', () => {
      jest.spyOn(module.get(SchoolPageRepository), 'findOneByAdminId').mockResolvedValue(null);

      expect(service.updateSchoolPage(1, command)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('관리자의 SchoolPage 정보 수정이 완료되면 SchoolPageDto를 반환한다.', () => {
      jest.spyOn(module.get(SchoolPageRepository), 'findOneByAdminId').mockResolvedValue(TestingFixture.of(SchoolPageEntity));
      jest.spyOn(module.get(SchoolPageRepository), 'save').mockResolvedValue(TestingFixture.of(SchoolPageEntity));

      expect(service.createSchoolPage(1, command)).resolves.toBeInstanceOf(SchoolPageDto);
    });
  });

  describe('deleteSchoolPage', () => {
    it('관리자의 SchoolPage가 존재하지 않으면 NotFoundException를 던진다.', () => {
      jest.spyOn(module.get(SchoolPageRepository), 'existsByAdminId').mockResolvedValue(false);

      expect(service.deleteSchoolPage(1)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('관리자의 SchoolPage가 삭제되면 아무것도 반환하지 않는다.', () => {
      jest.spyOn(module.get(SchoolPageRepository), 'existsByAdminId').mockResolvedValue(true);
      jest.spyOn(module.get(SchoolPageRepository), 'deleteByAdminId').mockResolvedValue({ raw: [], affected: 1 });

      expect(service.deleteSchoolPage(1)).resolves.toBeUndefined();
    });
  });
});
