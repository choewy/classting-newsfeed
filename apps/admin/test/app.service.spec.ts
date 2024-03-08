import { AppService } from '@apps/admin/app.service';
import { Test, TestingModule } from '@nestjs/testing';

describe(AppService.name, () => {
  let module: TestingModule;
  let service: AppService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get(AppService);
  });

  it('AppService의 인스턴스가 정의되어 있어야 한다.', () => {
    expect(service).toBeDefined();
  });
});
