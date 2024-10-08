import { Test, TestingModule } from '@nestjs/testing';
import { TournamentLogicController } from './tournament-logic.controller';
import { TournamentLogicService } from './tournament-logic.service';

describe('TournamentLogicController', () => {
  let controller: TournamentLogicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TournamentLogicController],
      providers: [TournamentLogicService],
    }).compile();

    controller = module.get<TournamentLogicController>(
      TournamentLogicController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
