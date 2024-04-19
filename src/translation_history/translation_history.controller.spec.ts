import { Test, TestingModule } from '@nestjs/testing';
import { TranslationHistoryController } from './translation_history.controller';

describe('TranslationHistoryController', () => {
  let controller: TranslationHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TranslationHistoryController],
    }).compile();

    controller = module.get<TranslationHistoryController>(TranslationHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
