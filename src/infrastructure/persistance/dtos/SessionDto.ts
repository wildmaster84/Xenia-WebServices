export interface SessionDto {
  id: string;
  flags: number;
  hostAddress: string;
  publicSlotsCount: number;
  privateSlotsCount: number;
  userIndex: number;
}
