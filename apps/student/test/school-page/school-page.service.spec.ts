import { SchoolPageRepository } from '@apps/student/common/repositories';
import { SchoolPageService } from '@apps/student/school-page/school-page.service';
import { TestingRepository } from '@libs/testing';
import { Test, TestingModule } from '@nestjs/testing';

describe(SchoolPageService.name, () => {
  let module: TestingModule;
  let service: SchoolPageService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [SchoolPageService, TestingRepository.mock(SchoolPageRepository)],
    }).compile();

    service = module.get(SchoolPageService);
  });

  it('SchoolPageService의 인스턴스가 정의되어 있어야 한다.', () => {
    expect(service).toBeDefined();
  });
});
