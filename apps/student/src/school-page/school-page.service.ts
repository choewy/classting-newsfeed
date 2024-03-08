import { Injectable } from '@nestjs/common';

import { SchoolPageListDto } from './dtos/school-page-list.dto';
import { GetSchoolPageListQuery } from './queries/get-school-page-list.query';
import { SchoolPageRepository } from '../common/repositories';

@Injectable()
export class SchoolPageService {
  constructor(private readonly schoolPageRepository: SchoolPageRepository) {}

  async getSchoolPageList(studentId: number | null, query: GetSchoolPageListQuery) {
    const [rows, total] = await this.schoolPageRepository.findManyAndCount(studentId, query.skip, query.take);

    return new SchoolPageListDto(rows, total);
  }
}
