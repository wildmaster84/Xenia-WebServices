export interface PlayerStatus {
  xuid: string;
  gamertag: string;
  online: boolean;
  state?: number;
  sessionId?: string;
  titleId?: string;
}

export type PlayerStatusResponse = PlayerStatus[];
