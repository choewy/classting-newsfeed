import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateSchoolPageCommand {
  @ApiProperty({ type: String })
  @Length(1, 50)
  name: string;

  @ApiProperty({ type: String })
  @Length(1, 50)
  location: string;
}
