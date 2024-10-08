import { Test, TestingModule } from '@nestjs/testing';
import { TournamentsPlayersController } from './tournaments-players.controller';
import { TournamentsPlayersService } from './tournaments-players.service';

describe('TournamentsPlayersController', () => {
  let controller: TournamentsPlayersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TournamentsPlayersController],
      providers: [TournamentsPlayersService],
    }).compile();

    controller = module.get<TournamentsPlayersController>(
      TournamentsPlayersController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
