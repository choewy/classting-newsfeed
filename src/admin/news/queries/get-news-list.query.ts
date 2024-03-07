import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class GetNewsListQuery {
  @ApiProperty({ type: Number })
  @IsInt()
  skip: number;

  @ApiProperty({ type: Number })
  @IsInt()
  take: number;
}
