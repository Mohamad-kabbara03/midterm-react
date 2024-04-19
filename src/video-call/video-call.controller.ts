// video-call.controller.ts
import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { VideoCallService } from './video-call.service';

@Controller('video-calls')
export class VideoCallController {
  constructor(private videoCallService: VideoCallService) {}

  @Post('start')
  startCall(@Body() startCallDto: { initiatorId: number, receiverId: number }) {
    return this.videoCallService.startCall(startCallDto.initiatorId, startCallDto.receiverId);
  }

  @Delete('end')
  endCall(@Body() endCallDto: { sessionId: number }) {
    return this.videoCallService.endCall(endCallDto.sessionId);
  }

  @Get('session/:sessionId')
  getCallSession(@Param('sessionId') sessionId: number) {
    return this.videoCallService.getCallSession(sessionId);
  }
}
