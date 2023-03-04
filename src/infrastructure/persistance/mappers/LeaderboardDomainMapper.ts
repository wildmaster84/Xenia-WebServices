import { Leaderboard as LeaderboardModel } from '../models/LeaderboardSchema';
import Leaderboard from '../../../domain/aggregates/Leaderboard';
import ILogger, { ILoggerSymbol } from '../../../ILogger';
import { Inject, Injectable } from '@nestjs/common';
import TitleId from 'src/domain/value-objects/TitleId';
import Xuid from 'src/domain/value-objects/Xuid';
import LeaderboardId from 'src/domain/value-objects/LeaderboardId';

@Injectable()
export default class LeaderboardDomainMapper {
  constructor(@Inject(ILoggerSymbol) private readonly logger: ILogger) {}

  public mapToDomainModel(leaderboard: LeaderboardModel): Leaderboard {
    return new Leaderboard({
      id: new LeaderboardId(leaderboard.id),
      titleId: new TitleId(leaderboard.titleId),
      player: new Xuid(leaderboard.player),
      stats: leaderboard.stats as Leaderboard['stats'], // ugly, lazy cast.
    });
  }
}
