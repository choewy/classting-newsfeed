import { Injectable } from '@nestjs/common';

import { SubscribedSchoolPageListDto } from './dtos/subscribed-school-page-list.dto';
import { GetSubscribiedSchoolPageListQuery } from './queries/get-subscribed-school-page-list.query';
import { SubscriptionRepository } from './repositories/subscription.repository';

@Injectable()
export class SubscriptionService {
  constructor(private readonly subscriptionRepository: SubscriptionRepository) {}

  async getSubscribedSchoolPageList(studentId: number, query: GetSubscribiedSchoolPageListQuery) {
    const [rows, total] = await this.subscriptionRepository.findManyAndCount(studentId, query.skip, query.take);

    return new SubscribedSchoolPageListDto(rows, total);
  }
}
