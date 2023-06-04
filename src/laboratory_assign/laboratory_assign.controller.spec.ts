import { Test, TestingModule } from '@nestjs/testing';
import { LaboratoryAssignController } from './laboratory_assign.controller';
import { LaboratoryAssignService } from './laboratory_assign.service';

describe('LaboratoryAssignController', () => {
  let controller: LaboratoryAssignController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LaboratoryAssignController],
      providers: [LaboratoryAssignService],
    }).compile();

    controller = module.get<LaboratoryAssignController>(LaboratoryAssignController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
