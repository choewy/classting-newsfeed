import { SchoolNewsEntity, SubscriptionEntity } from '@libs/entity';
import { ApiProperty } from '@nestjs/swagger';

import { SubscribedSchoolNewsDto } from './subscribed-school-news.dto';

export class SubscribedSchoolNewsListDto {
  @ApiProperty({ type: Number })
  total: number;

  @ApiProperty({ type: [SubscribedSchoolNewsDto] })
  rows: SubscribedSchoolNewsDto[];

  constructor(schoolNews: SchoolNewsEntity[], total: number) {
    this.total = total;
    this.rows = schoolNews.map((news) => new SubscribedSchoolNewsDto(news));
  }
}
