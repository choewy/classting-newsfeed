import { AbstractConfigService } from '@core/config';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService extends AbstractConfigService {
  private readonly MYSQL_HOST = this.configService.get<string>('MYSQL_HOST');
  private readonly MYSQL_PORT = +this.configService.get<string>('MYSQL_PORT');
  private readonly MYSQL_USERNAME = this.configService.get<string>('MYSQL_USERNAME');
  private readonly MYSQL_PASSWORD = this.configService.get<string>('MYSQL_PASSWORD');
  private readonly MYSQL_DATABASE = this.configService.get<string>('MYSQL_DATABASE');

  getModuleOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.MYSQL_HOST,
      port: this.MYSQL_PORT,
      username: this.MYSQL_USERNAME,
      password: this.MYSQL_PASSWORD,
      database: this.MYSQL_DATABASE,
      entities: [process.env.PWD + '/dist/**/*.entity.js'],
      synchronize: this.configService.get('NODE_ENV') === 'local',
      logging: ['error', 'warn'],
      autoLoadEntities: true,
    };
  }
}
