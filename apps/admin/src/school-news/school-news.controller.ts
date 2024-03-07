import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateSchoolNewsCommad } from './commands/create-school-news.command';
import { UpdateSchoolNewsCommad } from './commands/update-school-news.command';
import { SchoolNewsListDto } from './dtos/school-news-list.dto';
import { SchoolNewsDto } from './dtos/school-news.dto';
import { GetSchoolNewsListQuery } from './queries/get-school-news-list.query';
import { GetSchoolNewsQuery } from './queries/get-school-news.query';
import { SchoolNewsService } from './school-news.service';
import { ReqUser } from '../auth/decorators/req-user';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('학교 소식')
@Controller('school/news')
@UseGuards(JwtAuthGuard)
export class SchoolNewsController {
  constructor(private readonly schoolNewsService: SchoolNewsService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: '관리자 학교 소식 목록 조회' })
  @ApiOkResponse({ type: SchoolNewsListDto })
  async getShoolNewsList(@ReqUser() adminId: number, @Query() query: GetSchoolNewsListQuery) {
    return this.schoolNewsService.getSchoolNewsList(adminId, query);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: '관리자 학교 소식 발행' })
  @ApiCreatedResponse({ type: SchoolNewsDto })
  async createSchoolNews(@ReqUser() adminId: number, @Body() command: CreateSchoolNewsCommad) {
    return this.schoolNewsService.createSchoolNews(adminId, command);
  }

  @Patch(':id(\\d+)')
  @ApiBearerAuth()
  @ApiOperation({ summary: '관리자 학교 소식 수정' })
  @ApiOkResponse({ type: SchoolNewsDto })
  async updateSchoolNews(@ReqUser() adminId: number, @Param() params: GetSchoolNewsQuery, @Body() command: UpdateSchoolNewsCommad) {
    return this.schoolNewsService.updateSchoolNews(adminId, params.id, command);
  }

  @Delete(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: '관리자 학교 소식 삭제' })
  @ApiNoContentResponse()
  async deleteSchoolNews(@ReqUser() adminId: number, @Param() params: GetSchoolNewsQuery) {
    return this.schoolNewsService.deleteSchoolNews(adminId, params.id);
  }
}
