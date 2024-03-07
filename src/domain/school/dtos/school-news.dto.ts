import { SchoolNewsEntity } from '@common/entities';
import { ApiResponseProperty } from '@nestjs/swagger';

import { SchoolNewsAdminDto } from './school-news-admin.dto';

export class SchoolNewsDto {
  @ApiResponseProperty({ type: BigInt })
  id: bigint;

  @ApiResponseProperty({ type: String })
  title: string;

  @ApiResponseProperty({ type: String })
  contents: string;

  @ApiResponseProperty({ type: SchoolNewsAdminDto })
  writer: SchoolNewsAdminDto;

  @ApiResponseProperty({ type: SchoolNewsAdminDto })
  updater: SchoolNewsAdminDto | null;

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  constructor(schoolNews: SchoolNewsEntity) {
    this.id = schoolNews.id;
    this.title = schoolNews.title;
    this.contents = schoolNews.contents;
    this.writer = new SchoolNewsAdminDto(schoolNews.writer);
    this.updater = schoolNews.updater ? new SchoolNewsAdminDto(schoolNews.updater) : null;
    this.createdAt = schoolNews.createdAt;
    this.updatedAt = schoolNews.createdAt === schoolNews.updatedAt ? null : schoolNews.updatedAt;
  }
}
