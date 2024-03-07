import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SubscribeSchoolPageCommand } from './commands/subscribe-school-page.command';
import { SubscribedSchoolPageListDto } from './dtos/subscribed-school-page-list.dto';
import { GetSubscribiedSchoolPageListQuery } from './queries/get-subscribed-school-page-list.query';
import { SubscriptionService } from './subscription.service';
import { ReqUser } from '../auth/decorators/req-user';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('학교 페이지 구독')
@Controller('subscriptions')
@UseGuards(JwtAuthGuard)
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: '구독 중인 학교 페이지 목록 조회' })
  @ApiOkResponse({ type: SubscribedSchoolPageListDto })
  async getSubscribedSchoolPageList(@ReqUser() studentId: number, @Query() query: GetSubscribiedSchoolPageListQuery) {
    return this.subscriptionService.getSubscribedSchoolPageList(studentId, query);
  }

  @Post(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: '학교 페이지 구독' })
  @ApiNoContentResponse()
  async subscribeSchoolPage(@ReqUser() studentId: number, @Param() command: SubscribeSchoolPageCommand) {
    return this.subscriptionService.subscribeSchoolPage(studentId, command.id);
  }

  @Delete(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: '학교 페이지 구독 취소' })
  @ApiNoContentResponse()
  async unsubscribeSchoolPage(@ReqUser() studentId: number, @Param() command: SubscribeSchoolPageCommand) {
    return this.subscriptionService.unsubscribeSchoolPage(studentId, command.id);
  }
}
