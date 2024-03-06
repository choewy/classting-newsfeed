import { AdminEntity } from '@common/entities';
import { AlreadyExistSchoolException, AlreadyHasSchoolException } from '@common/implements';
import { SchoolRepository } from '@common/repositories';
import { Injectable } from '@nestjs/common';

import { CreateSchoolCommand } from './commands';
import { SchoolDto } from './dtos';

@Injectable()
export class SchoolService {
  constructor(private readonly schoolRepository: SchoolRepository) {}

  async createSchool(admin: AdminEntity, command: CreateSchoolCommand) {
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

  async createSchoolNews() {
    return;
  }

  async updateSchoolNews(id: bigint) {
    return;
  }

  async deleteSchoolNews(id: bigint) {
    return;
  }
}
