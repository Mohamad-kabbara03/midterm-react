import { Test, TestingModule } from '@nestjs/testing';
import { VideoCallSessionService } from './video_call_session.service';

describe('VideoCallSessionService', () => {
  let service: VideoCallSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoCallSessionService],
    }).compile();

    service = module.get<VideoCallSessionService>(VideoCallSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
