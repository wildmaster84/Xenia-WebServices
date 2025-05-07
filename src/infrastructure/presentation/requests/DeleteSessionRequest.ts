import { ApiProperty } from '@nestjs/swagger';

export class DeleteSessionRequest {
  @ApiProperty()
  xuid: string;
}
