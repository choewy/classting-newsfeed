import { AdminEntity } from '@common/entities';
import { OnlyAdminGuard } from '@common/guards';
import { AdminInterceptor, ReqAdmin } from '@domain/admin';
import { Body, Controller, Delete, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateSchoolCommand } from './commands';
import { SchoolDto } from './dtos';
import { GetSchoolNewsQuery } from './queries';
import { SchoolService } from './school.service';

@ApiTags('학교')
@Controller('school')
@OnlyAdminGuard()
@UseInterceptors(AdminInterceptor)
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: '학교 페이지 생성' })
  @ApiCreatedResponse({ type: SchoolDto })
  async createSchool(@ReqAdmin() admin: AdminEntity, @Body() command: CreateSchoolCommand) {
    return this.schoolService.createSchool(admin, command);
  }

  @Post('news')
  @ApiBearerAuth()
  @ApiOperation({ summary: '학교 소식 등록' })
  async createSchoolNews() {
    return this.schoolService.createSchoolNews();
  }

  @Patch('news/:id(\\d+)')
  @ApiBearerAuth()
  @ApiOperation({ summary: '학교 소식 수정' })
  async updateSchoolNews(@Param() param: GetSchoolNewsQuery) {
    return this.schoolService.updateSchoolNews(param.id);
  }

  @Delete('news/:id(\\d+)')
  @ApiBearerAuth()
  @ApiOperation({ summary: '학교 소식 삭제' })
  async deleteSchoolNews(@Param() param: GetSchoolNewsQuery) {
    return this.schoolService.deleteSchoolNews(param.id);
  }
}
