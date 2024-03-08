import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { CreateSchoolPageCommand, UpdateSchoolPageCommand } from './commands';
import { SchoolPageDto } from './dtos';
import { SchoolPageRepository } from '../common/repositories';

@Injectable()
export class SchoolPageService {
  constructor(private readonly schoolPageRepository: SchoolPageRepository) {}

  async getSchoolPage(adminId: number) {
    const schoolPage = await this.schoolPageRepository.findOneByAdminId(adminId);

    if (schoolPage === null) {
      throw new NotFoundException('not found school page');
    }

    return new SchoolPageDto(schoolPage);
  }

  async createSchoolPage(adminId: number, command: CreateSchoolPageCommand) {
    const exists = await this.schoolPageRepository.existsByAdminId(adminId);

    if (exists) {
      throw new ConflictException('already exists school page');
    }

    const schoolPage = await this.schoolPageRepository.createOne(adminId, {
      name: command.name,
      location: command.location,
    });

    return new SchoolPageDto(schoolPage);
  }

  async updateSchoolPage(adminId: number, command: UpdateSchoolPageCommand) {
    const schoolPage = await this.schoolPageRepository.findOneByAdminId(adminId);

    if (schoolPage === null) {
      throw new NotFoundException('not found school page');
    }

    const updatedSchoolPage = await this.schoolPageRepository.save({
      ...schoolPage,
      name: command.name,
      location: command.location,
    });

    return new SchoolPageDto(updatedSchoolPage);
  }

  async deleteSchoolPage(adminId: number) {
    const exists = await this.schoolPageRepository.existsByAdminId(adminId);

    if (exists === false) {
      throw new NotFoundException('not found school page');
    }

    await this.schoolPageRepository.deleteByAdminId(adminId);
  }
}
