import { Test, TestingModule } from '@nestjs/testing';
import { VrEnvironmentsService } from './vr_environments.service';

describe('VrEnvironmentsService', () => {
  let service: VrEnvironmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VrEnvironmentsService],
    }).compile();

    service = module.get<VrEnvironmentsService>(VrEnvironmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
