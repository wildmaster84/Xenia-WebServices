import { LeaderboardUpdateProps } from 'src/domain/aggregates/Leaderboard';
import LeaderboardId from 'src/domain/value-objects/LeaderboardId';
import TitleId from 'src/domain/value-objects/TitleId';
import Xuid from 'src/domain/value-objects/Xuid';

export class UpdateLeaderboardCommand {
  constructor(
    public readonly leaderboardId: LeaderboardId,
    public readonly titleId: TitleId,
    public readonly player: Xuid,
    public readonly stats: LeaderboardUpdateProps['stats'],
  ) {}
}
