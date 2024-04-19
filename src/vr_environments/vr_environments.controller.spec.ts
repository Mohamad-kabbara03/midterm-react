import { Test, TestingModule } from '@nestjs/testing';
import { VrEnvironmentsController } from './vr_environments.controller';

describe('VrEnvironmentsController', () => {
  let controller: VrEnvironmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VrEnvironmentsController],
    }).compile();

    controller = module.get<VrEnvironmentsController>(VrEnvironmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
