import { ApiProperty } from '@nestjs/swagger';

export class PlayerStatusRequest {
  @ApiProperty({
    description: 'Array of Xbox User IDs (xuids) to check status for',
    type: [String],
    example: ['123456789012345678', '987654321098765432'],
  })
  xuids: string[];
}
