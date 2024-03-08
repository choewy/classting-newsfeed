import { Injectable } from '@nestjs/common';

import { NewsFeedListDto } from './dtos/news-feed-list.dto';
import { GetSchoolNewsFeedListQuery } from './queries/get-school-news-feeds.query';
import { SchoolNewsRepository } from '../repositories/school-news.repository';

@Injectable()
export class FeedService {
  constructor(private readonly schoolNewsRepository: SchoolNewsRepository) {}

  async getSchoolNewsFeedList(studentId: number, query: GetSchoolNewsFeedListQuery) {
    const [rows, total] = await this.schoolNewsRepository.findManyAndCountByStudent(studentId, query.skip, query.take);

    return new NewsFeedListDto(rows, total);
  }
}
