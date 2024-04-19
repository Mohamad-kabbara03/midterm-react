import { Test, TestingModule } from '@nestjs/testing';
import { SessionTranslationsController } from './session_translations.controller';

describe('SessionTranslationsController', () => {
  let controller: SessionTranslationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionTranslationsController],
    }).compile();

    controller = module.get<SessionTranslationsController>(SessionTranslationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
