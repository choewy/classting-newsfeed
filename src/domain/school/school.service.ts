import {
  AlreadyExistSchoolException,
  AlreadyHasSchoolException,
  CannotAccessShoolNewsException,
  NotFoundSchoolNewsException,
  RequriedSchoolExistException,
} from '@common/implements';
import { AdminRepository, SchoolNewsRepository, SchoolRepository } from '@common/repositories';
import { Injectable } from '@nestjs/common';

import { CreateSchoolCommand, CreateSchoolNewsCommand, UpdateSchoolNewsCommand } from './commands';
import { SchoolDto, SchoolNewsDeleteResultDto, SchoolNewsDto } from './dtos';

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
    const writer = await this.adminRepository.findByIdWithSchool(adminId);

    if (writer.school === null) {
      throw new RequriedSchoolExistException();
    }

    const schoolNews = await this.schoolNewsRepository.createSchoolNews(writer, {
      title: command.title,
      contents: command.contents,
    });

    return new SchoolNewsDto(schoolNews);
  }

  async updateSchoolNews(adminId: number, schoolNewsId: bigint, command: UpdateSchoolNewsCommand) {
    const updater = await this.adminRepository.findByIdWithSchool(adminId);

    if (updater.school === null) {
      throw new RequriedSchoolExistException();
    }

    const schoolNews = await this.schoolNewsRepository.findByIdSchoolAndAdmins(schoolNewsId);

    if (schoolNews === null) {
      throw new NotFoundSchoolNewsException();
    }

    if (schoolNews.school.id !== updater.school.id) {
      throw new CannotAccessShoolNewsException();
    }

    const updatedSchoolNews = await this.schoolNewsRepository.updateSchoolNews(updater, schoolNews, {
      title: command.title,
      contents: command.contents,
    });

    return new SchoolNewsDto(updatedSchoolNews);
  }

  async deleteSchoolNews(adminId: number, schoolNewsId: bigint) {
    const admin = await this.adminRepository.findByIdWithSchool(adminId);

    if (admin.school === null) {
      throw new RequriedSchoolExistException();
    }

    const schoolNews = await this.schoolNewsRepository.findByIdSchoolAndAdmins(schoolNewsId);

    if (schoolNews === null) {
      throw new NotFoundSchoolNewsException();
    }

    if (schoolNews.school.id !== admin.school.id) {
      throw new CannotAccessShoolNewsException();
    }

    const deleteResult = await this.schoolNewsRepository.deleteById(schoolNewsId);

    return new SchoolNewsDeleteResultDto(schoolNewsId, deleteResult);
  }
}
