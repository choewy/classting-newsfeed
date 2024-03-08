import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SchoolPageListDto } from './dtos';
import { GetSchoolPageListQuery } from './queries';
import { SchoolPageService } from './school-page.service';
import { JwtAuthGuard, IgnoreJwtAuthGuardError, ReqUser } from '../auth';

@ApiTags('학생 - 학교 페이지')
@Controller('school/pages')
@UseGuards(JwtAuthGuard)
export class SchoolPageController {
  constructor(private readonly schoolPageService: SchoolPageService) {}

  @Get()
  @IgnoreJwtAuthGuardError()
  @ApiBearerAuth()
  @ApiOperation({ summary: '학교 페이지 목록 조회' })
  @ApiOkResponse({ type: SchoolPageListDto })
  async getSchoolPageList(@ReqUser() studentId: number | null, @Query() query: GetSchoolPageListQuery) {
    return this.schoolPageService.getSchoolPageList(studentId, query);
  }
}
