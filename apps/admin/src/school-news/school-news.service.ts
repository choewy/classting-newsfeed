import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { CreateSchoolNewsCommad, UpdateSchoolNewsCommad } from './commands';
import { SchoolNewsDto, SchoolNewsListDto } from './dtos';
import { GetSchoolNewsListQuery } from './queries';
import { SchoolPageRepository, SchoolNewsRepository } from '../common/repositories';

@Injectable()
export class SchoolNewsService {
  constructor(private readonly schoolPageRepository: SchoolPageRepository, private readonly schoolNewsRepository: SchoolNewsRepository) {}

  async getSchoolNewsList(adminId: number, query: GetSchoolNewsListQuery) {
    const schoolPage = await this.schoolPageRepository.findOneByAdminId(adminId);

    if (schoolPage === null) {
      throw new NotFoundException('not found school page');
    }

    const [rows, total] = await this.schoolNewsRepository.findManyAndCountBySchoolPageId(schoolPage.id, query.skip, query.take);

    return new SchoolNewsListDto(rows, total);
  }

  async createSchoolNews(adminId: number, command: CreateSchoolNewsCommad) {
    const schoolPage = await this.schoolPageRepository.findOneByAdminId(adminId);

    if (schoolPage === null) {
      throw new NotFoundException('not found school page');
    }

    const schoolNews = await this.schoolNewsRepository.insertOne(schoolPage, {
      title: command.title,
      contents: command.contents,
      hidden: command.hidden,
    });

    return new SchoolNewsDto(schoolNews);
  }

  async updateSchoolNews(adminId: number, newsId: number, command: UpdateSchoolNewsCommad) {
    const schoolPage = await this.schoolPageRepository.findOneByAdminId(adminId);

    if (schoolPage === null) {
      throw new NotFoundException('not found school page');
    }

    const schoolNews = await this.schoolNewsRepository.findOneById(newsId);

    if (schoolNews === null) {
      throw new NotFoundException('not found school news');
    }

    if (schoolNews.schoolPage.id !== schoolPage.id) {
      throw new ForbiddenException('cannot update school news');
    }

    const updatedSchoolNews = await this.schoolNewsRepository.updateOne(schoolNews, {
      title: command.title,
      contents: command.contents,
      hidden: command.hidden,
    });

    return new SchoolNewsDto(updatedSchoolNews);
  }

  async deleteSchoolNews(adminId: number, newsId: number) {
    const schoolPage = await this.schoolPageRepository.findOneByAdminId(adminId);

    if (schoolPage === null) {
      throw new NotFoundException('not found school page');
    }

    const schoolNews = await this.schoolNewsRepository.findOneById(newsId);

    if (schoolNews === null) {
      throw new NotFoundException('not found school news');
    }

    if (schoolNews.schoolPage.id !== schoolPage.id) {
      throw new ForbiddenException('cannot delete school news');
    }

    await this.schoolNewsRepository.delete(schoolNews.id);
  }
}
