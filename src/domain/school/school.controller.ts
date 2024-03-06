import { OnlyAdminGuard } from '@common/guards';
import { Controller, Delete, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SchoolService } from './school.service';

@ApiTags('학교')
@Controller('school')
@OnlyAdminGuard()
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  @ApiOperation({ summary: '학교 페이지 생성' })
  async createSchool() {
    return this.schoolService.createSchool();
  }

  @Post('news')
  @ApiOperation({ summary: '학교 소식 등록' })
  async createSchoolNews() {
    return this.schoolService.createSchoolNews();
  }

  @Patch('news/:id(\\d+)')
  @ApiOperation({ summary: '학교 소식 수정' })
  async updateSchoolNews() {
    return this.schoolService.updateSchoolNews();
  }

  @Delete('news/:id(\\d+)')
  @ApiOperation({ summary: '학교 소식 삭제' })
  async deleteSchoolNews() {
    return this.schoolService.deleteSchoolNews();
  }
}
