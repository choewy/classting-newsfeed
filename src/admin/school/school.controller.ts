import { AccountType } from '@common/constants';
import { ReqAdmin, SetAccountType } from '@common/decorators';
import { AccountGuard } from '@common/guards';
import { JwtGuard } from '@core/jwt';
import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SetSchoolCommand } from './commands';
import { SchoolDto } from './dtos';
import { SchoolService } from './school.service';

@ApiTags('관리자 - 학교')
@SetAccountType(AccountType.Admin)
@UseGuards(JwtGuard, AccountGuard)
@Controller('admin/school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: '학교 정보 조회' })
  @ApiOkResponse({ type: SchoolDto })
  async get(@ReqAdmin() adminId: number) {
    return this.schoolService.get(adminId);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: '학교 생성/수정' })
  @ApiCreatedResponse({ type: SchoolDto })
  async upsert(@ReqAdmin() adminId: number, @Body() command: SetSchoolCommand) {
    return this.schoolService.upsert(adminId, command);
  }

  @Delete()
  @ApiBearerAuth()
  @ApiOperation({ summary: '학교 삭제' })
  @ApiOkResponse()
  async delete(@ReqAdmin() adminId: number) {
    return this.schoolService.delete(adminId);
  }
}
