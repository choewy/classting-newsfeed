import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateSchoolNewsCommad, UpdateSchoolNewsCommad } from './commands';
import { SchoolNewsDto, SchoolNewsListDto } from './dtos';
import { GetSchoolNewsQuery, GetSchoolNewsListQuery } from './queries';
import { SchoolNewsService } from './school-news.service';
import { JwtAuthGuard, ReqUser } from '../auth';

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
