import { Injectable } from '@nestjs/common';

import { NewsFeedListDto } from './dtos';
import { GetSchoolNewsFeedListQuery } from './queries';
import { SchoolNewsRepository } from '../common/repositories';

@Injectable()
export class FeedService {
  constructor(private readonly schoolNewsRepository: SchoolNewsRepository) {}

  async getSchoolNewsFeedList(studentId: number, query: GetSchoolNewsFeedListQuery) {
    const [rows, total] = await this.schoolNewsRepository.findManyAndCountByStudent(studentId, query.skip, query.take);

    return new NewsFeedListDto(rows, total);
  }
}
