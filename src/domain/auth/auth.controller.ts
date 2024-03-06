import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignupCommand } from './commands';
import { SigninCommand } from './commands/signin.command';
import { TokensDto } from './dtos';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: '회원가입' })
  @ApiCreatedResponse({ type: TokensDto })
  async signup(@Body() command: SignupCommand) {
    return this.authService.signup(command);
  }

  @Post('signin')
  @ApiOperation({ summary: '로그인' })
  @ApiCreatedResponse({ type: TokensDto })
  async signin(@Body() command: SigninCommand) {
    return this.authService.signin(command);
  }
}
