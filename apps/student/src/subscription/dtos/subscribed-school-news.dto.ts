import { SchoolNewsEntity } from '@libs/entity';
import { ApiResponseProperty } from '@nestjs/swagger';

export class SubscribedSchoolNewsDto {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  title: string;

  @ApiResponseProperty({ type: String })
  contents: string;

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  constructor(schoolNews: SchoolNewsEntity) {
    this.id = schoolNews.id;
    this.title = schoolNews.title;
    this.contents = schoolNews.contents;
    this.createdAt = schoolNews.createdAt;
    this.updatedAt = schoolNews.updatedAt;
  }
}
