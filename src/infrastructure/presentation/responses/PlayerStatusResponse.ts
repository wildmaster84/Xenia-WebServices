export interface PlayerStatus {
  xuid: string;
  gamertag: string;
  online: boolean;
  state?: number;
}

export type PlayerStatusResponse = PlayerStatus[];
