import { Module } from '@nestjs/common';
import { SessionTranslationsService } from './session_translations.service';
import { SessionTranslationsController } from './session_translations.controller';

@Module({
  providers: [SessionTranslationsService],
  controllers: [SessionTranslationsController]
})
export class SessionTranslationsModule {}
