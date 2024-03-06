import { AccountType } from '@common/constants';
import { SetMetadata } from '@nestjs/common';

export const ONLY_ACCOUNT_TYPE_MEDATA_KEY = '__only_account_type__';
export const OnlyAccountType = (type: AccountType) => SetMetadata(ONLY_ACCOUNT_TYPE_MEDATA_KEY, type);
