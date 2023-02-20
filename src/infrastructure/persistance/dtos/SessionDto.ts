export interface SessionDto {
  id: string;
  flags: number;
  hostAddress: string;
  macAddress: string;
  publicSlotsCount: number;
  privateSlotsCount: number;
  userIndex: number;
}
