export interface CreateSessionRequest {
  sessionId: string;
  flags: number;
  publicSlotsCount: number;
  privateSlotsCount: number;
  hostAddress: string;
  macAddress: string;
  port: number;
}
