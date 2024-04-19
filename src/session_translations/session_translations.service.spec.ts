import { Test, TestingModule } from '@nestjs/testing';
import { SessionTranslationsService } from './session_translations.service';

describe('SessionTranslationsService', () => {
  let service: SessionTranslationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionTranslationsService],
    }).compile();

    service = module.get<SessionTranslationsService>(SessionTranslationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
