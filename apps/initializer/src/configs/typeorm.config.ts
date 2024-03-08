import * as entities from '@libs/entity';
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeormConfig = registerAs(
  'typeorm',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: +process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: process.env.NODE_ENV === 'local' ? process.env.MYSQL_SYNCHRONIZE === 'true' : false,
    entities: Object.values(entities),
    logging: true,
    autoLoadEntities: true,
  }),
);
