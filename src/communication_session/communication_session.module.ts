import { Module } from '@nestjs/common';
import { CommunicationSessionService } from './communication_session.service';
import { CommunicationSessionController } from './communication_session.controller';

@Module({
  providers: [CommunicationSessionService],
  controllers: [CommunicationSessionController]
})
export class CommunicationSessionModule {}
