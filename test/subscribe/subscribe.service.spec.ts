import { SchoolRepository, StudentRepository, SubscribeRepository } from '@common/repositories';
import { SubscribeService } from '@domain/subsribe/subscribe.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Mock } from '@utils/mock';

describe('SubscribeService', () => {
  let module: TestingModule;
  let service: SubscribeService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        Mock.Repository(StudentRepository),
        Mock.Repository(SchoolRepository),
        Mock.Repository(SubscribeRepository),
        SubscribeService,
      ],
    }).compile();

    service = module.get(SubscribeService);
  });

  it('subscribeService to be defined', () => {
    expect(service).toBeDefined();
  });
});
