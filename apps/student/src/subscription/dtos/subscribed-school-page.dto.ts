import { SubscriptionEntity } from '@libs/entity';
import { ApiProperty } from '@nestjs/swagger';
import { DateTime } from 'luxon';

export class SubscribedSchoolPageDto {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  location: string;

  @ApiProperty({ type: Number })
  subscribers: number;

  @ApiProperty({ type: Date })
  subscribedAt: Date;

  @ApiProperty({ type: Number })
  subscriptionDays: number;

  constructor(subscription: SubscriptionEntity) {
    this.id = subscription.schoolPage.id;
    this.name = subscription.schoolPage.name;
    this.location = subscription.schoolPage.location;
    this.subscribers = subscription.schoolPage.schoolPageCount?.subscribers ?? 0;
    this.subscribedAt = subscription.subscribedAt;
    this.subscriptionDays = -Math.floor(DateTime.fromJSDate(new Date(subscription.subscribedAt)).diffNow('days').get('days'));
  }
}
