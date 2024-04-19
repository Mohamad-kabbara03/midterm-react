import { Test, TestingModule } from '@nestjs/testing';
import { MultimediaFilesController } from './multimedia_files.controller';

describe('MultimediaFilesController', () => {
  let controller: MultimediaFilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MultimediaFilesController],
    }).compile();

    controller = module.get<MultimediaFilesController>(MultimediaFilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
