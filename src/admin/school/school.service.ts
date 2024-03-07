import { NotExistSchoolException, NotFoundAdminException } from '@common/implements';
import { AdminRepository, SchoolRepository } from '@common/repositories';
import { Injectable } from '@nestjs/common';

import { SetSchoolCommand } from './commands';
import { SchoolDto } from './dtos';

@Injectable()
export class SchoolService {
  constructor(private readonly adminRepository: AdminRepository, private readonly schoolRepository: SchoolRepository) {}

  async get(adminId: number) {
    const admin = await this.adminRepository.findOneById(adminId);

    if (admin === null) {
      throw new NotFoundAdminException();
    }

    const school = admin.school ?? null;

    if (school === null) {
      throw new NotExistSchoolException();
    }

    return new SchoolDto(school);
  }

  async upsert(adminId: number, command: SetSchoolCommand) {
    const admin = await this.adminRepository.findOneById(adminId);

    if (admin === null) {
      throw new NotFoundAdminException();
    }

    const school = await this.schoolRepository.upsertOne({
      ...admin.school,
      name: command.name,
      location: command.location,
      admin,
    });

    return new SchoolDto(school);
  }

  async delete(adminId: number) {
    const admin = await this.adminRepository.findOneById(adminId);

    if (admin === null) {
      throw new NotFoundAdminException();
    }

    const school = admin.school ?? null;

    if (school === null) {
      throw new NotExistSchoolException();
    }

    await this.schoolRepository.deleteOneById(adminId);
  }
}
