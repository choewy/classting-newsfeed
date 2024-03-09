import { ApiExtendsException } from '@libs/swagger';
import {
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SubscribeSchoolPageCommand } from './commands';
import { SubscribedSchoolPageListDto, SubscribedSchoolNewsListDto } from './dtos';
import { GetSubscribedSchoolPageListQuery, GetSubscribedSchoolNewsQuery, GetSubscribedSchoolNewsListQuery } from './queries';
import { SubscriptionService } from './subscription.service';
import { JwtAuthGuard, ReqUser } from '../auth';

@ApiTags('학교 페이지 구독')
@Controller('subscriptions')
@UseGuards(JwtAuthGuard)
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: '구독 중인 학교 페이지 목록 조회' })
  @ApiOkResponse({ type: SubscribedSchoolPageListDto })
  @ApiExtendsException()
  async getSubscribedSchoolPageList(@ReqUser() studentId: number, @Query() query: GetSubscribedSchoolPageListQuery) {
    return this.subscriptionService.getSubscribedSchoolPageList(studentId, query);
  }

  @Get(':id(\\d+)')
  @ApiBearerAuth()
  @ApiOperation({ summary: '구독 중인 학교 페이지 소식 목록 조회' })
  @ApiOkResponse({ type: SubscribedSchoolNewsListDto })
  @ApiExtendsException(NotFoundException, ForbiddenException)
  async getSubscribedSchoolNewsList(
    @ReqUser() studentId: number,
    @Param() param: GetSubscribedSchoolNewsQuery,
    @Query() query: GetSubscribedSchoolNewsListQuery,
  ) {
    return this.subscriptionService.getSubscribedSchoolNewsList(studentId, param.id, query);
  }

  @Post(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: '학교 페이지 구독' })
  @ApiNoContentResponse()
  @ApiExtendsException(NotFoundException)
  async subscribeSchoolPage(@ReqUser() studentId: number, @Param() command: SubscribeSchoolPageCommand) {
    return this.subscriptionService.subscribeSchoolPage(studentId, command.id);
  }

  @Delete(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: '학교 페이지 구독 취소' })
  @ApiNoContentResponse()
  @ApiExtendsException(NotFoundException)
  async unsubscribeSchoolPage(@ReqUser() studentId: number, @Param() command: SubscribeSchoolPageCommand) {
    return this.subscriptionService.unsubscribeSchoolPage(studentId, command.id);
  }
}
