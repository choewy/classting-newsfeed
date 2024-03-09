import { ApiExtendsException } from '@libs/swagger';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { NewsFeedListDto } from './dtos';
import { FeedService } from './feed.service';
import { GetSchoolNewsFeedListQuery } from './queries';
import { JwtAuthGuard, ReqUser } from '../auth';

@ApiTags('뉴스피드')
@Controller('feeds')
@UseGuards(JwtAuthGuard)
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: '구독 중인 학교 뉴스피드 조회' })
  @ApiOkResponse({ type: [NewsFeedListDto] })
  @ApiExtendsException()
  async getSchoolNewsFeedList(@ReqUser() studentId: number, @Query() query: GetSchoolNewsFeedListQuery) {
    return this.feedService.getSchoolNewsFeedList(studentId, query);
  }
}
