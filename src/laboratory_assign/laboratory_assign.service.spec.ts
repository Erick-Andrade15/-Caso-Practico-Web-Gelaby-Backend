import { Test, TestingModule } from '@nestjs/testing';
import { LaboratoryAssignService } from './laboratory_assign.service';

describe('LaboratoryAssignService', () => {
  let service: LaboratoryAssignService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LaboratoryAssignService],
    }).compile();

    service = module.get<LaboratoryAssignService>(LaboratoryAssignService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
