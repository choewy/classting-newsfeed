import { SchoolNewsEntity } from '@libs/entity';
import { ApiResponseProperty } from '@nestjs/swagger';

import { SchoolNewsDto } from './school-news.dto';

export class SchoolNewsListDto {
  @ApiResponseProperty({ type: Number })
  total: number;

  @ApiResponseProperty({ type: [SchoolNewsDto] })
  rows: SchoolNewsDto[];

  constructor(rows: SchoolNewsEntity[], total: number) {
    this.total = total;
    this.rows = rows.map((row) => new SchoolNewsDto(row));
  }
}
