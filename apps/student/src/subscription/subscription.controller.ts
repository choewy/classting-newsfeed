import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SubscribedSchoolPageListDto } from './dtos/subscribed-school-page-list.dto';
import { GetSubscribiedSchoolPageListQuery } from './queries/get-subscribed-school-page-list.query';
import { SubscriptionService } from './subscription.service';
import { ReqUser } from '../auth/decorators/req-user';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('하교 페이지 구독')
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
}
