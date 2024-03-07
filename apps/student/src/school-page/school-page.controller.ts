import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SchoolPageListDto } from './dtos/school-page-list.dto';
import { GetSchoolPageListQuery } from './queries/get-school-page-list.query';
import { SchoolPageService } from './school-page.service';
import { IgnoreJwtAuthGuardError } from '../auth/decorators/ignore-jwt-auth-guard-error';
import { ReqUser } from '../auth/decorators/req-user';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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
