import { Test, TestingModule } from '@nestjs/testing';
import { VideoCallSessionController } from './video_call_session.controller';

describe('VideoCallSessionController', () => {
  let controller: VideoCallSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoCallSessionController],
    }).compile();

    controller = module.get<VideoCallSessionController>(VideoCallSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
