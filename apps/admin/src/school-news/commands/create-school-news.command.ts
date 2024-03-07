import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, Length } from 'class-validator';

export class CreateSchoolNewsCommad {
  @ApiProperty({ type: String })
  @Length(1, 248)
  title: string;

  @ApiProperty({ type: String })
  @Length(1, 1024)
  contents: string;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  hidden: boolean;
}
