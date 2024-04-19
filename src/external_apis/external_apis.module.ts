import { Module } from '@nestjs/common';
import { ExternalApisService } from './external_apis.service';
import { ExternalApisController } from './external_apis.controller';

@Module({
  providers: [ExternalApisService],
  controllers: [ExternalApisController]
})
export class ExternalApisModule {}
