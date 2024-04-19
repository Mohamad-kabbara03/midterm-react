import { Test, TestingModule } from '@nestjs/testing';
import { TranslationHistoryService } from './translation_history.service';

describe('TranslationHistoryService', () => {
  let service: TranslationHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TranslationHistoryService],
    }).compile();

    service = module.get<TranslationHistoryService>(TranslationHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
