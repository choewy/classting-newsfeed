import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class GetMySubscribedSchoolsQuery {
  @ApiProperty({ type: Number, description: '마지막 조회한 row id' })
  @IsInt()
  cursor: number;

  @ApiProperty({ type: Number, description: '가져올 row 수' })
  @IsInt()
  take: number;
}
