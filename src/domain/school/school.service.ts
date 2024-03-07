import { AlreadyExistSchoolException, AlreadyHasSchoolException } from '@common/implements';
import { AdminRepository, SchoolRepository } from '@common/repositories';
import { Injectable } from '@nestjs/common';

import { CreateSchoolCommand } from './commands';
import { SchoolDto } from './dtos';

@Injectable()
export class SchoolService {
  constructor(private readonly adminRepository: AdminRepository, private readonly schoolRepository: SchoolRepository) {}

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
