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
      secret: process.env.JWT_STUDENT_ACCESS_SECRET,
      signOptions: {
        subject: 'access',
        audience: 'student',
        expiresIn: '1h',
      },
      verifyOptions: {
        subject: 'access',
        audience: 'student',
      },
    },
    refresh: {
      secret: process.env.JWT_STUDENT_REFRESH_SECRET,
      signOptions: {
        subject: 'refresh',
        audience: 'student',
        expiresIn: '14d',
      },
      verifyOptions: {
        subject: 'refresh',
        audience: 'student',
      },
    },
  }),
);
