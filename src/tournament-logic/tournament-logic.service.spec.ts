import { Test, TestingModule } from '@nestjs/testing';
import { TournamentLogicService } from './tournament-logic.service';

describe('TournamentLogicService', () => {
  let service: TournamentLogicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TournamentLogicService],
    }).compile();

    service = module.get<TournamentLogicService>(TournamentLogicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
