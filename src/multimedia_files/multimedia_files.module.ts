import { Module } from '@nestjs/common';
import { MultimediaFilesService } from './multimedia_files.service';
import { MultimediaFilesController } from './multimedia_files.controller';

@Module({
  providers: [MultimediaFilesService],
  controllers: [MultimediaFilesController]
})
export class MultimediaFilesModule {}
