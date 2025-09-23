import { ApiProperty } from '@nestjs/swagger';

export class PlayerStatusRequest {
  @ApiProperty()
  xuids: string[];
}
