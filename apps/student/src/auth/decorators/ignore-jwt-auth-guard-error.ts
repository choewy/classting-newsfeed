import { SetMetadata } from '@nestjs/common';

export const IGNORE_JWT_AUTH_GUARD_ERROR = '__ignore_jwt_auth_guard_error__';
export const IgnoreJwtAuthGuardError = () => SetMetadata(IGNORE_JWT_AUTH_GUARD_ERROR, true);
