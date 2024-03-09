import { SchoolNewsRepository, SchoolPageRepository, SubscriptionRepository } from '@apps/student/common/repositories';
import { SubscriptionService } from '@apps/student/subscription/subscription.service';
import { TestingRepository } from '@libs/testing';
import { Test, TestingModule } from '@nestjs/testing';

describe(SubscriptionService.name, () => {
  let module: TestingModule;
  let service: SubscriptionService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        SubscriptionService,
        TestingRepository.mock(SchoolPageRepository),
        TestingRepository.mock(SchoolNewsRepository),
        TestingRepository.mock(SubscriptionRepository),
      ],
    }).compile();

    service = module.get(SubscriptionService);
  });

  it('SubscriptionService의 인스턴스가 정의되어야 한다.', () => {
    expect(service).toBeDefined();
  });
});
