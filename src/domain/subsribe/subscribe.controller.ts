import { AccountType } from '@common/constants';
import { ReqStudent, SetAccountType } from '@common/decorators';
import { AccountGuard } from '@common/guards';
import { JwtGuard } from '@core/jwt';
import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SubscribeParamsDto, SubscribedSchoolListDto } from './dtos';
import { GetMySubscribedSchoolsQuery } from './queries';
import { SubscribeService } from './subscribe.service';

@ApiTags('구독')
@Controller('subscribes')
@SetAccountType(AccountType.Student)
@UseGuards(JwtGuard, AccountGuard)
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @Get('school')
  @ApiBearerAuth()
  @ApiOperation({ summary: '내 구독 목록 조회' })
  @ApiOkResponse({ type: SubscribedSchoolListDto })
  async getMySubscribedSchools(@ReqStudent() studentId: number, @Query() query: GetMySubscribedSchoolsQuery) {
    return this.subscribeService.getMySubscribedSchools(studentId, query);
  }

  @Post('school/:schoolId(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: '학교 페이지 구독' })
  @ApiNoContentResponse()
  async subscribeSchool(@ReqStudent() studentId: number, @Param() param: SubscribeParamsDto) {
    return this.subscribeService.subscribeSchool(studentId, param.schoolId);
  }

  @Delete('school/:schoolId(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: '학교 페이지 구독 취소' })
  @ApiNoContentResponse()
  async unsubscribeSchool(@ReqStudent() studentId: number, @Param() param: SubscribeParamsDto) {
    return this.subscribeService.unsubscribeSchool(studentId, param.schoolId);
  }
}
