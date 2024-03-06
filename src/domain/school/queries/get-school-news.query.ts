import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class GetSchoolNewsQuery {
  @ApiProperty({ type: BigInt })
  @IsNumberString()
  id: bigint;
}
