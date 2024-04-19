import { Module } from '@nestjs/common';
import { VrEnvironmentsService } from './vr_environments.service';
import { VrEnvironmentsController } from './vr_environments.controller';

@Module({
  providers: [VrEnvironmentsService],
  controllers: [VrEnvironmentsController]
})
export class VrEnvironmentsModule {}
