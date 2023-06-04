import { Test, TestingModule } from '@nestjs/testing';
import { LaboratoryStatusController } from './laboratory_status.controller';
import { LaboratoryStatusService } from './laboratory_status.service';

describe('LaboratoryStatusController', () => {
  let controller: LaboratoryStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LaboratoryStatusController],
      providers: [LaboratoryStatusService],
    }).compile();

    controller = module.get<LaboratoryStatusController>(LaboratoryStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
