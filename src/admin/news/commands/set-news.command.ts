import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class SetNewsCommand {
  @ApiProperty({ type: String })
  @IsString()
  @Length(1, 248)
  title: string;

  @ApiProperty({ type: String })
  @IsString()
  @Length(1, 1024)
  contents: string;
}
