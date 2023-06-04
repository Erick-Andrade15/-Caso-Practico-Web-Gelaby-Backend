import { Test, TestingModule } from '@nestjs/testing';
import { LaboratoryStatusService } from './laboratory_status.service';

describe('LaboratoryStatusService', () => {
  let service: LaboratoryStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LaboratoryStatusService],
    }).compile();

    service = module.get<LaboratoryStatusService>(LaboratoryStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
