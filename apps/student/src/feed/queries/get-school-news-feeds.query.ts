import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class GetSchoolNewsFeedListQuery {
  @ApiProperty({ type: Number })
  @IsInt()
  @Min(0)
  skip: number;

  @ApiProperty({ type: Number })
  @IsInt()
  @Min(0)
  take: number;
}
