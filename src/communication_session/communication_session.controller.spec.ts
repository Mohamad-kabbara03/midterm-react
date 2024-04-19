import { Test, TestingModule } from '@nestjs/testing';
import { CommunicationSessionController } from './communication_session.controller';

describe('CommunicationSessionController', () => {
  let controller: CommunicationSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunicationSessionController],
    }).compile();

    controller = module.get<CommunicationSessionController>(CommunicationSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
