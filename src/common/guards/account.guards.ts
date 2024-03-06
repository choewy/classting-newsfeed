import { AccountType } from '@common/constants';
import { OnlyAccountType } from '@common/decorators';
import { JwtGuard } from '@core/jwt';
import { UseGuards, applyDecorators } from '@nestjs/common';

import { AccountGuard } from './account.guard';

export const OnlyAdminGuard = () => applyDecorators(OnlyAccountType(AccountType.Admin), UseGuards(JwtGuard, AccountGuard));
export const OnlyStudentGuard = () => applyDecorators(OnlyAccountType(AccountType.Student), UseGuards(JwtGuard, AccountGuard));
