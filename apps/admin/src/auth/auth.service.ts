import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcrypt';

import { SignInCommand, SignUpCommand, RefreshTokensCommand } from './commands';
import { JwtTokensDto } from './dtos/jwt-tokens.dto';
import { JwtConfigReturnType } from '../common/configs';
import { AdminRepository } from '../common/repositories';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly adminRepository: AdminRepository,
  ) {}

  createTokens(id: number) {
    const payload = { id };

    const config = this.configService.get<JwtConfigReturnType>('jwt');

    return new JwtTokensDto(
      this.jwtService.sign(payload, { ...config.access.signOptions, secret: config.access.secret }),
      this.jwtService.sign(payload, { ...config.refresh.signOptions, secret: config.refresh.secret }),
    );
  }

  async refreshTokens(command: RefreshTokensCommand) {
    const config = this.configService.get<JwtConfigReturnType>('jwt');

    const access = await this.jwtService
      .verifyAsync(command.access, { ...config.access.verifyOptions, secret: config.access.secret, ignoreExpiration: true })
      .catch((e) => {
        throw new UnauthorizedException(e);
      });

    const refresh = await this.jwtService
      .verifyAsync(command.refresh, { ...config.refresh.verifyOptions, secret: config.refresh.secret })
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

    const admin = await this.adminRepository.insertOne({
      name: command.name,
      email: command.email,
      password: hashSync(command.password, 10),
    });

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
