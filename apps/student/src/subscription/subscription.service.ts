import { Injectable, NotFoundException } from '@nestjs/common';

import { SubscribedSchoolPageListDto } from './dtos/subscribed-school-page-list.dto';
import { GetSubscribiedSchoolPageListQuery } from './queries/get-subscribed-school-page-list.query';
import { SchoolPageRepository } from './repositories/school-page.repository';
import { SubscriptionRepository } from './repositories/subscription.repository';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly schoolPageRepository: SchoolPageRepository,
  ) {}

  async getSubscribedSchoolPageList(studentId: number, query: GetSubscribiedSchoolPageListQuery) {
    const [rows, total] = await this.subscriptionRepository.findManyAndCount(studentId, query.skip, query.take);

    return new SubscribedSchoolPageListDto(rows, total);
  }

  async subscribeSchoolPage(studentId: number, schoolPageId: number) {
    const exists = await this.schoolPageRepository.existsById(schoolPageId);

    if (exists === false) {
      throw new NotFoundException('not found school page');
    }

    const subscription = await this.subscriptionRepository.findOneByStudentAndSchoolPage(studentId, schoolPageId);

    if (subscription?.status === true) {
      return;
    }

    if (subscription?.status === false) {
      await this.subscriptionRepository.deleteOne(studentId, schoolPageId);
    }

    await this.subscriptionRepository.insertAndIncreaseCount(studentId, schoolPageId);
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
