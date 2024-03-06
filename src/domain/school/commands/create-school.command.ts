import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateSchoolCommand {
  @ApiProperty({ type: String })
  @Length(1, 50)
  name: string;

  @ApiProperty({ type: String })
  @Length(1, 50)
  location: string;
}
