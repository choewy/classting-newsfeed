import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export type JwtConfigReturnType = {
  access: JwtModuleOptions;
  refresh: JwtModuleOptions;
};

export const JwtConfig = registerAs(
  'jwt',
  (): JwtConfigReturnType => ({
    access: {
      secret: process.env.JWT_ADMIN_ACCESS_SECRET,
      signOptions: {
        subject: 'access',
        audience: 'admin',
        expiresIn: '1h',
      },
      verifyOptions: {
        subject: 'access',
        audience: 'admin',
      },
    },
    refresh: {
      secret: process.env.JWT_ADMIN_REFRESH_SECRET,
      signOptions: {
        subject: 'refresh',
        audience: 'admin',
        expiresIn: '14d',
      },
      verifyOptions: {
        subject: 'refresh',
        audience: 'admin',
      },
    },
  }),
);
