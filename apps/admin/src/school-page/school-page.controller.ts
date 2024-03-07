import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateSchoolPageCommand } from './commands/create-school-page.commad';
import { UpdateSchoolPageCommand } from './commands/update-school-page.commad';
import { SchoolPageDto } from './dtos/school-page.dto';
import { SchoolPageService } from './school-page.service';
import { ReqUser } from '../auth/decorators/req-user';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('학교 페이지')
@Controller('school-page')
@UseGuards(JwtAuthGuard)
export class SchoolPageController {
  constructor(private readonly schoolPageService: SchoolPageService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: '관리자 학교 페이지 조회' })
  @ApiOkResponse({ type: SchoolPageDto })
  async getSchoolPage(@ReqUser() adminId: number) {
    return this.schoolPageService.getSchoolPage(adminId);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: '관리자 학교 페이지 생성' })
  @ApiCreatedResponse({ type: SchoolPageDto })
  async createSchoolPage(@ReqUser() adminId: number, @Body() command: CreateSchoolPageCommand) {
    return this.schoolPageService.createSchoolPage(adminId, command);
  }

  @Patch()
  @ApiBearerAuth()
  @ApiOperation({ summary: '관리자 학교 페이지 수정' })
  @ApiOkResponse({ type: SchoolPageDto })
  async updateSchoolPage(@ReqUser() adminId: number, @Body() command: UpdateSchoolPageCommand) {
    return this.schoolPageService.updateSchoolPage(adminId, command);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: '관리자 학교 페이지 삭제' })
  @ApiNoContentResponse()
  async deleteSchoolPage(@ReqUser() adminId: number) {
    return this.schoolPageService.deleteSchoolPage(adminId);
  }
}
