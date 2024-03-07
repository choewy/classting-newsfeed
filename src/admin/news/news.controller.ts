import { ReqAdmin } from '@common/decorators';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SetNewsCommand } from './commands';
import { NewsDto, NewsListDto } from './dtos';
import { NewsService } from './news.service';
import { GetNewsListQuery, GetNewsQuery } from './queries';

@ApiTags('관리자 - 소식')
@Controller('admin/news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: '내 학교 소식 목록 조회' })
  @ApiOkResponse({ type: NewsListDto })
  async list(@ReqAdmin() adminid: number, @Query() query: GetNewsListQuery) {
    return this.newsService.list(adminid, query);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: '내 학교 소식 생성' })
  @ApiCreatedResponse({ type: NewsDto })
  async create(@ReqAdmin() adminid: number, @Body() command: SetNewsCommand) {
    return this.newsService.create(adminid, command);
  }

  @Patch(':id(\\d+)')
  @ApiBearerAuth()
  @ApiOperation({ summary: '내 학교 소식 수정' })
  @ApiOkResponse({ type: NewsDto })
  async update(@ReqAdmin() adminid: number, @Param() param: GetNewsQuery, @Body() command: SetNewsCommand) {
    return this.newsService.update(adminid, param.id, command);
  }

  @Delete(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: '내 학교 소식 삭제' })
  @ApiNoContentResponse()
  async delete(@ReqAdmin() adminid: number, @Param() param: GetNewsQuery) {
    return this.newsService.delete(adminid, param.id);
  }
}
