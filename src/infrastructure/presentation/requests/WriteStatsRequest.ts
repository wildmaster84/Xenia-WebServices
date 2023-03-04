interface WriteStatsRequestLeaderboardStatistic {
  type: number,
  value: number,
}

interface WriteStatsRequestLeaderboard {
  stats: {
    [statisticId: string]: WriteStatsRequestLeaderboardStatistic
  }
}

export interface WriteStatsRequest {
  xuid: string;
  leaderboards: {
    [leaderboardId: string]: WriteStatsRequestLeaderboard
  }
}