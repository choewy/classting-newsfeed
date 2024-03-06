import { AccountType } from '@common/constants';
import { AccountEntity } from '@common/entities';
import { AlreadyExistsAccountException, NotSamePasswordsException, WrongEmailOrPasswordException } from '@common/implements';
import { AccountRepository } from '@common/repositories';
import { JwtConfigService } from '@config/jwt-config.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { SigninCommand, SignupCommand } from './commands';
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

  createTokens(type: AccountType, account: AccountEntity) {
    const payload = { id: account.id, type };

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

    return this.createTokens(command.type, await this.createAccountByType(command));
  }

  async signin(command: SigninCommand) {
    const account = await this.accountRepository.findByEmail(command.email);

    if (account === null) {
      throw new WrongEmailOrPasswordException();
    }

    if (bcrypt.compareSync(command.password, account.password) === false) {
      throw new WrongEmailOrPasswordException();
    }

    return this.createTokens(this.getAccountType(account), account);
  }
}
