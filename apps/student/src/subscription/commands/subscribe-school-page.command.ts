import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class SubscribeSchoolPageCommand {
  @ApiProperty({ type: Number })
  @IsInt()
  @Min(1)
  id: number;
}
