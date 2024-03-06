import { AbstractConfigService } from '@core/config';
import { AbstractRepository } from '@core/typeorm';
import { FactoryProvider, Type } from '@nestjs/common';

export class Mock {
  static ConfigService<AbstractConfigMockService extends AbstractConfigService>(
    MockConfigService: Type<AbstractConfigMockService>,
  ): FactoryProvider {
    return {
      provide: MockConfigService,
      useFactory() {
        const configService = new MockConfigService();
        const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(configService));
        const mock = {};

        for (const method of methods) {
          mock[method] = () => null;
        }

        return mock as AbstractConfigMockService;
      },
    };
  }

  static Repository<AbstractMockRepository extends AbstractRepository<any>>(MockRepository: Type<AbstractMockRepository>): FactoryProvider {
    return {
      provide: MockRepository,
      useFactory() {
        const repository = new MockRepository(null);
        const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(repository));
        const mock = {};

        for (const method of methods) {
          mock[method] = () => null;
        }

        return mock as AbstractMockRepository;
      },
    };
  }
}
