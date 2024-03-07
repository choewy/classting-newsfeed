import {
  AlreadyExistSchoolException,
  AlreadyHasSchoolException,
  CannotAccessShoolNewsException,
  NotFoundSchoolNewsException,
  RequriedSchoolExistException,
} from '@common/implements';
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

    it('학교 소식 생성이 완료되면 SchoolNewsDto를 반환한다.', () => {
      jest.spyOn(module.get(AdminRepository), 'findByIdWithSchool').mockResolvedValue(SchoolFixture.Admin({ school: { id: 1 } }));
      jest.spyOn(module.get(SchoolNewsRepository), 'createSchoolNews').mockResolvedValue(SchoolFixture.SchoolNews());

      const command = SchoolFixture.CreateSchoolNewsCommand();

      expect(service.createSchoolNews(1, command)).resolves.toBeInstanceOf(SchoolNewsDto);
    });
  });

  describe('updateSchoolNews', () => {
    it('관리자가 학교를 생성하지 않은 경우 RequriedSchoolExistException을 던진다.', () => {
      jest.spyOn(module.get(AdminRepository), 'findByIdWithSchool').mockResolvedValue(SchoolFixture.Admin({ school: null }));

      const command = SchoolFixture.UpdateSchoolNewsCommand();

      expect(service.updateSchoolNews(1, BigInt(1), command)).rejects.toBeInstanceOf(RequriedSchoolExistException);
    });

    it('학교 소식이 존재하지 않으면 NotFoundSchoolNewsException을 던진다.', () => {
      jest.spyOn(module.get(AdminRepository), 'findByIdWithSchool').mockResolvedValue(SchoolFixture.Admin({ school: { id: 1 } }));
      jest.spyOn(module.get(SchoolNewsRepository), 'findByIdSchoolAndAdmins').mockResolvedValue(null);

      const command = SchoolFixture.UpdateSchoolNewsCommand();

      expect(service.updateSchoolNews(1, BigInt(1), command)).rejects.toBeInstanceOf(NotFoundSchoolNewsException);
    });

    it('관리자가 다른 학교의 뉴스를 수정하려는 경우 CannotAccessShoolNewsException을 던진다.', () => {
      jest.spyOn(module.get(AdminRepository), 'findByIdWithSchool').mockResolvedValue(SchoolFixture.Admin({ school: { id: 1 } }));
      jest
        .spyOn(module.get(SchoolNewsRepository), 'findByIdSchoolAndAdmins')
        .mockResolvedValue(SchoolFixture.SchoolNews({ school: { id: 2 } }));

      const command = SchoolFixture.UpdateSchoolNewsCommand();

      expect(service.updateSchoolNews(1, BigInt(1), command)).rejects.toBeInstanceOf(CannotAccessShoolNewsException);
    });

    it('학교 소식 수정이 완료되면 SchoolNewsDto를 반환한다.', () => {
      const school = SchoolFixture.School({ id: 1 });
      const writer = SchoolFixture.Admin({ id: 1, school });
      const updater = SchoolFixture.Admin({ id: 2, school });

      jest.spyOn(module.get(AdminRepository), 'findByIdWithSchool').mockResolvedValue(updater);
      jest
        .spyOn(module.get(SchoolNewsRepository), 'findByIdSchoolAndAdmins')
        .mockResolvedValue(SchoolFixture.SchoolNews({ school, writer }));
      jest
        .spyOn(module.get(SchoolNewsRepository), 'updateSchoolNews')
        .mockResolvedValue(SchoolFixture.SchoolNews({ school, writer, updater }));

      const command = SchoolFixture.UpdateSchoolNewsCommand();

      expect(service.updateSchoolNews(1, BigInt(1), command)).resolves.toBeInstanceOf(SchoolNewsDto);
    });
  });
});
