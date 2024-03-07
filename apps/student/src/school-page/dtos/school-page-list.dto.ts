import { SchoolPageEntity } from '@libs/entity';
import { ApiResponseProperty } from '@nestjs/swagger';

import { SchoolPageDto } from './school-page.dto';

export class SchoolPageListDto {
  @ApiResponseProperty({ type: Number })
  total: number;

  @ApiResponseProperty({ type: [SchoolPageDto] })
  rows: SchoolPageDto[];

  constructor(rows: SchoolPageEntity[], total: number) {
    this.total = total;
    this.rows = rows.map((row) => new SchoolPageDto(row));
  }
}
