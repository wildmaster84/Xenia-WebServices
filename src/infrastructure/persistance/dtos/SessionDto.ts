export interface SessionDto {
  id: string;
  flags: number;
  hostAddress: string;
  port: number;
  macAddress: string;
  publicSlotsCount: number;
  privateSlotsCount: number;
  userIndex: number;
}
