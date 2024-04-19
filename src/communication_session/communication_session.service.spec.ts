import { Test, TestingModule } from '@nestjs/testing';
import { CommunicationSessionService } from './communication_session.service';

describe('CommunicationSessionService', () => {
  let service: CommunicationSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunicationSessionService],
    }).compile();

    service = module.get<CommunicationSessionService>(CommunicationSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
