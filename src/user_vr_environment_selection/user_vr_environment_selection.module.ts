import { Module } from '@nestjs/common';
import { UserVrEnvironmentSelectionService } from './user_vr_environment_selection.service';
import { UserVrEnvironmentSelectionController } from './user_vr_environment_selection.controller';

@Module({
  providers: [UserVrEnvironmentSelectionService],
  controllers: [UserVrEnvironmentSelectionController]
})
export class UserVrEnvironmentSelectionModule {}
