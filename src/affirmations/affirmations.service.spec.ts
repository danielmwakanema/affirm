import { Test, TestingModule } from '@nestjs/testing';
import { AffirmationsService } from './affirmations.service';

describe('AffirmationsService', () => {
  let service: AffirmationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AffirmationsService],
    }).compile();

    service = module.get<AffirmationsService>(AffirmationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
