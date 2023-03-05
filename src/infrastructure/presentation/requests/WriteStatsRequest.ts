interface WriteStatsRequestLeaderboardStatistic {
  type: number,
  value: number,
}

interface WriteStatsRequestLeaderboard {
  stats: {
    [propertyId: string]: WriteStatsRequestLeaderboardStatistic
  }
}

export interface WriteStatsRequest {
  xuid: string;
  leaderboards: {
    [leaderboardId: string]: WriteStatsRequestLeaderboard
  }
}