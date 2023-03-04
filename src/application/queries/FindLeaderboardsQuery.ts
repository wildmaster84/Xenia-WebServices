import LeaderboardId from 'src/domain/value-objects/LeaderboardId';
import LeaderboardStatId from 'src/domain/value-objects/LeaderboardStatId';
import TitleId from 'src/domain/value-objects/TitleId';
import Xuid from 'src/domain/value-objects/Xuid';

export class FindLeaderboardsQuery {
  constructor(
    public readonly players: Xuid[],
    public readonly titleId: TitleId,
    public readonly leaderboard: {
      id: LeaderboardId;
      statisticIds: LeaderboardStatId[];
    }[],
  ) {}
}
