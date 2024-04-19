import { Test, TestingModule } from '@nestjs/testing';
import { MultimediaFilesService } from './multimedia_files.service';

describe('MultimediaFilesService', () => {
  let service: MultimediaFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MultimediaFilesService],
    }).compile();

    service = module.get<MultimediaFilesService>(MultimediaFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
