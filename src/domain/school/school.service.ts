import { SchoolRepository } from '@common/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SchoolService {
  constructor(private readonly schoolRepository: SchoolRepository) {}

  async createSchool() {
    return;
  }

  async createSchoolNews() {
    return;
  }

  async updateSchoolNews() {
    return;
  }

  async deleteSchoolNews() {
    return;
  }
}
