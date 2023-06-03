import { Test, TestingModule } from '@nestjs/testing';
import { TeachersDetailsController } from './teachers-details.controller';
import { TeachersDetailsService } from './teachers-details.service';

describe('TeachersDetailsController', () => {
  let controller: TeachersDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeachersDetailsController],
      providers: [TeachersDetailsService],
    }).compile();

    controller = module.get<TeachersDetailsController>(TeachersDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
