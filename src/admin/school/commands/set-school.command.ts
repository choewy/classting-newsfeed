import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class SetSchoolCommand {
  @ApiProperty({ type: String })
  @IsString()
  @Length(1, 50)
  name: string;

  @ApiProperty({ type: String })
  @IsString()
  @Length(1, 50)
  location: string;
}
