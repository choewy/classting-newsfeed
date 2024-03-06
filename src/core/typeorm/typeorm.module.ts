import { DynamicModule, FactoryProvider, Module, Type } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { AbstractRepository } from './abstracts';
import { INJECTABLE_REPOSITORY_METADATA_KEY } from './decorators';

@Module({})
export class TypeOrmExModule {
  static forRoot(options: TypeOrmModuleOptions): DynamicModule {
    return {
      imports: [TypeOrmModule.forRoot(options)],
      module: TypeOrmExModule,
    };
  }

  static forRootAsync(options: TypeOrmModuleAsyncOptions): DynamicModule {
    return {
      imports: [TypeOrmModule.forRootAsync(options)],
      module: TypeOrmExModule,
    };
  }

  static forFeature(Repositories: Type<AbstractRepository<any>>[]): DynamicModule {
    const repositoryProviders: FactoryProvider[] = [];

    for (const Repository of Repositories) {
      repositoryProviders.push({
        inject: [DataSource],
        provide: Repository,
        useFactory(dataSource: DataSource) {
          const target = Reflect.getMetadata(INJECTABLE_REPOSITORY_METADATA_KEY, Repository);

          return new Repository(target, dataSource);
        },
      });
    }

    return {
      module: TypeOrmExModule,
      providers: repositoryProviders,
      exports: repositoryProviders,
    };
  }
}
