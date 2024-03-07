import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class RefreshTokensCommand {
  @ApiProperty({ type: String })
  @IsJWT()
  access: string;

  @ApiProperty({ type: String })
  @IsJWT()
  refresh: string;
}
