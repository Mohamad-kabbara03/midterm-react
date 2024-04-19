// video-call.module.ts
import { Module } from '@nestjs/common';
import { VideoCallService } from './video-call.service';
import { VideoCallController } from './video-call.controller';
import { VideoCallGateway } from './video-call.gateway';

@Module({
  imports: [],
  controllers: [VideoCallController],
  providers: [VideoCallService, VideoCallGateway],
  exports: [VideoCallService] // Exporting the service if it needs to be used elsewhere
})
export class VideoCallModule {}
