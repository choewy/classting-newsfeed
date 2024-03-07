import {
  CannotDeleteNewsException,
  CannotUpdateNewsException,
  NotExistSchoolException,
  NotFoundAdminException,
  NotFoundSchoolNewsException,
} from '@common/implements';
import { AdminRepository, NewsRepository } from '@common/repositories';
import { Injectable } from '@nestjs/common';

import { SetNewsCommand } from './commands';
import { NewsDto, NewsListDto } from './dtos';
import { GetNewsListQuery } from './queries';

@Injectable()
export class NewsService {
  constructor(private readonly adminRepository: AdminRepository, private readonly newsRepository: NewsRepository) {}

  async list(adminId: number, query: GetNewsListQuery) {
    const admin = await this.adminRepository.findOneById(adminId);

    if (admin === null) {
      throw new NotFoundAdminException();
    }

    const school = admin.school ?? null;

    if (school === null) {
      throw new NotExistSchoolException();
    }

    const [list, total] = await this.newsRepository.findManyAndCount(school.id, query.skip, query.take);

    return new NewsListDto(
      list.map((row) => new NewsDto(row)),
      total,
    );
  }

  async create(adminId: number, command: SetNewsCommand) {
    const admin = await this.adminRepository.findOneById(adminId);

    if (admin === null) {
      throw new NotFoundAdminException();
    }

    const school = admin.school ?? null;

    if (school === null) {
      throw new NotExistSchoolException();
    }

    const news = await this.newsRepository.insertOne(admin.id, school.id, command.title, command.contents);

    return new NewsDto(news);
  }

  async update(adminId: number, newsId: number, command: SetNewsCommand) {
    const admin = await this.adminRepository.findOneById(adminId);

    if (admin === null) {
      throw new NotFoundAdminException();
    }

    const school = admin.school ?? null;

    if (school === null) {
      throw new NotExistSchoolException();
    }

    const news = await this.newsRepository.findOneById(newsId);

    if (news === null) {
      throw new NotFoundSchoolNewsException();
    }

    if (news.school.id !== school.id) {
      throw new CannotUpdateNewsException();
    }

    const updatedNews = await this.newsRepository.updateOne(news, admin.id, command.title, command.contents);

    return new NewsDto(updatedNews);
  }

  async delete(adminId: number, newsId: number) {
    const admin = await this.adminRepository.findOneById(adminId);

    if (admin === null) {
      throw new NotFoundAdminException();
    }

    const school = admin.school ?? null;

    if (school === null) {
      throw new NotExistSchoolException();
    }

    const news = await this.newsRepository.findOneById(newsId);

    if (news.school?.id !== school.id) {
      throw new CannotDeleteNewsException();
    }

    await this.newsRepository.deleteOne(news);
  }
}
