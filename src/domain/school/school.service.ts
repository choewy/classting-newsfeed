import { AlreadyExistSchoolException, AlreadyHasSchoolException, RequriedSchoolExistException } from '@common/implements';
import { AdminRepository, SchoolNewsRepository, SchoolRepository } from '@common/repositories';
import { Injectable } from '@nestjs/common';

import { CreateSchoolCommand, CreateSchoolNewsCommand } from './commands';
import { SchoolDto, SchoolNewsDto } from './dtos';

@Injectable()
export class SchoolService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly schoolRepository: SchoolRepository,
    private readonly schoolNewsRepository: SchoolNewsRepository,
  ) {}

  async createSchool(adminId: number, command: CreateSchoolCommand) {
    const admin = await this.adminRepository.findByIdWithSchool(adminId);

    if (admin.school) {
      throw new AlreadyHasSchoolException();
    }

    if (await this.schoolRepository.existsByNameAndLocation(command.name, command.location)) {
      throw new AlreadyExistSchoolException();
    }

    const school = await this.schoolRepository.createSchool(admin, {
      name: command.name,
      location: command.location,
    });

    return new SchoolDto(school);
  }

  async createSchoolNews(adminId: number, command: CreateSchoolNewsCommand) {
    const admin = await this.adminRepository.findByIdWithSchool(adminId);

    if (admin.school === null) {
      throw new RequriedSchoolExistException();
    }

    const schoolNews = await this.schoolNewsRepository.createSchoolNews(admin, {
      title: command.title,
      contents: command.contents,
    });

    return new SchoolNewsDto(schoolNews);
  }

  async updateSchoolNews(id: bigint) {
    return;
  }

  async deleteSchoolNews(id: bigint) {
    return;
  }
}
