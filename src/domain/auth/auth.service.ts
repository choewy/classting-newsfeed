import { AccountType } from '@common/constants';
import { AccountEntity } from '@common/entities';
import { AlreadyExistsAccountException, NotSamePasswordsException, WrongEmailOrPasswordException } from '@common/implements';
import { AccountRepository } from '@common/repositories';
import { JwtConfigService } from '@config/jwt-config.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { Request } from 'express';

import { RefreshTokensCommand, SigninCommand, SignupCommand } from './commands';
import { TokensDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly jwtConfigService: JwtConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async createAccountByType(command: SignupCommand) {
    const password = bcrypt.hashSync(command.password, 10);

    let account: AccountEntity;

    switch (command.type) {
      case AccountType.Admin:
        account = await this.accountRepository.createAccountAsAdmin(command.name, command.email, password);
        break;

      case AccountType.Student:
        account = await this.accountRepository.createAccountAsStudent(command.name, command.email, password);
        break;
    }

    return account;
  }

  getAccountType(account: AccountEntity) {
    if (typeof account.admin?.id === 'number') {
      return AccountType.Admin;
    }

    if (typeof account.student?.id === 'number') {
      return AccountType.Student;
    }
  }

  createTokens(type: AccountType, id: number) {
    const payload = { type, id };

    return new TokensDto(
      this.jwtService.sign(payload, this.jwtConfigService.getAccessSignOptions()),
      this.jwtService.sign(payload, this.jwtConfigService.getRefreshSignOptions()),
    );
  }

  async signup(command: SignupCommand) {
    if (await this.accountRepository.hasByEmail(command.email)) {
      throw new AlreadyExistsAccountException();
    }

    if (command.password !== command.confirmPassword) {
      throw new NotSamePasswordsException();
    }

    const account = await this.createAccountByType(command);
    return this.createTokens(command.type, account.id);
  }

  async signin(command: SigninCommand) {
    const account = await this.accountRepository.findByEmail(command.email);

    if (account === null) {
      throw new WrongEmailOrPasswordException();
    }

    if (bcrypt.compareSync(command.password, account.password) === false) {
      throw new WrongEmailOrPasswordException();
    }

    return this.createTokens(this.getAccountType(account), account.id);
  }

  refreshTokens(req: Request, { access, refresh }: RefreshTokensCommand) {
    const bearer = (req.headers.authorization ?? '').replace('Bearer ', '');
    const bearerPayload = this.jwtService.verify(bearer, { ...this.jwtConfigService.getAccessSignOptions(), ignoreExpiration: true });
    const accessPayload = this.jwtService.verify(access, { ...this.jwtConfigService.getAccessSignOptions(), ignoreExpiration: true });
    const refreshPayload = this.jwtService.verify(refresh, { ...this.jwtConfigService.getRefreshSignOptions() });

    if (bearerPayload.id !== accessPayload.id || accessPayload.id !== refreshPayload.id) {
      throw new UnauthorizedException();
    }

    return this.createTokens(bearerPayload.type, bearerPayload.id);
  }
}
