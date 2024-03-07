import { SubscriptionEntity } from '@libs/entity';
import { ApiProperty } from '@nestjs/swagger';

import { SubscribedSchoolPageDto } from './subscribed-school-page.dto';

export class SubscribedSchoolPageListDto {
  @ApiProperty({ type: Number })
  total: number;

  @ApiProperty({ type: [SubscribedSchoolPageDto] })
  rows: SubscribedSchoolPageDto[];

  constructor(subscriptions: SubscriptionEntity[], total: number) {
    this.total = total;
    this.rows = subscriptions.map((subscription) => new SubscribedSchoolPageDto(subscription));
  }
}
