import { Module } from '@nestjs/common';
import { TranslationHistoryService } from './translation_history.service';
import { TranslationHistoryController } from './translation_history.controller';

@Module({
  providers: [TranslationHistoryService],
  controllers: [TranslationHistoryController]
})
export class TranslationHistoryModule {}
