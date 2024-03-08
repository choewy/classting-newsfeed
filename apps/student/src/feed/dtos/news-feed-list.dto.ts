import { SchoolNewsEntity } from '@libs/entity';
import { ApiResponseProperty } from '@nestjs/swagger';

import { NewsFeedDto } from './news-feed.dto';

export class NewsFeedListDto {
  @ApiResponseProperty({ type: Number })
  total: number;

  @ApiResponseProperty({ type: [NewsFeedDto] })
  rows: NewsFeedDto[];

  constructor(rows: SchoolNewsEntity[], total: number) {
    this.total = total;
    this.rows = rows.map((row) => new NewsFeedDto(row));
  }
}
