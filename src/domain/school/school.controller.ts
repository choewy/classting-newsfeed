import { AccountType } from '@common/constants';
import { ReqAdmin, SetAccountType } from '@common/decorators';
import { AccountGuard } from '@common/guards';
import { JwtGuard } from '@core/jwt';
import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateSchoolCommand } from './commands';
import { SchoolDto } from './dtos';
import { GetSchoolNewsQuery } from './queries';
import { SchoolService } from './school.service';

@ApiTags('학교')
@Controller('school')
@SetAccountType(AccountType.Admin)
@UseGuards(JwtGuard, AccountGuard)
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: '학교 페이지 생성' })
  @ApiCreatedResponse({ type: SchoolDto })
  async createSchool(@ReqAdmin() adminId: number, @Body() command: CreateSchoolCommand) {
    return this.schoolService.createSchool(adminId, command);
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
