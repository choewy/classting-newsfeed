import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcrypt';

import { RefreshTokensCommand } from './commands/refresh-tokens.command';
import { SignInCommand } from './commands/signin.command';
import { SignUpCommand } from './commands/signup.command';
import { JwtTokensDto } from './dtos/jwt-tokens.dto';
import { JwtConfigReturnType } from '../configs';
import { AdminRepository } from '../repositories/admin.repository';

@Injectable()
export class AuthService {
  private readonly jwtConfig: JwtConfigReturnType;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly adminRepository: AdminRepository,
  ) {
    this.jwtConfig = this.configService.get<JwtConfigReturnType>('jwt');
  }

  createTokens(id: number) {
    const payload = { id };

    return new JwtTokensDto(
      this.jwtService.sign(payload, { ...this.jwtConfig.access.signOptions, secret: this.jwtConfig.access.secret }),
      this.jwtService.sign(payload, { ...this.jwtConfig.refresh.signOptions, secret: this.jwtConfig.refresh.secret }),
    );
  }

  async refreshTokens(command: RefreshTokensCommand) {
    const access = await this.jwtService
      .verifyAsync(command.access, { ...this.jwtConfig.access.verifyOptions, secret: this.jwtConfig.access.secret, ignoreExpiration: true })
      .catch((e) => {
        throw new UnauthorizedException(e);
      });

    const refresh = await this.jwtService
      .verifyAsync(command.refresh, { ...this.jwtConfig.refresh.verifyOptions, secret: this.jwtConfig.refresh.secret })
      .catch((e) => {
        throw new UnauthorizedException(e);
      });

    if (access.id !== refresh.id) {
      throw new UnauthorizedException();
    }

    return this.createTokens(access.id);
  }

  async signUp(command: SignUpCommand) {
    if (command.password !== command.confirmPassword) {
      throw new BadRequestException('not equals password.');
    }

    if (await this.adminRepository.existsByEmail(command.email)) {
      throw new ConflictException('already exist admin.');
    }

    const admin = this.adminRepository.create({
      name: command.name,
      email: command.email,
      password: hashSync(command.password, 10),
    });

    await this.adminRepository.insert(admin);
    return this.createTokens(admin.id);
  }

  async signIn(command: SignInCommand) {
    const admin = await this.adminRepository.findOneByEmail(command.email);

    if (admin === null || compareSync(command.password, admin.password) === false) {
      throw new UnauthorizedException();
    }

    return this.createTokens(admin.id);
  }
}
