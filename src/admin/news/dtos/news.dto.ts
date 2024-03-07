import { NewsEntity } from '@common/entities';
import { ApiProperty } from '@nestjs/swagger';

export class NewsDto {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  contents: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  constructor(news: NewsEntity) {
    this.id = news.id;
    this.title = news.title;
    this.contents = news.contents;
    this.createdAt = news.createdAt;
    this.updatedAt = news.updatedAt;
  }
}
