import { Test, TestingModule } from '@nestjs/testing';
import { TournamentsPlayersService } from './tournaments-players.service';

describe('TournamentsPlayersService', () => {
  let service: TournamentsPlayersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TournamentsPlayersService],
    }).compile();

    service = module.get<TournamentsPlayersService>(TournamentsPlayersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
