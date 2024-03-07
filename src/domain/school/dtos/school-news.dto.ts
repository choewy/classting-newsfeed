import { SchoolNewsEntity } from '@common/entities';
import { ApiResponseProperty } from '@nestjs/swagger';

import { SchoolNewsWriterDto } from './school-news-writer.dto';

export class SchoolNewsDto {
  @ApiResponseProperty({ type: BigInt })
  id: bigint;

  @ApiResponseProperty({ type: String })
  title: string;

  @ApiResponseProperty({ type: String })
  contents: string;

  @ApiResponseProperty({ type: SchoolNewsWriterDto })
  writer: SchoolNewsWriterDto;

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  constructor(schoolNews: SchoolNewsEntity) {
    this.id = schoolNews.id;
    this.title = schoolNews.title;
    this.contents = schoolNews.contents;
    this.writer = new SchoolNewsWriterDto(schoolNews.writer);
    this.createdAt = schoolNews.createdAt;
  }
}
