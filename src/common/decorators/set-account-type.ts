import { AccountType } from '@common/constants';
import { SetMetadata } from '@nestjs/common';

export const SET_ACCOUNT_TYPE_MEDATA_KEY = '__set_account_type__';
export const SetAccountType = (type: AccountType) => SetMetadata(SET_ACCOUNT_TYPE_MEDATA_KEY, type);
