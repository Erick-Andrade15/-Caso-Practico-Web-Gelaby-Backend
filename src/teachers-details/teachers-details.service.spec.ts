import { Test, TestingModule } from '@nestjs/testing';
import { TeachersDetailsService } from './teachers-details.service';

describe('TeachersDetailsService', () => {
  let service: TeachersDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeachersDetailsService],
    }).compile();

    service = module.get<TeachersDetailsService>(TeachersDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
