import { Module } from '@nestjs/common';
import { VideoCallSessionService } from './video_call_session.service';
import { VideoCallSessionController } from './video_call_session.controller';

@Module({
  providers: [VideoCallSessionService],
  controllers: [VideoCallSessionController]
})
export class VideoCallSessionModule {}
