import { ApiExtendsAuthException, ApiExtendsException } from '@libs/swagger';
import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateSchoolPageCommand, UpdateSchoolPageCommand } from './commands';
import { SchoolPageDto } from './dtos';
import { SchoolPageService } from './school-page.service';
import { JwtAuthGuard, ReqUser } from '../auth';

@ApiTags('학교 페이지')
@Controller('school/page')
@UseGuards(JwtAuthGuard)
export class SchoolPageController {
  constructor(private readonly schoolPageService: SchoolPageService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: '관리자 학교 페이지 조회' })
  @ApiOkResponse({ type: SchoolPageDto })
  @ApiExtendsAuthException(NotFoundException)
  async getSchoolPage(@ReqUser() adminId: number) {
    return this.schoolPageService.getSchoolPage(adminId);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: '관리자 학교 페이지 생성' })
  @ApiCreatedResponse({ type: SchoolPageDto })
  @ApiExtendsException(ConflictException)
  async createSchoolPage(@ReqUser() adminId: number, @Body() command: CreateSchoolPageCommand) {
    return this.schoolPageService.createSchoolPage(adminId, command);
  }

  @Patch()
  @ApiBearerAuth()
  @ApiOperation({ summary: '관리자 학교 페이지 수정' })
  @ApiOkResponse({ type: SchoolPageDto })
  @ApiExtendsException(NotFoundException)
  async updateSchoolPage(@ReqUser() adminId: number, @Body() command: UpdateSchoolPageCommand) {
    return this.schoolPageService.updateSchoolPage(adminId, command);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: '관리자 학교 페이지 삭제' })
  @ApiNoContentResponse()
  @ApiExtendsAuthException(NotFoundException)
  async deleteSchoolPage(@ReqUser() adminId: number) {
    return this.schoolPageService.deleteSchoolPage(adminId);
  }
}
