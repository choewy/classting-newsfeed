import { AlreadyExistSchoolException, AlreadyHasSchoolException, RequriedSchoolExistException } from '@common/implements';
import { AdminRepository, SchoolNewsRepository, SchoolRepository } from '@common/repositories';
import { SchoolDto, SchoolNewsDto } from '@domain/school/dtos';
import { SchoolService } from '@domain/school/school.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Mock } from '@utils/mock';

import { SchoolFixture } from './school.fixture';

describe('SchoolService', () => {
  let module: TestingModule;
  let service: SchoolService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        Mock.Repository(AdminRepository),
        Mock.Repository(SchoolRepository),
        Mock.Repository(SchoolNewsRepository),
        SchoolService,
      ],
    }).compile();

    service = module.get(SchoolService);
  });

  it('schoolService to be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createSchool', () => {
    it('관리자가 이미 학교 페이지를 생성한 경우 AlreadyHasSchoolException를 던진다.', () => {
      jest.spyOn(module.get(AdminRepository), 'findByIdWithSchool').mockResolvedValue(SchoolFixture.Admin({ school: { id: 1 } }));

      const command = SchoolFixture.CreateSchoolCommand();

      expect(service.createSchool(1, command)).rejects.toBeInstanceOf(AlreadyHasSchoolException);
    });

    it('같은 이름, 같은 지역의 학교가 이미 존재하는 경우 AlreadyExistSchoolException를 던진다.', () => {
      jest.spyOn(module.get(AdminRepository), 'findByIdWithSchool').mockResolvedValue(SchoolFixture.Admin({ school: null }));
      jest.spyOn(module.get(SchoolRepository), 'existsByNameAndLocation').mockResolvedValue(true);

      const command = SchoolFixture.CreateSchoolCommand();

      expect(service.createSchool(1, command)).rejects.toBeInstanceOf(AlreadyExistSchoolException);
    });

    it('학교 페이지가 생성되면 SchoolDto를 반환한다.', () => {
      jest.spyOn(module.get(AdminRepository), 'findByIdWithSchool').mockResolvedValue(SchoolFixture.Admin({ school: null }));
      jest.spyOn(module.get(SchoolRepository), 'existsByNameAndLocation').mockResolvedValue(false);
      jest.spyOn(module.get(SchoolRepository), 'createSchool').mockResolvedValue(SchoolFixture.School());

      const command = SchoolFixture.CreateSchoolCommand();

      expect(service.createSchool(1, command)).resolves.toBeInstanceOf(SchoolDto);
    });
  });

  describe('createSchoolNews', () => {
    it('관리자가 학교를 생성하지 않은 경우 RequriedSchoolExistException을 던진다.', () => {
      jest.spyOn(module.get(AdminRepository), 'findByIdWithSchool').mockResolvedValue(SchoolFixture.Admin({ school: null }));

      const command = SchoolFixture.CreateSchoolNewsCommand();

      expect(service.createSchoolNews(1, command)).rejects.toBeInstanceOf(RequriedSchoolExistException);
    });

    it('학교 소식이 생성되면 SchoolNewsDto를 반환한다.', () => {
      jest.spyOn(module.get(AdminRepository), 'findByIdWithSchool').mockResolvedValue(SchoolFixture.Admin({ school: { id: 1 } }));
      jest.spyOn(module.get(SchoolNewsRepository), 'createSchoolNews').mockResolvedValue(SchoolFixture.SchoolNews());

      const command = SchoolFixture.CreateSchoolNewsCommand();

      expect(service.createSchoolNews(1, command)).resolves.toBeInstanceOf(SchoolNewsDto);
    });
  });
});
