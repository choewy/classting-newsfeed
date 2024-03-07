import { ApiResponseProperty } from '@nestjs/swagger';

export class JwtTokensDto {
  @ApiResponseProperty({ type: String })
  access: string;

  @ApiResponseProperty({ type: String })
  refresh: string;

  constructor(access: string, refresh: string) {
    this.access = access;
    this.refresh = refresh;
  }
}
