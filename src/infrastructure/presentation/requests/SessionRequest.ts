export interface SessionRequest {
  sessionId: string;
  flags: number;
  publicSlotsCount: number;
  privateSlotsCount: number;
  userIndex: number;
  hostAddress: string;
  macAddress: string;
}
