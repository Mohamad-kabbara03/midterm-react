import { Test, TestingModule } from '@nestjs/testing';
import { UserVrEnvironmentSelectionController } from './user_vr_environment_selection.controller';

describe('UserVrEnvironmentSelectionController', () => {
  let controller: UserVrEnvironmentSelectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserVrEnvironmentSelectionController],
    }).compile();

    controller = module.get<UserVrEnvironmentSelectionController>(UserVrEnvironmentSelectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
