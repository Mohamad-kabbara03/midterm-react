import { Test, TestingModule } from '@nestjs/testing';
import { UserVrEnvironmentSelectionService } from './user_vr_environment_selection.service';

describe('UserVrEnvironmentSelectionService', () => {
  let service: UserVrEnvironmentSelectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserVrEnvironmentSelectionService],
    }).compile();

    service = module.get<UserVrEnvironmentSelectionService>(UserVrEnvironmentSelectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
