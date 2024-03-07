import { AccountType } from '@common/constants';
import { ReqAdmin, SetAccountType } from '@common/decorators';
import { AccountGuard } from '@common/guards';
import { JwtGuard } from '@core/jwt';
import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateSchoolCommand, CreateSchoolNewsCommand, UpdateSchoolNewsCommand } from './commands';
import { SchoolDto, SchoolNewsDto } from './dtos';
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
  @ApiCreatedResponse({ type: SchoolNewsDto })
  async createSchoolNews(@ReqAdmin() adminId: number, @Body() command: CreateSchoolNewsCommand) {
    return this.schoolService.createSchoolNews(adminId, command);
  }

  @Patch('news/:schoolNewsId(\\d+)')
  @ApiBearerAuth()
  @ApiOperation({ summary: '학교 소식 수정' })
  @ApiOkResponse({ type: SchoolNewsDto })
  async updateSchoolNews(@ReqAdmin() adminId: number, @Param() param: GetSchoolNewsQuery, @Body() command: UpdateSchoolNewsCommand) {
    return this.schoolService.updateSchoolNews(adminId, param.schoolNewsId, command);
  }

  @Delete('news/:schoolNewsId(\\d+)')
  @ApiBearerAuth()
  @ApiOperation({ summary: '학교 소식 삭제' })
  async deleteSchoolNews(@ReqAdmin() adminId: number, @Param() param: GetSchoolNewsQuery) {
    return this.schoolService.deleteSchoolNews(adminId, param.schoolNewsId);
  }
}
