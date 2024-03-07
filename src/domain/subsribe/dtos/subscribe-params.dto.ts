import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class SubscribeParamsDto {
  @ApiProperty({ type: Number })
  @IsInt()
  schoolId: number;
}
