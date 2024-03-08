import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignInCommand, SignUpCommand, RefreshTokensCommand } from './commands';
import { JwtTokensDto } from './dtos';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiOperation({ summary: '로그인' })
  @ApiCreatedResponse({ type: JwtTokensDto })
  async signIn(@Body() command: SignInCommand) {
    return this.authService.signIn(command);
  }

  @Post('signup')
  @ApiOperation({ summary: '회원가입' })
  @ApiCreatedResponse({ type: JwtTokensDto })
  async signUp(@Body() command: SignUpCommand) {
    return this.authService.signUp(command);
  }

  @Post('tokens/refresh')
  @ApiOperation({ summary: '토큰 갱신/재발급' })
  @ApiCreatedResponse({ type: JwtTokensDto })
  async refreshTokens(@Body() command: RefreshTokensCommand) {
    return this.authService.refreshTokens(command);
  }
}
