import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { CreateSchoolNewsCommad } from './commands/create-school-news.command';
import { UpdateSchoolNewsCommad } from './commands/update-school-news.command';
import { SchoolNewsListDto } from './dtos/school-news-list.dto';
import { SchoolNewsDto } from './dtos/school-news.dto';
import { GetSchoolNewsListQuery } from './queries/get-school-news-list.query';
import { SchoolNewsRepository } from '../repositories/school-news.repository';
import { SchoolPageRepository } from '../repositories/school-page.repository';

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

    const schoolNews = this.schoolNewsRepository.create({
      title: command.title,
      contents: command.contents,
      hidden: command.hidden,
      schoolPage,
    });

    await this.schoolNewsRepository.insert(schoolNews);

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

    const updatedSchoolNews = this.schoolNewsRepository.create({
      ...schoolNews,
      title: command.title,
      contents: command.contents,
      hidden: command.hidden,
    });

    await updatedSchoolNews.save();

    return new SchoolNewsDto(schoolNews);
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
      throw new ForbiddenException('cannot update school news');
    }

    await this.schoolNewsRepository.delete(schoolNews.id);
  }
}
