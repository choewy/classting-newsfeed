import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { SubscribedSchoolNewsListDto } from './dtos/subscribed-school-news-list.dto';
import { SubscribedSchoolPageListDto } from './dtos/subscribed-school-page-list.dto';
import { GetSubscribedSchoolNewsListQuery } from './queries/get-subscribed-school-news-list.query';
import { GetSubscribedSchoolPageListQuery } from './queries/get-subscribed-school-page-list.query';
import { SchoolNewsRepository } from './repositories/school-news.repository';
import { SchoolPageRepository } from './repositories/school-page.repository';
import { SubscriptionRepository } from './repositories/subscription.repository';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly schoolPageRepository: SchoolPageRepository,
    private readonly schoolNewsRepository: SchoolNewsRepository,
  ) {}

  async getSubscribedSchoolPageList(studentId: number, query: GetSubscribedSchoolPageListQuery) {
    const [rows, total] = await this.subscriptionRepository.findManyAndCount(studentId, query.skip, query.take);

    return new SubscribedSchoolPageListDto(rows, total);
  }

  async getSubscribedSchoolNewsList(studentId: number, schoolPageId: number, query: GetSubscribedSchoolNewsListQuery) {
    const existsSchoolPage = await this.schoolPageRepository.existsById(schoolPageId);

    if (existsSchoolPage === false) {
      throw new NotFoundException('not found school page');
    }

    const existsSubscription = await this.subscriptionRepository.existsByStudentAndSchoolPage(studentId, schoolPageId);

    if (existsSubscription === false) {
      throw new ForbiddenException('not subscribed');
    }

    const [rows, total] = await this.schoolNewsRepository.findManyAndCount(schoolPageId, query.skip, query.take);

    return new SubscribedSchoolNewsListDto(rows, total);
  }

  async subscribeSchoolPage(studentId: number, schoolPageId: number) {
    const exists = await this.schoolPageRepository.existsById(schoolPageId);

    if (exists === false) {
      throw new NotFoundException('not found school page');
    }

    const subscription = await this.subscriptionRepository.findOneByStudentAndSchoolPage(studentId, schoolPageId);

    switch (subscription?.status) {
      case true:
        return;

      case false:
        await this.subscriptionRepository.deleteOne(studentId, schoolPageId);

      default:
        await this.subscriptionRepository.insertAndIncreaseCount(studentId, schoolPageId);
    }
  }

  async unsubscribeSchoolPage(studentId: number, schoolPageId: number) {
    const exists = await this.schoolPageRepository.existsById(schoolPageId);

    if (exists === false) {
      throw new NotFoundException('not found school page');
    }

    const subscription = await this.subscriptionRepository.findOneByStudentAndSchoolPage(studentId, schoolPageId);

    if (subscription === null || subscription?.status === false) {
      return;
    }

    await this.subscriptionRepository.updateAndDecreaseCount(studentId, schoolPageId);
  }
}
