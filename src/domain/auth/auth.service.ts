import { AccountEntity } from '@common/entities';
import { AlreadyExistsAccountException, NotSamePasswordsException } from '@common/implements';
import { AccountRepository } from '@common/repositories';
import { JwtConfigService } from '@config/jwt-config.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { SignupCommand, SignupType } from './commands';
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
      case SignupType.Admin:
        account = await this.accountRepository.createAccountAsAdmin(command.name, command.email, password);
        break;

      case SignupType.Student:
        account = await this.accountRepository.createAccountAsStudent(command.name, command.email, password);
        break;
    }

    return account;
  }

  createTokens(account: AccountEntity) {
    const payload = { id: account.id };

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

    return this.createTokens(await this.createAccountByType(command));
  }
}
